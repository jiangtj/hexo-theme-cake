<title>
{%- if is_home() %}
{{ title }}{%- if theme.index_with_subtitle and subtitle %} – {{ subtitle }}{%- endif %}
{%- elif is_post() %}
{{ page.title }} | {{ title }}
{%- elif is_page() %}
  {%- set page_title_suffix = ' | ' + title %}
  {%- if page.type === 'categories' and not page.title %}
    {{ __('title.category') + page_title_suffix }}
  {%- elif page.type === 'tags' and not page.title %}
    {{ __('title.tag') + page_title_suffix }}
  {%- else %}
    {{ page.title + page_title_suffix }}
  {%- endif %}
{%- elif is_archive() %}
{{ __('title.archive') }} | {{ title }}
{%- elif is_category() %}
{{ __('title.category') }}: {{ page.category }} | {{ title }}
{%- elif is_tag() %}
{{ __('title.tag') }}: {{ page.tag }} | {{ title }}
{%- endif %}
</title>
