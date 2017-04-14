# GIT

![git](git.jpg)

### 安装

```
apt-add-repository ppa:git-core/ppa
apt-get update
apt-get install git
```

### 密钥

```
ssh-keygen -t rsa -C "i@liuchuanfeng.cn"
cat ~/.ssh/id_rsa.pub
```

### 配置

- 配置用户信息与常用简写

```
git config --global user.name "chuanfeng";
git config --global user.email "i@liuchuanfeng.cn";
git config --global alias.amend "commit --amend -C HEAD";
git config --global alias.back "reset --soft HEAD^";
git config --global alias.br branch;
git config --global alias.ci commit -am;
git config --global alias.co checkout;
git config --global alias.edit "commit -am 'edit'";
git config --global alias.ls "log --pretty=format:'%ad %C(yellow)%h %C(reset)%s %C(red)%d' --decorate --date=format:'%Y/%m/%d %H:%M'";
git config --global alias.st status;
git config --global alias.zip "archive master --format=zip --output ../code.zip"
git config --global alias.showcommit "show --shortstat --pretty=format:'%ai %C(yellow)%h %C(reset)%s %C(red)%d'"
```

- 其他配置

```
git config --global core.editor vim;
```

- 编码问题

```
git config --global core.quotepath false
git config --global gui.encoding utf-8
```

### 常用概念

1. Workspace：工作区
1. Index / Stage：暂存区
1. Repository：仓库区（或本地仓库）
1. Remote：远程仓库

### 基本操作

- 开始一个工作区
    ```
    clone      克隆一个仓库到一个新目录
    init       创建一个空的 Git 仓库或重新初始化一个已存在的仓库
    ```

- 在当前变更上工作
    ```
    add        添加文件内容至索引
    mv         移动或重命名一个文件、目录或符号链接
    reset      重置当前 HEAD 到指定状态
    rm         从工作区和索引中删除文件
    ```

- 检查历史和状态
    ```
    bisect     通过二分查找定位引入 bug 的提交
    grep       输出和模式匹配的行
    log        显示提交日志
    show       显示各种类型的对象
    status     显示工作区状态
    ```

- 扩展、标记和调校您的历史记录
    ```
    branch     列出、创建或删除分支
    checkout   切换分支或恢复工作区文件
    commit     记录变更到仓库
    diff       显示提交之间、提交和工作区之间等的差异
    merge      合并两个或更多开发历史
    rebase     在另一个分支上重新应用提交
    tag        创建、列出、删除或校验一个 GPG 签名的标签对象
    ```

- 协同
    ```
    fetch      从另外一个仓库下载对象和引用
    pull       获取并整合另外的仓库或一个本地分支
    push       更新远程引用和相关的对象
    ```

### 进阶操作

**代码提交**

1. 提交时显示所有diff信息
    ```
    git commit -v
    ```

1. 使用一次新的commit，替代上一次提交
    ```
    git commit --amend -m (message)
    ```

1. 重做上一次commit，并包括指定文件的新变化
    ```
    git commit --amend (file1) (file2) ...
    ```

**分支**

1. 列出所有远程分支
    ```
    git branch -r
    ```

1. 列出所有本地分支和远程分支
    ```
    git branch -a
    ```

1. 新建一个分支，但依然停留在当前分支
    ```
    git branch (branch)
    ```

1. 新建一个分支，并切换到该分支
    ```
    git checkout -b (branch)
    ```

1. 新建一个分支，指向某个tag
    ```
    git checkout -b (branch) (tag)
    ```

1. 新建一个分支，指向指定commit
    ```
    git branch (branch) (commit)
    ```

1. 新建一个分支，与指定的远程分支建立追踪关系
    ```
    git branch --track (branch) (remote-branch)
    ```

1. 切换到指定分支，并更新工作区
    ```
    git checkout (branch-name)
    ```

1. 使分支的历史归零
    ```
    git checkout --orphan (branch)
    ```

1. 切换到上一个分支
    ```
    git checkout -
    ```

1. 建立追踪关系，在现有分支与指定的远程分支之间
    ```
    git branch --set-upstream (branch) (remote-branch)
    ```

1. 合并指定分支到当前分支
    ```
    git merge (branch)
    ```

1. 选择一个commit，合并进当前分支
    ```
    git cherry-pick (commit)
    ```

1. 删除分支
    ```
    git branch -d (branch)
    ```

