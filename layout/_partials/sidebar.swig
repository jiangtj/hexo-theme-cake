

  <aside class="sidebar">

    <div class="header-inner">
      {{ partial( '_partials/header/index.swig') }}
    </div>

    <div class="sidebar-inner">

      {%- set display_toc = is_post() and theme.toc.enable or is_page and theme.toc.enable %}
      {%- set next_toc_number = theme.toc.number %}
      {%- if page.toc_number !== undefined %}
        {%- set next_toc_number = page.toc_number %}
      {%- endif %}
      {%- set next_toc_max_depth = page.toc_max_depth|default(theme.toc.max_depth)|default(6) %}
      {%- set toc = toc(page.content, { "class": "nav", list_number: next_toc_number, max_depth: next_toc_max_depth }) %}
      {%- set display_toc = display_toc and toc.length > 1 %}

      {%- if display_toc %}
        <ul class="sidebar-nav">
          <li class="sidebar-nav-toc sidebar-nav-active">
            {{ __('sidebar.toc') }}
          </li>
          <li class="sidebar-nav-overview">
            {{ __('sidebar.overview') }}
          </li>
        </ul>
      {%- endif %}

      {%- if display_toc %}
      <!--noindex-->
        <div class="post-toc-wrap sidebar-panel sidebar-panel-active">
          <div class="post-toc">{{ toc }}</div>
        </div>
      <!--/noindex-->
      {%- endif %}

      <div class="site-overview-wrap sidebar-panel{%- if not display_toc %} sidebar-panel-active{%- endif %}">
        <div class="site-overview">
          <div class="site-author" itemprop="author" itemscope itemtype="http://schema.org/Person">
            {%- if theme.avatar.url %}
              <img class="site-author-image" itemprop="image"
                src="{{ url_for( theme.avatar.url | default('images/avatar.gif') ) }}"
                alt="{{ author }}"/>
            {%- endif %}
              <p class="site-author-name" itemprop="name">{{ author }}</p>
              <div class="site-description" itemprop="description">{{ description }}</div>
          </div>

          {%- if theme.site_state %}
            <nav class="site-state">
              {%- if config.archive_dir != '/' and site.posts.length > 0 %}
                <div class="site-state-item site-state-posts">
                  <a href="{{ url_for(theme.menu.archives.split('||')[0]|trim) }}">
                    <span class="site-state-item-count">{{ site.posts.length }}</span>
                    <span class="site-state-item-name">{{ __('state.posts') }}</span>
                  </a>
                </div>
              {%- endif %}

              {%- if site.categories.length > 0 %}
                <div class="site-state-item site-state-categories">
                  <a href="{{ url_for(theme.menu.categories.split('||')[0]|trim) }}">
                    <span class="site-state-item-count">{{ site.categories.length }}</span>
                    <span class="site-state-item-name">{{ __('state.categories') }}</span>
                  </a>
                </div>
              {%- endif %}

              {%- if site.tags.length > 0 %}
                <div class="site-state-item site-state-tags">
                  <a href="{{ url_for(theme.menu.tags.split('||')[0]|trim) }}">
                    <span class="site-state-item-count">{{ site.tags.length }}</span>
                    <span class="site-state-item-name">{{ __('state.tags') }}</span>
                  </a>
                </div>
              {%- endif %}
            </nav>
          {%- endif %}

          {%- if theme.social %}
            <div class="links-of-author">
              {%- for name, link in theme.social %}
                <span class="links-of-author-item">
                  {%- set sidebarURL = link.split('||')[0] | trim %}
                  {%- if not (theme.social_icons.enable) or (not theme.social_icons.icons_only) %}
                    {%- set sidebarText = name %}
                  {%- endif %}
                  {%- if theme.social_icons.enable %}
                    {%- set sidebarIcon = '<i class="' + link.split('||')[1] | trim | default('fas fa-globe') + '"></i>' %}
                  {%- endif %}
                  {{ next_url(sidebarURL, sidebarIcon + sidebarText, {title: name + ' &rarr; ' + sidebarURL}) }}
                </span>
              {%- endfor %}
            </div>
          {%- endif %}

          {%- if theme.creative_commons.license and theme.creative_commons.sidebar %}
             <div class="cc-license" itemprop="license">
              {%- set ccLanguage = theme.creative_commons.language %}
              {%- if theme.creative_commons.license === 'zero' %}
                {%- set ccType = 'publicdomain/zero/1.0/' + ccLanguage %}
              {%- else %}
                {%- set ccType = 'licenses/' + theme.creative_commons.license + '/4.0/' + ccLanguage %}
              {%- endif %}
              {%- set ccURL = 'https://creativecommons.org/' + ccType %}
              {%- set ccImage = '<img src="' + url_for('images/cc-' + theme.creative_commons.license + '.svg') + '" alt="Creative Commons"/>' %}
              {{ next_url(ccURL, ccImage, {class: 'cc-opacity'}) }}
             </div>
          {%- endif %}

          {{- next_inject('sidebar') }}

        </div>
      </div>

    </div>
  </aside>
