# !/bin/bash
# author: chuaple
# create: 2018/02/02

log=$(cd `dirname $0`; pwd)/log

log() {
    echo `date +'%Y-%m-%d %H:%M:%S'` $1 | tee -a $log
}

install_ipsec() {
    log 'Install strongswan using apt-get.'
    apt-get -y install strongswan strongswan-plugin-xauth-generic >> $log

    log 'Configure the ipsec'
    cat > /etc/ipsec.conf << EOF
config setup
    uniqueids=never

conn ios
    keyexchange=ikev1
    left=%defaultroute
    leftauth=psk
    leftsubnet=0.0.0.0/0
    right=%any
    rightauth=psk
    rightauth2=xauth
    rightsourceip=192.168.0.1/24
    rightdns=8.8.8.8
    auto=add
EOF

    log 'Add a VPN user.'
    cat > /etc/ipsec.secrets << EOF
: PSK "chuaple"
chuaple : XAUTH "chuaple"
EOF

    log 'Restart ipsec.'
    ipsec restart
}

install_pptp() {
    log 'Install PPTP server using apt-get.'
    apt-get -y install pptpd >> $log

    log 'Configure the pptpd'
    cat > /etc/pptpd.conf << EOF
option /etc/ppp/pptpd-options
logwtmp
# debug
localip 192.168.0.100
remoteip 192.168.0.101-110
EOF

    log 'Configure DNS servers to use when clients connect to this PPTP server.'
    cat > /etc/ppp/pptpd-options << EOF
name pptpd
refuse-pap
refuse-chap
refuse-mschap
require-mschap-v2
require-mppe-128
ms-dns 8.8.8.8
ms-dns 8.8.4.4
proxyarp
# debug
# dump
lock
nobsdcomp
novj
novjccomp
nologfd
# logfile /var/log/pptpd.log
EOF

    log 'Add a VPN user.'
    echo 'chuaple pptpd chuaple *' > /etc/ppp/chap-secrets

    log 'Restart pptpd.'
    service pptpd restart | tee -a $log
}

nat() {
    log 'Setup IP forwarding.'
    sed -i 's/#net.ipv4.ip_forward=1/net.ipv4.ip_forward=1/g' /etc/sysctl.conf
    sysctl -p | tee -a $log

    default=`ifconfig | head -1 | awk '{print $1}'`
    read -p "Network card interface(default: $default):" interface
    if [ "$interface" = "" ]
    then
        interface="$default"
    fi
    iptables -t nat -A POSTROUTING -s 192.168.0.0/24 -o $interface -j MASQUERADE
    # iptables -t nat -A POSTROUTING -s 192.168.0.0/24 -o eth0 -j MASQUERADE
    # iptables -A FORWARD -p tcp --syn -s 192.168.0.0/24 -j TCPMSS --set-mss 1356
    iptables -t nat -L POSTROUTING -nv --line-number | tee -a $log
    # iptables -t nat -D POSTROUTING 1
}


main() {
    clear
    echo "#############################################################"
    echo "# Install VPN for Ubuntu 14.04"
    echo "# Author: chuaple"
    echo "#############################################################"
    echo "1. PPTP (Point to Point Tunneling Protocol)"
    echo "2. IPSec (Internet Protocol Security)"
    read -p "Your choice(1 or 2):" choice
    if [ "$choice" = "1" ]
    then
        install_pptp
    elif [ "$choice" = "2" ]
    then
        install_ipsec
    else
        main
    fi
    nat $interface
}

if [ `id -u` -ne 0 ]
then
    log 'This script must be run as root!'
    exit 1
fi
if [ -f "$log" ]; then
    cat /dev/null > $log
fi
log 'Install VPN for Ubuntu 14.04.'
# apt-get update
main
