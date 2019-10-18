<!DOCTYPE html>
<html lang="{{ config.language }}">
<head>
  {{ partial('_partials/head/head.swig', {}, {cache: true}) }}
  {{ partial('_partials/head/head-unique.swig') }}
  {{ partial('_partials/head/title.swig') }}
  {{- next_inject('head') }}
</head>

<body itemscope itemtype="http://schema.org/WebPage" lang="{{ page.lang || page.language || config.language }}">

  <header class="main-header" itemscope itemtype="http://schema.org/WPHeader">
    <div class="header-inner">{{ partial( '_partials/header/index.swig') }}</div>
    {{- next_inject('header') }}
  </header>

  <div class="flex-container">

    {{ partial('_partials/sidebar.swig') }}

    <div class="flex-main">

      <main>
        {%- if not is_home() %}
          <div class="sub-menu-wrap">
            {{ partial( '_partials/post/post-menu.swig') }}
          </div>
        {%- endif %}
        <div id="content" class="content">
          {{- body }}
        </div>
        {{ partial( '_partials/comments.swig') }}
      </main>

      <footer class="footer">
        <div class="footer-inner">
          {{ partial('_partials/footer.swig', {}, {cache: true}) }}
        </div>
      </footer>

    </div>

  </div>

  {{- next_js('utils.js', 'next-boot.js') }}
  {{- next_inject('bodyEnd') }}

</body>
</html>
