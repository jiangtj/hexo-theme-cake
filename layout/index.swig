{%- extends '_layout.swig' %}

{%- block title %}{{ title }}{%- if theme.index_with_subtitle and subtitle %} – {{ subtitle }}{%- endif %}{%- endblock %}

{%- block page_class %}
  {%- if is_home() %}page-home{%- endif -%}
{%- endblock %}

{%- block content %}
  <section id="posts" class="posts-expand">
    {%- for post in page.posts %}
      {{ partial('_partials/post.swig', {is_index: true}) }}
    {%- endfor %}
  </section>

  {{ partial( '_partials/pagination.swig') }}
{%- endblock %}
