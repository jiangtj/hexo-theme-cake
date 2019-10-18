{%- extends '_layout.swig' %}

{%- block content %}

  <div id="posts" class="posts-expand">
    {{ partial('_partials/post.swig', {post: page}) }}
  </div>

{%- endblock %}
