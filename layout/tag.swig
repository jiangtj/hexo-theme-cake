{%- extends '_layout.swig' %}

{%- block title %}{{ __('title.tag') }}: {{ page.tag }} | {{ title }}{%- endblock %}

{%- block content %}

  {%- if theme.scheme === 'Neet' %}
    <div id="posts" class="posts-expand posts-categories-left page-sidebar-moblie-hidden">
      {{ partial( '_neet/page-tags.swig') }}
    </div>
    <div class="posts-categories-right">
  {%- endif %}

  {#################}
  {### TAG BLOCK ###}
  {#################}
  <div class="post-block tag">

    <div id="posts" class="posts-collapse">
      <div class="collection-title">
        <{%- if theme.seo %}h2{%- else %}h1{%- endif %}>{#
        #}{{ page.tag }}{#
        #}<small>{{ __('title.tag') }}</small>
        </{%- if theme.seo %}h2{%- else %}h1{%- endif %}>
      </div>

      {%- for post in page.posts %}
        {{ partial('_partials/post-collapse.swig') }}
      {%- endfor %}
    </div>

  </div>
  {#####################}
  {### END TAG BLOCK ###}
  {#####################}

  {%- if theme.scheme === 'Neet' %}
    </div>
  {%- endif %}

  {{ partial( '_partials/pagination.swig') }}

{%- endblock %}
