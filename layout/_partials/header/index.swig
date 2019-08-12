{{ partial('_partials/header/brand.swig', {}, {cache: true}) }}
{{ partial( 'menu.swig') }}

{%- for inject_item in theme.injects.header %}
  {{ partial(inject_item.layout, inject_item.locals, inject_item.options) }}
{%- endfor %}
