{% if not is_home() and page.menu %}
  <ul id="sub-menu" class="sub-menu menu">
    {% for subname, subvalue in page.menu %}
      <li class="menu-item">
        {% set itemURL = subvalue.split('||')[0] | trim %}
        {% if itemURL.indexOf('http') != 0 %}
          {% set itemURL = itemURL | replace('//', '/', 'g') %}
        {% endif %}
        {% set post_menu_icon = '<i class="menu-item-icon fa fa-fw fa-' + subvalue.split('||')[1] | trim | default('question-circle') + '"></i> <br/>' %}
        {{ next_url(itemURL, post_menu_icon + subname, {rel: 'section'}) }}
      </li>
    {% endfor %}
  </ul>
{% endif %}