1. 删除远程分支
    ```
    git push origin --delete (branch)
    git branch -dr (remote/branch)
    ```

**标签**

**查看信息**

1. 显示有变更的文件
    ```
    git status
    ```

1. 显示当前分支的版本历史
    ```
    git log
    ```

1. 显示commit历史，以及每次commit发生变更的文件
    ```
    git log --stat
    ```

1. 搜索提交历史，根据关键词
    ```
    git log -S (keyword)
    ```

1. 显示某个commit之后的所有变动，每个commit占据一行
    ```
    git log (tag) HEAD --pretty=format:%s
    git log --pretty=oneline
    ```

1. 显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件
    ```
    git log (tag) HEAD --grep feature
    ```

1. 显示某个文件的版本历史，包括文件改名
    ```
    git log --follow (file)
    git whatchanged (file)
    ```

1. 显示指定文件相关的每一次diff
    ```
    git log -p (file)
    ```

1. 显示所有提交过的用户，按提交次数排序
    ```
    git shortlog -sn
    ```

1. 显示指定文件是什么人在什么时间修改过
    ```
    git blame (file)
    ```

1. 显示暂存区和工作区的差异
    ```
    git diff
    ```

1. 显示暂存区和上一个commit的差异
    ```
    git diff --cached (file)
    ```

1. 显示工作区与当前分支最新commit之间的差异
    ```
    git diff HEAD
    ```

1. 显示两次提交之间的差异
    ```
    git diff (first-branch)...(second-branch)
    ```

1. 显示某次提交的元数据和内容变化
    ```
    git show (commit)
    ```

1. 显示某次提交发生变化的文件
    ```
    git show --name-only (commit)
    ```

1. 显示某次提交时，某个文件的内容
    ```
    git show (commit):(filename)
    ```

1. 显示当前分支的最近几次提交
    ```
    git reflog
    ```

**远程同步**

1. 下载远程仓库的所有变动
    ```
    git fetch (remote)
    ```

1. 显示所有远程仓库
    ```
    git remote -v
    ```

1. 显示某个远程仓库的信息
    ```
    git remote show (remote)
    ```

1. 增加一个新的远程仓库，并命名
    ```
    git remote add (shortname) (url)
    ```

1. 取回远程仓库的变化，并与本地分支合并
    ```
    git pull (remote) (branch)
    ```

1. 上传本地指定分支到远程仓库
    ```
    git push (remote) (branch)
    ```

1. 强行推送当前分支到远程仓库，即使有冲突
    ```
    git push (remote) --force
    ```

1. 推送所有分支到远程仓库
    ```
    git push (remote) --all
    ```

**撤销**

1. 恢复暂存区的指定文件到工作区
    ```
    git checkout -- (file)
    ```

1. 恢复某个commit的指定文件到暂存区和工作区
    ```
    git checkout (commit) (file)
    ```

1. 恢复暂存区的所有文件到工作区
    ```
    git checkout .
    ```

1. 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变
    ```
    git reset (file)
    ```

1. 重置暂存区与工作区，与上一次commit保持一致
    ```
    git reset --hard
    ```

1. 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变
    ```
    git reset (commit)
    ```

1. 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
    ```
    git reset --hard (commit)
    ```

1. 重置当前HEAD为指定commit，但保持暂存区和工作区不变
    ```
    git reset --keep (commit)
    ```

1. 新建一个commit，用来撤销指定commit(后者的所有变化都将被前者抵消，并且应用到当前分支)
    ```
    git revert (commit)
    ```

1. 暂时将未提交的变化移除，稍后再移入
    ```
    git stash
    git stash pop
    ```

**其他**

1. 删除远程tag
    ```
    git push origin :refs/tags/(tag)
    ```

1. 忽略文件跟踪及恢复
    ```
    git update-index --assume-unchanged (file)
    git update-index --no-assume-unchanged (file)
    ```

1. 生成一个可供发布的压缩包
    ```
    git archive
    ```

1. 修改历史提交
    ```
    git filter-branch -f --env-filter "GIT_AUTHOR_NAME='chuanfeng'; GIT_COMMITTER_NAME='chuanfeng';" HEAD
    ```

1. 清理工作目录
    ```
    du -hs .git/objects

    git gc --aggressive
    git fsck
    ```

### 高级操作

- [查看](advance.md)
