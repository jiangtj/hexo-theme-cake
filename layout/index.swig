{%- extends '_layout.swig' %}

{%- block content %}
  <section id="posts" class="posts-expand">
    {%- for post in page.posts %}
      {{ partial('_partials/post.swig', {is_index: true}) }}
    {%- endfor %}
  </section>

  {{ partial( '_partials/pagination.swig') }}
{%- endblock %}
