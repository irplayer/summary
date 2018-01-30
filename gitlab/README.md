# *GitLab*

## *Installation*

1. ***Install and configure the necessary dependencies***

    ```
    sudo apt-get install -y curl openssh-server ca-certificates postfix
    ```
    During Postfix installation a configuration screen may appear. Select `Internet Site` and press enter. Use your server's external DNS for `mail name` and press enter. If additional screens appear, continue to press enter to accept the defaults.

1. ***Add the GitLab package repository and install the package***

    Add the GitLab package repository.
    ```
    curl -sS https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.deb.sh | sudo bash
    ```
    Next, install the GitLab package.
    ```
    sudo apt-get install gitlab-ce
    ```

1. ***Configure and start GitLab***

    ```
    sudo gitlab-ctl reconfigure
    ```
    Reconfiguring GitLab will take a couple of minutes, as components are set up and started. A log is displayed of all actions, which will include green and grey lines.

1. ***Browse to the hostname and login***

    Browse to the hostname in a web browser. On your first visit, you'll be redirected to a password reset screen to provide the password for the initial administrator account. Enter your desired password and you'll be redirected back to the login screen.

    The default account's username is `root`. Provide the password you created earlier and login. After login you can change the username if you wish.

## *Configure*

GitLab is configured by setting the relevant options in `/etc/gitlab/gitlab.rb` . See package defaults for a list of default settings and visit the gitlab.rb.template for a complete list of available options. New installations starting from GitLab 7.6, will have all the options of the template as of installation listed in `/etc/gitlab/gitlab.rb` by default.

- ***Configuring the external URL for GitLab***

    In order for GitLab to display correct repository clone links to your users it needs to know the URL under which it is reached by your users, e.g. `http://git.haithing.com` . Add or edit the following line in `/etc/gitlab/gitlab.rb` :
    ```
    external_url "http://git.haithing.com"
    nginx['listen_addresses'] = ['git.haithing.com', '[::]']
    ```
    Run `sudo gitlab-ctl reconfigure` for the change to take effect.


执行 gitlab-rails console进入控制台。 然后在控制台提示符后输入下面的命令 发送一封测试邮件：Notify.test_email('收件人邮箱', '邮件标题', '邮件正文').deliver_now