{%- set itemURL = value.split('||')[0] | trim %}
{%- set menuText = __('menu.' + name) %}
{%- if menuText.indexOf('menu.') == 0 %}
  {%- set menuText = menuText | replace('menu.', '') | title %}
{%- endif %}
{%- if theme.menu_settings.icons %}
  {%- set menuIcon = '<i class="menu-item-icon ' + value.split('||')[1] | trim | default('tas fa-question-circle') + '"></i>' %}
{%- endif %}
<li class="menu-item menu-item-{{ name | replace(' ', '-', 'g') }}">
  {{ next_url(itemURL, menuIcon + menuText, {rel: 'section'}) }}
</li>
