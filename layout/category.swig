

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
        {{ partial('_partials/post-collapse.swig') }}
      {%- endfor %}
    </div>

  </div>
  {##########################}
  {### END CATEGORY BLOCK ###}
  {##########################}

  {{ partial( '_partials/pagination.swig') }}

