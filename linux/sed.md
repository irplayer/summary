id=`sed '/^ID=/!d;s/.*=//' urfile`
ip=`sed '/^IP=/!d;s/.*=//' urfile`
name=`sed '/^Name=/!d;s/.*=//' urfile`
echo $id
echo $ip
echo $name

sed '/version/!d;s/.*:.*"\(.*\)",/\1/' site.config


!
表示后面的命令对所有没有被选定的行发生作用。
d
从模板块（Pattern space）位置删除行。
s/re/string
用string替换正则表达式re。