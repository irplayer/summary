# GIT高级功能

### 在整个git仓库提交历史中找寻并删除内容

你有时可能需要查找一行你写的代码，但是就是无法找到。它可能安放在了一些已经被遗忘的分支，或是删除了很久，又或是就在那显而易见的地方。无论哪种方式，你都可以通过一些命令在整个git仓库的历史中搜寻特定的字符串。

首先，我们需要拿到所有的提交，然后，使用git grep来搜寻特定的字符串。如下：

```
git rev-list --all | xargs git grep -F '搜寻的字符串'
```

你可能有一个粗心的朋友不小心在仓库里提交了诸如，用户名、密码、外婆的大蒜食谱等敏感信息。首先，他们得更改用户名、密码（并向外婆道歉）。然后，你需要搜寻这些得罪人的文件，并将他们从整个仓库的历史里抹去（这听起来好像很容易）。经过这个处理，那些执行git pull的伙计们就会发现所有提交中包含的敏感信息都被清理干净了，而那些没有合并你的远程改动的家伙还是拥有敏感信息（所以，千万别忘记先改用户名和密码）。我们来看看怎么操作。

首先，重写每个分支的历史，移除敏感信息：

```
git filter-branch --index-filter 'git rm --cached --ignore-unmatch (filename)' --prune-empty --tag-name-filter cat -- --all
```

然后，将记录敏感信息的文件增加到.gitignore文件，并提交（括号部分替换为对应文件名）：

```
echo (filename) >> .gitignore
git add .gitignore
git commit -m "Add sensitive (filename) file to gitignore"
```

接着，由于我们改写了历史，我们需要“强制”的将改动推到远程：

```
git push origin master --force
```

最后，这个文件还在你的本地仓库里，还需要将它完全抹除：

```
du -hs .git/objects
rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now
git gc --aggressive --prune=now
du -hs .git/objects
```

你这粗心的朋友从敏感文件的危机中解脱，而你用你高超的git知识成功逆袭，成为了他的英雄！

译者注：一天，妹子叫我去她家帮她把她的三围信息从git仓库的历史里完全删除，我研究了很久不得要领。妹子说，不如我们做点其它的事吧。我觉得我的git知识被她鄙视了，坚定的说，我一定要把它删掉！然后，就没有然后了… …

## 清理git仓库

首先进行 Git 垃圾回收：
```
git gc --auto
```

其次查看 Git 仓库占用空间：
```
du -hs .git/objects
```

清理历史中的文件：

```
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch ****/nohup.out' --prune-empty --tag-name-filter cat -- --all
git filter-branch --index-filter 'git rm --cached --ignore-unmatch ****/nohup.out' HEAD
git for-each-ref --format="%(refname)" refs/original/ | xargs -n 1 git update-ref -d
```

强制提交覆盖：

```
git reflog expire --expire=now --all git gc --prune=now git push --all --force git push --all --tags --force
```

但是这个方案有 2 个问题：1. 处理速度慢，尝试清理 2 G 大小的代码库，用了 1 晚上还没跑完。2. 只能按文件名清理，如果不同的路径有同样的文件名就无法处理了，可能误删文件或者忽略某些文件。当然有个非常好的解决方案完美解决了这个问题。
