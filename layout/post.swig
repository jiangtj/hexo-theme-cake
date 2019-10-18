{%- extends '_layout.swig' %}

{%- block page_class %}page-post-detail{%- endblock %}

{%- block content %}

  <div id="posts" class="posts-expand">
    {{ partial('_partials/post.swig', {post: page}) }}
  </div>

{%- endblock %}
