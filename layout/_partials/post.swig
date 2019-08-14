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
    <span hidden itemprop="author" itemscope itemtype="http://schema.org/Person">
      <meta itemprop="name" content="{{ author }}"/>
      <meta itemprop="description" content="{{ description }}"/>
      <meta itemprop="image" content="{{ url_for( theme.avatar.url | default(theme.images + '/avatar.gif') ) }}"/>
    </span>
    <span hidden itemprop="publisher" itemscope itemtype="http://schema.org/Organization">
      <meta itemprop="name" content="{{ title }}"/>
    </span>

    {{ partial( '_partials/post/banner.swig') }}

      <header class="post-header">

        {# title #}
        {%- if post.title %}
          <h2 class="post-title" itemprop="name headline">
           {%- if post.link %}
              {%- set postTitleIcon = '<i class="fa fa-external-link"></i>' %}
              {%- set postText = post.title or post.link %}
              {{ next_url(post.link, postText + postTitleIcon, {class: 'post-title-link post-title-link-external', itemprop: 'url' }) }}
            {%- else %}
              {%- if is_index %}
                {{ next_url(post.path, post.title | default(__('post.untitled')), {class: 'post-title-link', itemprop: 'url' }) }}
              {%- else -%}
                {{- post.title -}}
              {%- endif %}
            {%- endif %}
          </h2>
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
      {%- for inject_item in theme.injects.postBodyEnd %}
        {{ partial(inject_item.layout, inject_item.locals, inject_item.options) }}
      {%- endfor %}
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
                <i class="fa fa-chevron-left"></i> {{ post.next.title }}
              </a>
            {%- endif %}
          </div>

          <span class="post-nav-divider"></span>

          <div class="post-nav-prev post-nav-item">
            {%- if post.prev %}
              <a href="{{ url_for(post.prev.path) }}" rel="prev" title="{{ post.prev.title }}">
                {{ post.prev.title }} <i class="fa fa-chevron-right"></i>
              </a>
            {%- endif %}
          </div>
        </div>
      {%- endif %}

      {%- set isLast = loop.index % page.per_page === 0 %}
      {%- if is_index and not isLast %}
        <div class="post-eof"></div>
      {%- endif %}
    </footer>
  </div>
  {######################}
  {### END POST BLOCK ###}
  {######################}
  </article>
