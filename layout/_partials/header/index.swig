{{ partial('_partials/header/brand.swig', {}, {cache: true}) }}
{{ partial( 'menu.swig') }}

{% for inject_name,inject_args in theme.injects.header %}
  {{ partial(inject_args.layout, inject_args.locals, inject_args.options) }}
{% endfor %}
