<div class="site-brand-wrapper">
  <div class="site-meta{%- if theme.custom_logo.enable %} custom-logo{%- endif %}">
    <div class="custom-logo-site-title">
      <a href="{{ config.root }}" class="brand" rel="start">
        <span class="logo-line-before"><i></i></span>
        <span class="site-title">{{ title }}</span>
        <span class="logo-line-after"><i></i></span>
      </a>
    </div>
    {%- if subtitle %}
      {%- if theme.seo %}
        <h1 class="site-subtitle" itemprop="description">{{ subtitle }}</h1>
      {%- else %}
        <p class="site-subtitle">{{ subtitle }}</p>
      {%- endif %}
    {%- endif %}
    <a><img class="custom-logo-image" src="{{ theme.custom_logo.image }}" alt="{{ title }}"/></a>
  </div>

  <div class="site-nav-toggle">
    <button>
      <span class="btn-bar"></span>
      <span class="btn-bar"></span>
      <span class="btn-bar"></span>
    </button>
  </div>
</div>
