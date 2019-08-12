<div class="copyright">
  {%- set current = date(Date.now(), "YYYY") %}
  {%- if theme.footer.beian.enable %}
    {{ next_url('http://www.miitbeian.gov.cn', theme.footer.beian.icp + ' ') }}
  {%- endif %}
  &copy; {%- if theme.footer.since and theme.footer.since != current %}{{ theme.footer.since }} – {%- endif %}
  <span itemprop="copyrightYear">{{ current }}</span>
  <span class="with-love" id="animate">
    <i class="fa fa-{{ theme.footer.icon.name }}"></i>
  </span>
  <span class="author" itemprop="copyrightHolder">{{ theme.footer.copyright || author }}</span>
</div>

{%- if theme.footer.powered.enable %}
  <div class="powered-by">
    {{ __('footer.powered', next_url('https://hexo.io', 'Hexo', {class: 'theme-link'})) }}
    {%- if theme.footer.powered.version %} v{{ hexo_env('version') }}{%- endif %}
  </div>
{%- endif %}

{%- if theme.footer.powered.enable and theme.footer.theme.enable %}
  <span class="post-meta-divider">|</span>
{%- endif %}

{%- if theme.footer.theme.enable %}
  <div class="theme-info">{#
  #}{{ __('footer.theme') }} – {{ next_url('https://github.com/JiangTJ/hexo-theme-cake', 'Cake', {class: 'theme-link'}) }}{#
  #}{%- if theme.footer.theme.version %} v{{ version }}{%- endif %}{#
#}</div>
{%- endif %}

{%- for inject_item in theme.injects.footer %}
  {{ partial(inject_item.layout, inject_item.locals, inject_item.options) }}
{%- endfor %}
