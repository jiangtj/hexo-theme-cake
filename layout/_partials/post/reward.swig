<div class="reward-container" onmouseleave="rewardFunc.out()">
  <div>{{ theme.reward_settings.comment }}</div>
  {# <div onmouseout="rewardFunc.out()"> #}
  {% for inject_name,inject_args in theme.injects.reward %}
    <div class="reward-box {{inject_name.split('.')[0]}}">
      {{ partial(inject_args.layout, inject_args.locals, inject_args.options) }}
    </div>
  {% endfor %}
  {# </div> #}
  {# {% for reward_name,reward_item in theme.reward %}
    <div class="reward-box {{reward_name}}">
      {{ partial( '_partials/post/reward/simple.swig', {
        reward_name: reward_name,
        reward_item: reward_item
      }, {cache: true}) }}
    </div>
  {% endfor %} #}
  <div class="reward-group">
    {% for reward_name,reward_item in theme.reward %}
      <a class="reward-button {{reward_name}}" onmouseover="rewardFunc.over('{{reward_name}}')">
        <span>{% if reward_item.icon %}<i class="fa fa-{{reward_item.icon}}" aria-hidden="true"></i>{% else %}{{reward_item.name}}{% endif %}</span>
      </a>
    {% endfor %}
  </div>
</div>

<script defer>
  var rewardFunc = {
    over: function (name) {
      this.out();
      document.querySelector(".reward-box." + name).style.display = "block";
    },
    out: function () {
      document.querySelectorAll(".reward-box").forEach(item => item.style.display = "none");
    }
  }
</script>
