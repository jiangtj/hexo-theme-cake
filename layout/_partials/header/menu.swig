<nav class="site-nav">
  <ul id="menu" class="menu">
  
    {%- if theme.menu %}
      {%- for name, path in theme.menu %}
        {{- partial( '_partials/header/menu-item.swig', {name: name.toLowerCase(), value: path}) | trim -}}
      {%- endfor %}
    {%- endif %}

    {%- for inject_item in theme.injects.menu %}
      {{ partial(inject_item.layout, inject_item.locals, inject_item.options) }}
    {%- endfor %}

  </ul>
</nav>
