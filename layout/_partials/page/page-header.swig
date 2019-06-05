<header class="post-header">

<{% if theme.seo %}h2{% else %}h1{% endif %} class="post-title" itemprop="name headline">
  {{- page.title -}}
  {{ partial( '../post-edit.swig') }}
</{% if theme.seo %}h2{% else %}h1{% endif %}>

<div class="post-meta">
  {{ partial( 'breadcrumb.swig') }}
  {% if page.description %}
    <div class="post-description">{{ page.description }}</div>
  {% endif %}
</div>

</header>
