# highlight

use [hexo-filter-marked-highlight](https://github.com/jiangtj/hexo-filter-marked-highlight).

## config

if you don't want to use it, can set `disable_marked_highlight` to true.

```yml
#disable_marked_highlight: true
```

| Condition | Files loaded | Generated |
| :--- | :--- | :--- |
| enable:true | 7.8 | 4.6 |
| faster:false | 12 | 4.6 |
| enable:false | 7.9 | 5.2 |

latest performance test: https://github.com/jiangtj/hexo-theme-cake/actions
