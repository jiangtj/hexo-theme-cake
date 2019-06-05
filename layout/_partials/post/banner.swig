
{% if post.banner %}
  <div class="post-banner">
    <img class="post-banner-img" src="{{ url_for(post.banner) }}" itemprop="image"/>
  </div>
{% endif %}
