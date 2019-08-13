        <div class="post-meta">

          {%- set date_diff = date(post.date) != date(post.updated) %}
          {%- set time_diff = time(post.date) != time(post.updated) %}
          {%- set datetime_diff = date_diff or time_diff %}

          {%- if (is_home() or is_post()) and theme.post_meta.created_at %}
            <span class="post-meta-item">
              <span class="post-meta-item-icon">
                <i class="fa fa-calendar-o"></i>
              </span>
              <span class="post-meta-item-text">{{ __('post.posted') }}</span>

              {%- if !date_diff && time_diff && theme.post_meta.updated_at.enable && theme.post_meta.updated_at.another_day %}
                {%- set create_title = __('post.created') + __('symbol.colon') + full_date(post.date) + ' / ' + __('post.modified') + __('symbol.colon') + time(post.updated) %}
              {%- else %}
                {%- set create_title = __('post.created') + __('symbol.colon') + full_date(post.date) %}
              {%- endif %}

              <time title="{{ create_title }}" itemprop="dateCreated datePublished" datetime="{{ moment(post.date).format() }}">{#
              #}{{ date(post.date) -}}
              </time>
            </span>
          {%- endif %}

            {%- if (is_home() or is_post()) and theme.post_meta.updated_at.enable and datetime_diff %}
              {%- set display_updated = !theme.post_meta.updated_at.another_day || theme.post_meta.updated_at.another_day && date_diff %}

              {%- if display_updated or !theme.post_meta.created_at %}
              <span class="post-meta-item">
                <span class="post-meta-item-icon">
                  <i class="fa fa-calendar-check-o"></i>
                </span>
                <span class="post-meta-item-text">{{ __('post.edited') }}</span>
                <time title="{{ __('post.modified') + __('symbol.colon') + full_date(post.updated) }}" itemprop="dateModified" datetime="{{ moment(post.updated).format() }}">{#
                #}{{ date(post.updated) -}}
                </time>
              </span>
              {%- endif %}
            {%- endif %}
          </span>

          {%- if (is_home() or is_post()) and post.categories and post.categories.length and theme.post_meta.categories %}
            <span class="post-meta-item">
              <span class="post-meta-item-icon">
                <i class="fa fa-folder-o"></i>
              </span>
              <span class="post-meta-item-text">{{ __('post.in') }}</span>
              {%- for cat in post.categories %}
                <span itemprop="about" itemscope itemtype="http://schema.org/Thing">{#
                #}<a href="{{ url_for(cat.path) }}" itemprop="url" rel="index">{#
                  #}<span itemprop="name">{{ cat.name }}</span>{#
                #}</a>{#
              #}</span>

                {%- set cat_length = post.categories.length %}
                {%- if cat_length > 1 and loop.index !== cat_length %}
                  {{ __('symbol.comma') }}
                {%- endif %}
              {%- endfor %}
            </span>
          {%- endif %}

          {%- for inject_item in theme.injects.postMeta %}
            {{ partial(inject_item.layout, inject_item.locals, inject_item.options) }}
          {%- endfor %}

          {%- if post.description %}
            <div class="post-description">{#
              #}{{ post.description }}{#
            #}</div>
          {%- endif %}

        </div>