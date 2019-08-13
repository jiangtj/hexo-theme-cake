{%- set itemURL = value.split('||')[0] | trim %}
{%- set menuText = __('menu.' + name) %}
{%- if menuText.indexOf('menu.') == 0 %}
  {%- set menuText = menuText | replace('menu.', '') | title %}
{%- endif %}
{%- if theme.menu_settings.icons %}
  {%- set menuIcon = '<i class="menu-item-icon fa fa-fw fa-' + value.split('||')[1] | trim | default('question-circle') + '"></i> <br/>' %}
{%- endif %}
<li class="menu-item menu-item-{{ itemName | replace(' ', '-', 'g') }}">
  {{ next_url(itemURL, menuIcon + menuText + menuBadge, {rel: 'section'}) }}
</li>
