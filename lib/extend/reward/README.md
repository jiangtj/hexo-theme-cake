# reward

Add reward button for your blog.

## config

Need config reward in hexo `_config.yml`

```yml
reward:
  # If false, any config in front-matter will not take effect.
  enable: true
  # When `page.reward.enable` didn't set, we will pick it.
  default: true
  # Some words you want to say.
  comment: Buy me a cup of milkshake 🍨.
  # Set available reward items, example as follows.
  items:
    #wechat:
    #  icon: {name: weixin, options: {prefix: 'fab'}}
    #  image: /images/wechatpay.png
    #alipay:
    #  icon: {name: alipay, options: {prefix: 'fab'}}
    #  image: /images/alipay.png
    #  url_name: 点击跳转
    #  url: HTTPS://QR.ALIPAY.COM/FKX06416WJNHOWKMRQQFFE
    #paypal:
    #  icon: {name: paypal, options: {prefix: 'fab'}}
    #  image: /images/paypal.png
    #  url: https://www.paypal.me/jiangtj
    #kofi:
    #  icon: {name: coffee, options: {prefix: 'fas'}}
    #  image: /images/kofi.png
    #  url: https://ko-fi.com/jiangtj
    #other:
    #  name: Pay
    #  image: /images/other-pay.png
```

If you want to define it specifically in the article. Can be configured in post `front-matter`

```yml
title: xxxx
# ...
reward:
  # default `reward.default` in _config.yml.
  enable: true
  comment: Buy me a cup of milkshake 🍨.
  # default all available reward items
  items: [wechat,alipay]
```
