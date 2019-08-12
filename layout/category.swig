{%- extends '_layout.swig' %}

{%- block title %}{{ __('title.category') }}: {{ page.category }} | {{ title }}{%- endblock %}

{%- block content %}

  {%- if theme.scheme === 'Neet' %}
    <div id="posts" class="posts-expand posts-categories-left page-sidebar-moblie-hidden">
      {{ partial( '_neet/page-categories.swig') }}
    </div>
    <div class="posts-categories-right">
  {%- endif %}

  {######################}
  {### CATEGORY BLOCK ###}
  {######################}
  <div class="post-block category">

    <div id="posts" class="posts-collapse">
      <div class="collection-title">
        <{%- if theme.seo %}h2{%- else %}h1{%- endif %}>{#
        #}{{ page.category }}{#
        #}<small>{{ __('title.category') }}</small>
        </{%- if theme.seo %}h2{%- else %}h1{%- endif %}>
      </div>

      {%- for post in page.posts %}
        {{ partial('_macro/post-collapse.swig') }}
      {%- endfor %}
    </div>

  </div>
  {##########################}
  {### END CATEGORY BLOCK ###}
  {##########################}

  {{ partial( '_partials/pagination.swig') }}

  {%- if theme.scheme === 'Neet' %}
    </div>
  {%- endif %}

{%- endblock %}

{%- block sidebar %}
  {{ partial('_macro/sidebar.swig') }}
{%- endblock %}
