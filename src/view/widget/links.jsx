/**
 * External links widget JSX component.
 * @module view/widget/links
 */
const { URL } = require('url');
const { Component } = require('inferno');
const { cacheComponent } = require('../../util/cache');

/**
 * External links widget JSX component.
 *
 * @example
 * <Links
 *     title="Widget title"
 *     links={{
 *         'Link Name 1': '/path/to/external/site',
 *         'Link Name 2': {
 *              'link': '/path/to/external/site',
 *              'hide_hostname': true,
 *        }
 *     }} />
 */
class Links extends Component {
  render() {
    const { title, links } = this.props;
    return (
      <div class="card widget" data-type="links">
        <div class="card-content">
          <div class="menu">
            <h3 class="menu-label">{title}</h3>
            <ul class="menu-list">
              {Object.keys(links).map((i) => {
                let hostname = links[i];
                if (typeof hostname === 'object') hostname = !hostname.hide_hostname;
                else
                  try {
                    hostname = new URL(hostname).hostname;
                  } catch (e) {}
                hostname = 'click to visit';
                return (
                  <li>
                    <a class="level is-mobile" href={links[i]} target="_blank" rel="noopener">
                      <span class="level-left">
                        <span class="level-item">{i}</span>
                      </span>
                      {hostname ? (
                        <span class="level-right">
                          <span class="level-item tag">{hostname}</span>
                        </span>
                      ) : null}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Cacheable external links widget JSX component.
 * <p>
 * This class is supposed to be used in combination with the <code>locals</code> hexo filter
 * ({@link module:hexo/filter/locals}).
 *
 * @see module:util/cache.cacheComponent
 * @example
 * <Links.Cacheable
 *     links={{
 *         'Link Name 1': '/path/to/external/site',
 *         'Link Name 2': '/path/to/external/site'
 *     }}
 *     helper={{ __: function() {...} }} />
 */
Links.Cacheable = cacheComponent(Links, 'widget.links', (props) => {
  const { helper, widget } = props;
  if (!Object.keys(widget.links).length) {
    return null;
  }
  return {
    title: helper.__('widget.links'),
    links: widget.links,
  };
});

module.exports = Links;
