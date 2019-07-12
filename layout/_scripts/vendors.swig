{# Reset `window.Promise` when it was not a function. #}
<script>
  if (Object.prototype.toString.call(window.Promise) !== '[object Function]') {
    window.Promise = null;
  }
</script>

{% set js_vendors = {} %}
{% set js_vendors.jquery = 'jquery/index.js?v=2.1.3' %}

{% if theme.fastclick %}
  {% set js_vendors.fastclick = 'fastclick/lib/fastclick.min.js?v=1.0.6' %}
{% endif %}

{% if theme.reading_progress.enable %}
  {% set js_vendors.reading_progress = 'reading_progress/reading_progress.js' %}
{% endif %}

{% for name, internal in js_vendors %}
  {% set internal_script = url_for(theme.vendors._internal + '/' + internal) %}
  <script src="{{ theme.vendors[name] | default(internal_script) }}"></script>
{% endfor %}
