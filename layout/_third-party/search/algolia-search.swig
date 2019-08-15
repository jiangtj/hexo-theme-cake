
  <div class="algolia-popup popup search-popup">
    <div class="algolia-search">
      <div class="algolia-search-input-icon">
        <i class="fa fa-search"></i>
      </div>
      <div class="algolia-search-input" id="algolia-search-input"></div>
    </div>

    <div class="algolia-results">
      <div id="algolia-stats"></div>
      <div id="algolia-hits"></div>
      <div id="algolia-pagination" class="algolia-pagination"></div>
    </div>

    <span class="popup-btn-close">
      <i class="fa fa-times-circle"></i>
    </span>
  </div>

  {# S: Include Algolia instantsearch.js library #}
  {%- set algolia_instant_css = url_for(theme.vendors._internal + '/algolia-instant-search/instantsearch.min.css') %}
  {%- if theme.vendors.algolia_instant_css %}
    {%- set algolia_instant_css = theme.vendors.algolia_instant_css %}
  {%- endif %}
  <link rel="stylesheet" href="{{ algolia_instant_css }}"/>

  {%- set algolia_instant_js = url_for(theme.vendors._internal + '/algolia-instant-search/instantsearch.min.js') %}
  {%- if theme.vendors.algolia_instant_js %}
    {%- set algolia_instant_js = theme.vendors.algolia_instant_js %}
  {%- endif %}
  <script src="{{ algolia_instant_js }}"></script>
  {# E: Include Algolia instantsearch.js library #}

  {{- next_js('algolia-search.js') }}

