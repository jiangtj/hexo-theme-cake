<div class="site-brand-wrapper">
  <div class="site-meta">
    <div class="custom-logo-site-title">
      <a href="{{ config.root }}" class="brand" rel="start">
        <span class="logo-line-before"><i></i></span>
        <span class="site-title">{{ title }}</span>
        <span class="logo-line-after"><i></i></span>
      </a>
    </div>
    {%- if subtitle %}
      <p class="site-subtitle">{{ subtitle }}</p>
    {%- endif %}
    {%- if theme.custom_logo %}
    <a><img class="custom-logo-image" src="{{ theme.custom_logo }}" alt="{{ title }}"/></a>
    {%- endif %}
  </div>

  <div class="site-nav-toggle">
    <button>
      <span class="btn-bar"></span>
      <span class="btn-bar"></span>
      <span class="btn-bar"></span>
    </button>
  </div>
</div>
