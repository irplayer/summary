# *Apache*

## *mod_rewrite*

#### *Syntax*

```apacheconf
RewriteEngine on|off
RewriteBase path
RewriteCond teststring condpattern [flags]
RewriteRule pattern substitution [flags]
```

#### *Logging*

>Logging for `mod_rewrite` is now achieved using the `ErrorLog` directive.

```apacheconf
LogLevel alert rewrite:trace3
ErrorLog ${APACHE_LOG_DIR}/error.log
ErrorLogFormat "[%t] [%l] [pid %P] %F: %E: [client %a] %M"
```

#### *Examples*

1. 禁止使用 `IE` 和 `Opera` 浏览器访问
    ```apacheconf
    RewriteCond %{HTTP_USER_AGENT} ^MSIE  [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} ^Opera [NC]
    RewriteRule ^.* - [F,L]
    ```

1. 禁止图片外链
    ```apacheconf
    RewriteCond expr "! %{HTTP_REFERER} -strmatch '*://%{HTTP_HOST}/*'"
    RewriteRule "^/images" "-" [F]
    ```

1. 强制添加 `www` 前缀
    ```apacheconf
    RewriteCond %{HTTP_HOST} !^www\. [NC]
    RewriteCond %{HTTP_HOST} !^$
    RewriteRule ^/?(.*) http://www.%{HTTP_HOST}/$1 [L,R,NE]
    ```

1. 重写查询字符串
    ```apacheconf
    # Remove mykey=???
    RewriteCond %{QUERY_STRING} (.*(?:^|&))mykey=([^&]*)&?(.*)&?$
    RewriteRule (.*) $1?%1%3

    # Copy from query string to PATH_INFO
    RewriteCond %{QUERY_STRING} (.*(?:^|&))mykey=([^&]*)&?(.*)&?$
    RewriteRule (.*) $1/products/%2/? [PT]

    # Capture the value of mykey in the query string
    RewriteCond %{QUERY_STRING} (.*(?:^|&))mykey=([^&]*)&?(.*)&?$
    RewriteCond %2 !=not-so-secret-value
    RewriteRule (.*) - [F]
    ```

1. 分时段展示页面
    ```apacheconf
    RewriteCond %{TIME_HOUR}%{TIME_MIN} >0700
    RewriteCond %{TIME_HOUR}%{TIME_MIN} <1900
    RewriteRule ^foo\.html$ foo.day.html [L]
    RewriteRule ^foo\.html$ foo.night.html
    ```

1. 设置变量
    ```apacheconf
    RewriteRule ^/horse/(.*) /pony/$1 [E=rewritten:1]
    # Later in your ruleset you might check for this environment variable using a RewriteCond:
    RewriteCond %{ENV:rewritten} =1
    ```

## *mod_ssl*

#### *Enable*
```
sudo a2enmod ssl
sudo apt-get install openssl
openssl genrsa -out server.key 1024 (-des3)
openssl req -new -key server.key -out server.csr
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
```

```
SSLEngine On
SSLOptions +StrictRequire
SSLCertificateFile /etc/ssl/certs/server.crt
SSLCertificateKeyFile /etc/ssl/private/server.key
```
