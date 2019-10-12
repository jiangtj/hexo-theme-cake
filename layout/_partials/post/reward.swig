<div class="reward-container">
  <div>{{ page.reward_settings.comment }}</div>
  <div class="reward-box"></div>
  <div class="reward-group">
    {%- for reward_name,reward_item in theme.reward %}
      <a class="reward-button {{reward_name}}">
        <span>{%- if reward_item.icon %}<i class="{{reward_item.icon}}" aria-hidden="true"></i>{%- else %}{{reward_item.name}}{%- endif %}</span>
      </a>
    {%- endfor %}
  </div>
</div>

<script defer>
  let rewardBox = document.querySelector(".reward-box");
  let rewardBtn = null;
  {%- for inject_item in theme.injects.reward %}
  rewardBtn = document.querySelector(".reward-button.{{inject_item.locals.reward_name}}");
  if (rewardBtn) {
    rewardBtn.addEventListener("mouseover", () => {
      rewardBox.innerHTML = `{{ partial(inject_item.layout, inject_item.locals, inject_item.options) }}`;
      rewardBox.classList.add('active');
    });
  }
  {%- endfor %}
  document.querySelector(".reward-container").addEventListener("mouseleave", () => {
    rewardBox.classList.remove('active');
  });
</script>
