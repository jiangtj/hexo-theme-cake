  <article class="post post-type-{{ post.type | default('normal') }}" itemscope itemtype="http://schema.org/Article">
    <header class="post-header">
      <{%- if theme.seo %}h3{%- else %}h2{%- endif %} class="post-title">
        <a class="post-title-link" href="{{ url_for(post.path) }}" itemprop="url">
          <span itemprop="name">{{ post.title | default(__('post.untitled')) }}</span>
        </a>
      </{%- if theme.seo %}h3{%- else %}h2{%- endif %}>
      <div class="post-meta">
        <time class="post-time" itemprop="dateCreated"
              datetime="{{ moment(post.date).format() }}"
              content="{{ date(post.date, config.date_format) }}">
          {{ date(post.date, 'MM-DD') }}
        </time>
      </div>
    </header>
  </article>
