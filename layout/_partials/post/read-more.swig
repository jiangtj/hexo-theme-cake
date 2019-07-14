{% if theme.read_more_btn and post.excerpt %}
  <div>
    <a href="{{ url_for(post.path) }}{% if theme.scroll_to_more %}#more{% endif %}" rel="contents">
      {{ __('post.read_more') }} &raquo;
    </a>
  </div>
{% endif %}