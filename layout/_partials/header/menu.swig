<nav class="site-nav">
  {%- if theme.menu %}
    <ul id="menu" class="menu">
      {%- for name, path in theme.menu %}
        {%- set respath = path %}
        {%- if path == '[object Object]' %}
        {# Main Menu (default menu item for Submenu) #}
          {%- for subname, subpath in path %}
            {%- set itemName = subname.toLowerCase() %}
            {%- set respath = subpath %}
            {%- if itemName == 'default' %}
              {%- set itemName = name.toLowerCase() %}
              {{ partial( '_macro/menu/menu-item.swig', {name: name, value: respath}) }}
            {%- endif %}
          {%- endfor %}
        {%- else %}
        {# Main Menu (standart menu items) #}
          {%- set itemName = name.toLowerCase() %}
          {{- partial( '_macro/menu/menu-item.swig', {name: name, value: respath}) | trim -}}
        {%- endif -%}
      {%- endfor %}

      {%- for inject_item in theme.injects.menu %}
        {{ partial(inject_item.layout, inject_item.locals, inject_item.options) }}
      {%- endfor %}

    </ul>
  {%- endif %}
</nav>
