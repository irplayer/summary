## *xcopy*
#### *Syntax*
```
xcopy source [destination] [/w] [/p] [/c] [/v] [/q] [/f] [/l] [/g] [/d[:MM-DD-YYYY]] [/u] [/i] [/s [/e]] [/t] [/k] [/r] [/h] [{/a |/m}] [/n] [/o] [/x] [/exclude:FileName1[+[FileName2]][+[FileName3]] [{/y | /-y}] [/z]
```

#### *Flag*

Flag | Function
---- | ----
/a | 只复制那些具有存档文件属性设置的源文件。 `/a` 不修改源文件的存档文件属性。有关如何通过使用 `attrib` 来设置存档文件属性的信息。
/c | 忽略错误。
/d | 只复制那些在指定日期或指定日期之后更改过的源文件。如果不包括 `MM-DD-YYYY` 值， `xcopy` 会复制比现有 `destination` 文件新的所有 `source` 文件。该命令行选项使您可以更新更改过的文件。
/e | 复制所有子目录，包括空目录。将 `/e` 与 `/s` 和 `/t` 命令行选项一起使用。
/f | 复制时显示源文件名和目标文件名。
/g | 创建已解密的目标文件。
/h | 复制具有隐藏和系统文件属性的文件。默认情况下， `xcopy` 不复制隐藏或系统文件。
/i | 如果 `source` 是一个目录或包含通配符，而 `destination` 不存在， `xcopy` 会假定 `destination` 指定目录名并创建一个新目录。然后， `xcopy` 会将所有指定文件复制到新目录中。默认情况下， `xcopy` 将提示您指定 `destination` 是文件还是目录。
/k | 复制文件，如果源文件具有只读属性，则在目标文件中保留该属性。默认情况下， `xcopy` 将删除只读属性。
/l | 显示要复制的文件列表。
/m | 复制具有存档文件属性设置的源文件。与 `/a` 不同， `/m` 关闭在源中指定的文件的存档文件属性。有关如何通过使用 `attrib` 来设置存档文件属性的信息，请参阅 `相关主题` 。
/n | 使用 NTFS 短文件或目录名创建副本。将文件或目录从 NTFS 卷复制到 FAT 卷或者当目标文件系统需要 FAT 文件系统命名约定（即 8.3 字符）时，需要 `/n` 。目标文件系统可以是 FAT 或 NTFS。
/o | 复制文件所有权与随机访问控制列表 (DACL) 信息。
/p | 提示您确认是否要创建每个目标文件。
/q | 禁止显示 `xcopy` 的消息。
/r | 复制只读文件。
/s | 复制非空的目录和子目录。如果省略 `/s` ，则 `xcopy` 将在单个目录中工作。
/t | 只复制子目录结构（即目录树），不复制文件。要复制空目录，必须包含 `/e` 命令行选项。
/u | 只从 `source` 复制 `destination` 中已有的文件。
/v | 在写入目标文件时验证每个文件，以确保目标文件与源文件完全相同。
/w | 在开始复制文件之前将显示以下消息并等待您的响应：`Press any key to begin copying file(s)` 。
/x | 复制文件审核设置和系统访问控制列表 (SACL) 信息（包含 `/o` ）。
/y | 禁止提示确认要覆盖已存在的目标文件。
/-y | 提示您确认要覆盖已存在的目标文件。
/z | 在可重启模式中通过网络复制。
/? | 在命令提示符显示帮助。