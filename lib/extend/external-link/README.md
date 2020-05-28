# external-link

external link, may be for SEO? it will faster handle than default. If you want to use default external link, please disable this.

## config

```yml
marked_external_link:
  enable: true
  faster: true # if true, use String.replace, else use chreeio.load
  target: _blank
  rel: noopener # noopener external nofollow noreferrer
  exclude: []
```

| Condition | Files loaded | Generated |
| :--- | :--- | :--- |
| enable:true | 7.8 | 4.6 |
| faster:false | 12 | 4.6 |
| enable:false | 7.9 | 5.2 |

latest performance test: https://github.com/jiangtj/hexo-theme-cake/actions
