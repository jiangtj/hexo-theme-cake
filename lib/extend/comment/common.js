'use strict';

function capitalize(input) {
  return input.toString().charAt(0).toUpperCase() + input.toString().substr(1);
}

module.exports = {
  iconText(icon, key, defaultValue) {
    if (!defaultValue) {
      defaultValue = capitalize(key);
    }
    return `
      <%
      let post_meta_comment = __('post.comments.${key}')
      if (post_meta_comment == 'post.comments.${key}') {
        post_meta_comment = '${defaultValue}'
      }
      %>
      <span class="post-meta-item-icon">${icon}</span>
      <span class="post-meta-item-text"><%= post_meta_comment + __('symbol.colon') %></span>
    `;
  }
};
