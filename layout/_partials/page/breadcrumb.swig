{% if page.breadcrumb %}
  <ul class="breadcrumb">
    {% for name,path in page.breadcrumb %}
      {% if path %}
        <li><a href="{{ url_for(path) }}">{{ name | upper }}</a></li>
      {% else %}
        <li>{{ name | upper }}</li>
      {% endif %}
    {% endfor %}
  </ul>
{% endif %}
