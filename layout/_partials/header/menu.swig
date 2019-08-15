<nav class="site-nav">
  <ul id="menu" class="menu">
  
    {%- if theme.menu %}
      {%- for name, path in theme.menu %}
        {{- partial( '_partials/header/menu-item.swig', {name: name.toLowerCase(), value: path}) | trim -}}
      {%- endfor %}
    {%- endif %}

    {{- next_inject('menu') }}

  </ul>
</nav>
