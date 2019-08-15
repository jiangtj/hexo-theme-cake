{%- extends '_layout.swig' %}

  {%- block title %}{#
  #}{%- set page_title_suffix = ' | ' + title %}{#

  #}{%- if page.type === 'categories' and not page.title %}{#
    #}{{ __('title.category') + page_title_suffix }}{#
  #}{%- elif page.type === 'tags' and not page.title %}{#
    #}{{ __('title.tag') + page_title_suffix }}{#
  #}{%- else %}{#
    #}{{ page.title + page_title_suffix }}{#
  #}{%- endif %}{#
#}{%- endblock %}

{%- block page_class %}page-post-detail{%- endblock %}

{%- block content %}


  {%- if page.type === 'tags' %}
  <div id="posts" class="posts-expand">
    <div class="post-block page">
      {{ partial( '_partials/page/page-header.swig') }}
      <div class="post-body{%- if page.direction && page.direction.toLowerCase() === 'rtl' %} rtl{%- endif %}">
        {# tagcloud page support #}
          <div class="tag-cloud">
            <div class="tag-cloud-title">
              {{ _p('counter.tag_cloud', site.valid_tags.length) }}
            </div>
            <div class="tag-cloud-tags">
              {%- if not theme.tagcloud %}
                {{ tagcloud({min_font: 12, max_font: 30, amount: 200, color: true, start_color: '#ccc', end_color: '#111'}) }}
              {%- else %}
                {{ tagcloud({min_font: theme.tagcloud.min, max_font: theme.tagcloud.max, amount: theme.tagcloud.amount, color: true, start_color: theme.tagcloud.start, end_color: theme.tagcloud.end}) }}
              {%- endif %}
            </div>
          </div>
      </div>
    </div>
  </div>


  {%- elif page.type === 'categories' %}
  <div id="posts" class="posts-expand">
    <div class="post-block page">
      {{ partial( '_partials/page/page-header.swig') }}
      <div class="post-body{%- if page.direction && page.direction.toLowerCase() === 'rtl' %} rtl{%- endif %}">
          <div class="category-all-page">
            <div class="category-all-title">
              {{ _p('counter.categories', site.valid_categories.length) }}
            </div>
            <div class="category-all">
              {{ list_categories() }}
            </div>
          </div>
      </div>
    </div>
  </div>

  
  {%- else %}
    <div id="posts" class="posts-expand">
      {{ partial('_partials/post.swig', {post: page}) }}
    </div>
  {%- endif %}

{%- endblock %}

{%- block sidebar %}
  {{ partial('_partials/sidebar.swig') }}
{%- endblock %}

{%- block script_extra %}
  {{ partial( '_scripts/pages/post-details.swig', {}, {cache: true}) }}
{%- endblock %}
