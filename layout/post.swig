{% extends '_layout.swig' %}

{% block title %}{{ page.title }} | {{ title }}{% endblock %}

{% block page_class %}page-post-detail{% endblock %}

{% block content %}

  <div id="posts" class="posts-expand">
    {{ partial('_macro/post.swig', {post: page}) }}
  </div>

{% endblock %}

{% block sidebar %}
  {{ partial('_macro/sidebar.swig') }}
{% endblock %}

{% block script_extra %}
  {{ partial( '_scripts/pages/post-details.swig', {}, {cache: true}) }}
{% endblock %}
