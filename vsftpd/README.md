# *vsFTPd*

#### *Setup FTP server on Ubuntu 14.04*

1. Update repositories.
    ```
    $ sudo apt-get update
    ```

1. Install vsFTPd package using the below command.
    ```
    $ sudo apt-get install vsftpd
    ```

1. After installation open `/etc/vsftpd.conf` file and make changes as follows.
    * Uncomment the below lines(line no:29, 33, 121, 123).
        ```
        write_enable=YES
        local_umask=022
        chroot_list_enable=YES
        chroot_list_file=/etc/vsftpd.chroot_list
        ```

    * Add the following line at the end.
        ```
        userlist_enable=YES
        ```

1. Restart vsftpd service using the below command.
    ```
    $ sudo service vsftpd restart
    ```

1. Now ftp server will listen on port 21. Create user with the below command.Use `/usr/sbin/nologin` shell to prevent access to the bash shell for the ftp users.
    ```
    $ sudo useradd -d /var/www/ -s /usr/sbin/nologin www
    $ sudo passwd www
    $ sudo echo www >> /etc/vsftpd.chroot_list
    $ sudo chmod a-w www
    ```

1. Allow login access for nologin shell . Open `/etc/shells` and add the following line at the end.
    ```
    /usr/sbin/nologin
    ```

1. Now try to connect this ftp server with the username on port `21` using winscp or filezilla client and make sure that user cannot access the other folders outside the home directory.
