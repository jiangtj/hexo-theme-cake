{{ partial('_partials/header/brand.swig', {}, {cache: true}) }}
{{ partial('_partials/header/menu.swig', {}, {cache: true}) }}

{%- for inject_item in theme.injects.header %}
  {{ partial(inject_item.layout, inject_item.locals, inject_item.options) }}
{%- endfor %}
