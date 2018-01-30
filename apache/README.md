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
ErrorLog ${APACHE_LOG_DIR} / error.log
ErrorLogFormat "[%t] [%l] [pid %P] %F: %E: [client %a] %M"
```

#### *Flag*

Flag | Syntax | Function
---- | ---- | ----
`B` | | Escape non-alphanumeric characters in backreferences before applying the transformation.
`BNP` | `backrefnoplus` | If backreferences are being escaped, spaces should be escaped to %20 instead of +. Useful when the backreference will be used in the path component rather than the query string.
`C` | `chain` | 与下一条规则关联。如果规则匹配则正常处理，该标志无效，如果不匹配，那么下面所有关联的规则都跳过。
`CO=NAME:VAL` | `cookie` | 设置一个 `cookie` 。完整的表达式为 `CO=NAME:VAL:domain[:lifetime[:path[:secure[:httponly]]]]`
`DPI` | `discardpath` | Causes the PATH_INFO portion of the rewritten URI to be discarded.
`E=[!]VAR[:VAL]` | `env` | 设置环境变量。
`END` | | Stop the rewriting process immediately and don't apply any more rules. Also prevents further execution of rewrite rules in per-directory and .htaccess context.
`F` | `forbidden` | 返回当前链接禁止访问 `403 FORBIDDEN` 给浏览器。
`G` | `gone` | 返回当前链接已废弃 `410 GONE` 给浏览器。
`H=Content-handler` | `handler` | 强制指定目标文件的内容处理器为 `Content-handler` 。例如，用来模拟 `mod_alias` 模块的 `ScriptAlias` 指令，以强制映射文件夹内的所有文件都由 `cgi-script` 处理器处理。
`L` | `last` | 停止执行后面的重写过程。
`N` | `next` | 重新从第一条规则开始运行重写过程。
`NC` | `nocase` | 不区分大小写。
`NE` | `noescape` | 不再输出转义特殊字符。
`NS` | `nosubreq` | 只用于不是内部子请求。
`P` | `proxy` | 强制使用代理转发。
`PT` | `passthrough` | 传递给下一个处理。
`QSA` | `qsappend` | 追加请求字符串。
`QSD` | `qsdiscard` | Discard any query string attached to the incoming URI.
`QSL` | `qslast` | Interpret the last (right-most) question mark as the query string delimiter, instead of the first (left-most) as normally used. Available in 2.4.19 and later.
`R[=code]` | `redirect` | 强制外部重定向， `code` 默认为 `302` 。
`S=num` | `skip` | 跳过 `num` 条规则。
`T=MIME-type` | `type` | 强制 `MIME` 类型

#### *Examples*

1. 禁止使用 `IE` 和 `Opera` 浏览器访问
    ```apacheconf
    RewriteCond %{HTTP_USER_AGENT} ^MSIE [NC,OR]
    RewriteCond %{HTTP_USER_AGENT} ^Opera [NC]
    RewriteRule ^.* - [F,L]
    ```

1. 禁止图片外链
    ```apacheconf
    RewriteCond expr "! %{HTTP_REFERER} -strmatch '*: /  / %{HTTP_HOST} / *'"
    RewriteRule "^ / images" "-" [F]
    ```

1. 网站域名整合
    ```apacheconf
    RewriteCond %{HTTP_HOST} !^www.frostbite.cn [NC]
    RewriteCond %{HTTP_HOST} !^$
    RewriteRule ^(.*) http://www.frostbite.cn/$1 [R=301,L]
    ```

1. 强制添加 `www` 前缀
    ```apacheconf
    RewriteCond %{HTTP_HOST} !^www\. [NC]
    RewriteCond %{HTTP_HOST} !^$
    RewriteRule ^ / ?(.*) http: /  / www.%{HTTP_HOST} / $1 [L,R,NE]
    ```

1. 重写查询字符串
    ```apacheconf
    # Remove mykey=???
    RewriteCond %{QUERY_STRING} (.*(?:^|&))mykey=([^&]*)&?(.*)&?$
    RewriteRule (.*) $1?%1%3
    # Copy from query string to PATH_INFO
    RewriteCond %{QUERY_STRING} (.*(?:^|&))mykey=([^&]*)&?(.*)&?$
    RewriteRule (.*) $1 / products / %2 / ? [PT]
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
    RewriteRule ^ / horse / (.*)  / pony / $1 [E=rewritten:1]
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
SSLCertificateFile  / etc / ssl / certs / server.crt
SSLCertificateKeyFile  / etc / ssl / private / server.key
```
