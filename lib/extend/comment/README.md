# Comment

This a buildin comment system for cake theme. All configurations can be found in the comments plugin folder.

## List

- [disqus](disqus)
- [livere](livere)
- [utteranc](utteranc)

## Example

You cam config it in your hexo or theme `_config.yml`.

Here is a disqus example

```yml
comment:
  - name: disqus # require
    button: # options, button content, if you use mutli-comment, it will be display
    # name and button are defined by common handler, other config are defined by plugin self.
    options:
      shortname: your name
    meta:
      enable: true/false
```
