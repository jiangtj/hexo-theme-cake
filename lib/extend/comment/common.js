'use strict';

function capitalize(input) {
  return input.toString().charAt(0).toUpperCase() + input.toString().substr(1);
}

module.exports = {
  iconText(__, icon, key, defaultValue) {
    let post_meta_comment = __(`post.comments.${key}`);
    if (post_meta_comment === `post.comments.${key}`) {
      if (!defaultValue) {
        defaultValue = capitalize(key);
      }
      post_meta_comment = defaultValue;
    }
    post_meta_comment = post_meta_comment + __('symbol.colon');
    return [
      `<span class="post-meta-item-icon">${icon}</span>`,
      `<span class="post-meta-item-text">${post_meta_comment}</span>`
    ].join('');
  }
};
