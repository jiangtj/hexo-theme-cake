{% if theme.algolia_search.enable %}
  {{ partial( 'algolia-search.swig') }}
{% elif theme.swiftype_key %}
  {{ partial( 'swiftype.swig') }}
{% elif theme.local_search.enable %}
  {{ partial( 'localsearch.swig') }}
{% endif %}
