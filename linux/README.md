# *Linux*

## *user & group*

1. 添加一个用户组并指定id
```
groupadd -g 888 lcf
```

1. 添加一个用户到组并指定id
```
useradd lcf -r -m -s /bin/bash -g 888 -u 888
```

1. 修改用户的密码
```
passwd lcf
```

1. 删除一个用户
```
userdel lcf
```

1. 为该用户添加限
```
usermod -a -G adm lcf
usermod -a -G lcf
```

1. 查看所有用户和用户组：
```
cat /etc/passwd
cat /etc/group
```


## *language*

- 上传配置文件
```bash
cd /etc/default/
mv locale locale.bak
rz #locale
```

- 使配置生效
```bash
locale
locale-gen zh_CN.UTF-8
```


## network
```bash
su
cd /etc/network/
mv interfaces interfaces.bak
rz #interfaces
ifup em1 em1:0
```

## sed
逐行查找并替换(处理后换行符变为LF)
```bash
sed -i "s/BrtIr/IRPlayer/g" `grep -rl "BrtIr" ./*.cpp`
```

## apt
```bash
apt-cache depends
```
下载的deb文件在 `/var/cache/apt/archives`