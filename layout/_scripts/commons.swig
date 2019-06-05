{#
    'motion.js',
#}
{%
  set js_commons = [
    'utils.js',
    'affix.js',
    'schemes/pisces.js',
  ]
%}

{% for common in js_commons %}
  <script src="{{ url_for(theme.js) }}/{{ common }}?v={{ version }}"></script>
{% endfor %}
