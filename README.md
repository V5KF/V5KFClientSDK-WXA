# V5智能客服——客户端小程序接入

## 注意

小程序客服接入建议采用小程序官方客服接口(因小程序内部websocket连接问题未解决，本SDK不建议使用)，具体操作步骤如下：

 - 登录V5后台 “系统接入” -> “微信小程序” 按照填写说明进行接入配置，同时在微信公众平台小程序后台进行消息服务器配置（[接入指引](https://mp.weixin.qq.com/debug/wxadoc/dev/api/custommsg/callback_help.html)）
 - 在你的小程序中添加[客服会话按钮](https://mp.weixin.qq.com/debug/wxadoc/dev/component/contact-button.html)
 - 客服会话按钮的使用可以下载[客服会话按钮使用demo](https://github.com/V5KF/V5KFClientSDK-WXA/archive/master.zip)作为参考。

目前小程序客服接口支持：

- 机器人自动回复，输入转人工接入人工（可培训）
- 支持发送文本和图片消息

## ~~接入配置~~(不再建议使用)
- ~~拷贝整个chat文件夹到您的项目pages/下~~
- ~~配置app.json，添加chat页面：~~

    ```
    "pages":[
        "pages/chat/chat"
    ],
    ```

- ~~微信小程序管理后台添加合法域名~~

```
request合法域名:        https://chat.v5kf.com
socket合法域名:         wss://chat.v5kf.com
uploadFile合法域名:     https://chat.v5kf.com
downloadFile合法域名:   https://chat.v5kf.com
```

- ~~在需要联系客服时开启客服页面配置对应url参数：~~

    * ~~参数及说明~~
        - ~~site: 站点号[必须]~~
        - ~~oid: 用户id[建议]~~
        - ~~nickname: 用户昵称[建议]~~
        - ~~photo: 用户头像[建议]~~
        - ~~human: 是否默认人工接待~~
        - ~~magic: 透传给座席的键值对信息，格式示例：[{"key":"会员等级","val":"VIP3"}]~~

    ```
    wx.navigateTo({
      url: '../chat/chat?site=105723&oid=abcdefghijklmnopqrstuvwxyz&nickname=WXA-chy&photo=http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoGibxdHel9AAAOOtwgrqLHVdxk685EU0v8WdGSQXbcud4dHvhMheDkmMia9V5JVGZcssUjict2eLg7Q/0&magic=[{"key":"会员等级","val":"VIP3"}]'
    })
    ```

## ~~目前功能~~
- ~~机器人自动回复~~
- ~~点击转人工接入人工客服~~
- ~~支持发送文本和图片消息~~
- ~~支持传递magic参数~~
