## *sed*

***sed*** *is a stream editor. A stream editor is used to perform basic text transformations on an input stream (a file or input from a pipeline).*

#### *invoked*
```bash
sed [options] [script] [inputfile]
```

#### *options*
选项 | 说明
---- | ----
`-e` | 以选项中指定的 `script` 来处理输入的文本文件。
`-f` | 以选项中指定的 `script` 文件来处理输入的文本文件。
`-i` | 直接修改读取的文档内容，而不是由屏幕输出。
`-n` | 仅显示 `script` 处理后的结果
`-r` | 在脚本中使用扩展正则表达式。
`-s` | 将输入文件视为各个独立的文件而不是一个长的连续输入。

#### *options*
命令 | 说明
--- | ----
`a` | 新增
`c` | 取代
`d` | 删除
`i` | 插入
`p` | 打印
`s` | 替换。 `s/re/string`
`!` | 取反

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