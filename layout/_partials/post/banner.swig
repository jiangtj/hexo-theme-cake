
{%- if post.banner %}
  <div class="post-banner">
    {{- cake_image(post.banner, {zoomable: false}, 'alt="post banner"') }}
  </div>
  <meta itemprop="image" content="{{ post.banner }}">
{%- endif %}
