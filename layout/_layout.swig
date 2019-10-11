<!DOCTYPE html>

{# NexT version #}
{%- set version = next_env('version') %}

{# Language & Config #}
{%- set title = __('title') !== 'title' && __('title') || config.title %}
{%- set subtitle = __('subtitle') !== 'subtitle' && __('subtitle') || config.subtitle %}
{%- set author = __('author') !== 'author' && __('author') || config.author %}
{%- set description = __('description') !== 'description' && __('description') || config.description %}

{%- set html_class = 'theme-next ' + theme.scheme %}

<html class="{{ html_class | lower }}" lang="{{ config.language }}">
<head>
  {{ partial('_partials/head/head.swig', {}, {cache: true}) }}
  {{ partial( '_partials/head/head-unique.swig') }}
  {{- next_inject('head') }}
  <title>{%- block title %}{%- endblock %}</title>
</head>

<body itemscope itemtype="http://schema.org/WebPage" lang="{{ page.lang || page.language || config.language }}">

  <header class="main-header" itemscope itemtype="http://schema.org/WPHeader">
    <div class="header-inner">{{ partial( '_partials/header/index.swig') }}</div>
    {{- next_inject('header') }}
  </header>

  <div class="flex-container">

    {%- block sidebar %}{%- endblock %}

    <div class="flex-main">

      <main>
        <div class="sub-menu-wrap">
          {{ partial( '_partials/post/post-menu.swig') }}
        </div>
        <div id="content" class="content">
          {%- block content %}{%- endblock %}
        </div>
        {{ partial( '_partials/comments.swig') }}
      </main>

      <footer class="footer">
        <div class="footer-inner">
          {{ partial('_partials/footer.swig', {}, {cache: true}) }}
          {%- block footer %}{%- endblock %}
        </div>
      </footer>

    </div>

  </div>

  {{- partial( '_scripts/commons.swig', {}, {cache: true}) }}
  {{- next_inject('bodyEnd') }}

</body>
</html>
