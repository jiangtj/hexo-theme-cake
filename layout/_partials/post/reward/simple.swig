<div class="reward-box-card">
  <img class="reward-image" src="{{ url_for(reward_item.image) }}" />
  {%- if reward_item.url %}
    <a class="reward-image-url" href="{{ reward_item.url }}">{{ reward_item.url_name || reward_item.url }}</a>
  {%- endif %}
</div>