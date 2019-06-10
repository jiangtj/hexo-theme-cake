<!DOCTYPE html>

{# NexT version #}
{% set version = next_env('version') %}

{# Language & Config #}
{% set title = __('title') !== 'title' && __('title') || config.title %}
{% set subtitle = __('subtitle') !== 'subtitle' && __('subtitle') || config.subtitle %}
{% set author = __('author') !== 'author' && __('author') || config.author %}
{% set description = __('description') !== 'description' && __('description') || config.description %}

{% set html_class = 'theme-next ' + theme.scheme %}
{% if theme.motion.enable %}
  {% set html_class = html_class + ' use-motion' %}
{% endif %}

<html class="{{ html_class | lower }}" lang="{{ config.language }}">
<head>
  {{ partial('_partials/head/head.swig', {}, {cache: true}) }}
  {{ partial( '_partials/head/head-unique.swig') }}
  <title>{% block title %}{% endblock %}</title>
  {{ partial( '_third-party/analytics/index.swig') }}
</head>

<body itemscope itemtype="http://schema.org/WebPage" lang="{{ page.lang || page.language || config.language }}">

  {% set container_class = 'container' %}
  {% if theme.sidebar.position %}
    {% set container_class = container_class + ' sidebar-position-' + theme.sidebar.position %}
  {% endif %}

  <div class="{{ container_class }} {% block page_class %}{% endblock %}">
    <div class="headband"></div>

    <header id="header" class="header" itemscope itemtype="http://schema.org/WPHeader">
      <div class="header-inner">{{ partial( '_partials/header/index.swig') }}</div>
    </header>

    {{ partial('_partials/github-banner.swig', {}, {cache: true}) }}

    <main id="main" class="main">
      <div class="main-inner">
        <div class="content-wrap">
          <div class="sub-menu-wrap">
            {{ partial( '_partials/post/post-menu.swig') }}
          </div>
          <div id="content" class="content">
            {% block content %}{% endblock %}
          </div>
          {{ partial( '_partials/comments.swig') }}
        </div>
        {% if theme.sidebar.display !== 'remove' %}
          {% block sidebar %}{% endblock %}
        {% endif %}
      </div>
    </main>

    <footer id="footer" class="footer">
      <div class="footer-inner">
        {{ partial('_partials/footer.swig', {}, {cache: true}) }}
        {{ partial( '_third-party/analytics/analytics-with-widget.swig') }}
        {% block footer %}{% endblock %}
      </div>
    </footer>

    {% if theme.back2top.enable and not theme.back2top.sidebar %}
      <div class="back-to-top">
        <i class="fa fa-arrow-up"></i>
        {% if theme.back2top.scrollpercent %}
          <span id="scrollpercent"><span>0</span>%</span>
        {% endif %}
      </div>
    {% endif %}

    {% if theme.needmoreshare2.enable and theme.needmoreshare2.float.enable %}
      <div id="needsharebutton-float">
        <span class="btn">
          <i class="fa fa-share-alt" aria-hidden="true"></i>
        </span>
      </div>
    {% endif %}

    {% if theme.baidushare and theme.baidushare.type === "slide" %}
      <div>
        {{ partial( '_partials/share/baidushare.swig') }}
      </div>
    {% endif %}

    {% if theme.add_this_id %}
      <div>
        {{ partial( '_partials/share/add-this.swig') }}
      </div>
    {% endif %}
  </div>

  {{ partial( '_scripts/vendors.swig', {}, {cache: true}) }}
  {{ partial( '_scripts/commons.swig', {}, {cache: true}) }}

  {% block script_extra %}{% endblock %}

  {{ partial( '_scripts/next-boot.swig', {}, {cache: true}) }}
  {{ partial( '_scripts/scroll-cookie.swig', {}, {cache: true}) }}
  {{ partial( '_third-party/comments/index.swig') }}
  {{ partial( '_third-party/search/index.swig') }}
  {{ partial( '_third-party/analytics/lean-analytics.swig') }}
  {{ partial( '_third-party/analytics/firestore.swig') }}
  {{ partial( '_third-party/schedule.swig') }}
  {{ partial( '_third-party/needsharebutton.swig', {}, {cache: true}) }}
  {{ partial( '_third-party/rating.swig') }}
  {{ partial( '_third-party/pangu.swig', {}, {cache: true}) }}
  {{ partial( '_third-party/copy-code.swig', {}, {cache: true}) }}

  {% for inject_name,inject_args in theme.injects.bodyEnd %}
    {{ partial(inject_args.layout, inject_args.locals, inject_args.options) }}
  {% endfor %}

</body>
</html>
