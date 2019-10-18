
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

  {{ partial( '_partials/pagination.swig') }}

