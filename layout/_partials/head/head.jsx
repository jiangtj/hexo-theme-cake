'use strict';

const { Component } = require('inferno');
const { Cache } = require('hexo-util');
const cache = new Cache();

module.exports = class extends Component {

  render() {
    const { injector, partial, open_graph, cake_title } = this.props;

    // return <head>
    //   <Fragment dangerouslySetInnerHTML={{__html: injector('head-begin').text()}}></Fragment>
    //   <Fragment dangerouslySetInnerHTML={{__html: partial('_partials/head/head.ejs', {}, { cache: true })}}></Fragment>
    //   <Fragment dangerouslySetInnerHTML={{__html: open_graph()}}></Fragment>
    //   <Fragment dangerouslySetInnerHTML={{__html: cake_title()}}></Fragment>
    //   <Fragment dangerouslySetInnerHTML={{__html: injector('head').text()}}></Fragment>
    //   <dev dangerouslySetInnerHTML={{__html: injector('head-end').text()}}></dev>
    // </head>;

    return <head dangerouslySetInnerHTML={{__html: [
      injector('head-begin').text(),
      partial('_partials/head/common.jsx', {}, { cache: true }),
      open_graph(),
      cake_title(),
      <meta charset="UTF-8" />,
      injector('head').text(),
      injector('head-end').text()
    ].join('')}}>
    </head>;


    // <meta charset="UTF-8" />
    //   <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    //   <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=2" />
    //   <% if (theme.head.theme_color) { %>
    //     <meta name="theme-color" content="<%= theme.head.theme_color %>" />
    //     <% } %>
    //     <% - css(theme.head.font) -%>
    //     <% - favicon() -%>
    // }
  }
};
