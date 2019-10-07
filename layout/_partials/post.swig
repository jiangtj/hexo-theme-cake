  {%- set post_class = 'post post-type-' + post.type | default('normal') %}
  {%- if post_extra_class > 0 %}
    {%- set post_class = post_class + ' ' + post_extra_class | default('') %}
  {%- endif %}

  <article class="{{ post_class }}" itemscope itemtype="http://schema.org/Article">
  {##################}
  {### POST BLOCK ###}
  {##################}
  <div class="post-block">

    {# POST info #}
    <link itemprop="mainEntityOfPage" href="{{ config.url }}{{ url_for(post.path) }}"/>
    <meta itemprop="dateCreated datePublished" content="{{ moment(post.date).format() }}"/>
    <meta itemprop="dateModified" content="{{ moment(post.updated).format() }}"/>
    <span hidden itemprop="author" itemscope itemtype="http://schema.org/Person">
      <meta itemprop="name" content="{{ author }}"/>
      <meta itemprop="description" content="{{ description }}"/>
      <meta itemprop="image" content="{{ url_for( theme.avatar.url | default('images/avatar.gif') ) }}"/>
    </span>
    <span hidden itemprop="publisher" itemscope itemtype="http://schema.org/Organization">
      <meta itemprop="name" content="{{ title }}"/>
      <span itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">
        <meta itemprop="url" content="{{ url_for(theme.favicon.small) }}?v={{ version }}"/>
      </span>
    </span>

    {{ partial( '_partials/post/banner.swig') }}

      <header class="post-header">

        {# title #}
        {%- if post.title %}
          <h1 class="post-title" itemprop="name headline">
            {%- if is_index %}
              {{ next_url(post.path, post.title | default(__('post.untitled')), {class: 'post-title-link', itemprop: 'url' }) }}
            {%- else -%}
              {{- post.title -}}
            {%- endif %}
          </h1>
        {%- endif %}

        {{ partial( '_partials/post/meta.swig') }}

      </header>

    {#################}
    {### POST BODY ###}
    {#################}
    <div class="post-body{%- if post.direction && post.direction.toLowerCase() === 'rtl' %} rtl{%- endif %}" itemprop="articleBody">

      {%- if is_index %}
        {%- if post.excerpt %}
          {{ post.excerpt }}
        {%- else %}
          {%- if post.type === 'picture' %}
            <a href="{{ url_for(post.path) }}">{{ post.content }}</a>
          {%- else %}
            {{ post.content }}
          {%- endif %}
        {%- endif %}

        {{ partial( '_partials/post/read-more.swig') }}

      {%- else %}
        {{ post.content }}
      {%- endif %}
    </div>

    {%- if not is_index %}
      {{- next_inject('postBodyEnd') }}
    {%- endif %}

    {#####################}
    {### END POST BODY ###}
    {#####################}

    <footer class="post-footer">

      {%- if not is_index and (post.prev or post.next) %}
        <div class="post-nav">
          <div class="post-nav-next post-nav-item">
            {%- if post.next %}
              <a href="{{ url_for(post.next.path) }}" rel="next" title="{{ post.next.title }}">
                <i class="fas fa-chevron-left"></i> {{ post.next.title }}
              </a>
            {%- endif %}
          </div>

          <span class="post-nav-divider"></span>

          <div class="post-nav-prev post-nav-item">
            {%- if post.prev %}
              <a href="{{ url_for(post.prev.path) }}" rel="prev" title="{{ post.prev.title }}">
                {{ post.prev.title }} <i class="fas fa-chevron-right"></i>
              </a>
            {%- endif %}
          </div>
        </div>
      {%- endif %}
    </footer>
  </div>
  {######################}
  {### END POST BLOCK ###}
  {######################}
  </article>
