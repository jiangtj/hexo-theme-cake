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


