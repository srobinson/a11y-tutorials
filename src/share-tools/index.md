# Accessible Share Tools

The following is intended to be read alongside the [GEL share tools page](http://www.bbc.co.uk/gel/guidelines/share-tools). In fact, you should probably read that one first. Here, we'll just cover the technical requirements to make the share tools component as accessible as possible.

## Semantics

### Initial HTML

The foundation of any performant and accessible component is semantic markup. Where semantic markup is provided, we can defer to standard browser behaviors.

In the demonstration to follow, JavaScript is used to enhance the following HTML and apply behaviors to it.

#### Exposed version

This version includes exposed share links, followed by a menu button to reveal extra sharing options.

```html
<div class="share-tools">
  <a href="#end-of-share-this-article" class="share-tools--skip">Skip share this article</a>
  <ul role="list">
    <li role="listitem">
      <a href="#" class="share-tools--item">
        <svg viewBox="0 0 15 15" focusable="false" aria-hidden="true">
          <polygon points="0,15 3,8 5,10 8,4 13,15" />
          <circle cx="12" cy="3" r="1.5" />
        </svg>
        <span class="visually-hidden">Facebook, share this article, external</span>
      </a>
    </li>
    <li role="listitem">
      <a href="#" class="share-tools--item">
        <svg viewBox="0 0 15 15" focusable="false" aria-hidden="true">
          <polygon points="0,15 3,8 5,10 8,4 13,15" />
          <circle cx="12" cy="3" r="1.5" />
        </svg>
        <span class="visually-hidden">Twitter, share this article, external</span>
      </a>
    </li>
    <!-- more share tools -->
    <li class="share-tools--more" role="listitem">
      <button class="share-tools--button" aria-haspopup="true" aria-expanded="false">
        <span class="visually-hidden">More</span>
        Share
        <span class="visually-hidden">options</span>
        &hellip;
      </button>
      <div class="share-tools--menu" role="menu">
        <ul class="share-tools--social" role="list">
          <li role="listitem">
            <a href="#">
              <svg viewBox="0 0 15 15" focusable="false" aria-hidden="true">
                <polygon points="0,15 3,8 5,10 8,4 13,15" />
                <circle cx="12" cy="3" r="1.5" />
              </svg>
              <span class="visually-hidden">LinkedIn, share this article, external</span>
            </a>
          </li>
          <li role="listitem">
            <a href="#">
              <svg viewBox="0 0 15 15" focusable="false" aria-hidden="true">
                <polygon points="0,15 3,8 5,10 8,4 13,15" />
                <circle cx="12" cy="3" r="1.5" />
              </svg>
              <span class="visually-hidden">Pinterest, share this article, external</span>
            </a>
          </li>
          <!-- more share options -->
        </ul>
        <div class="share-tools--copy">
          <label for="copy">Copy this link</label>
          <input id="copy" readonly class="share-tools--link" value="http://bbc.in/3x4mp1e" />
        </div>
        <a href="#" class="share-tools--read-more">About sharing</a>
        <button class="share-tools--close">
          <svg viewBox="0 0 10 10" width="20" height="20" focusable="false" aria-hidden="true">
            <path d="M1,1 9,9 M9,1 1,9" stroke="#969696" />
          </svg>
          <span class="visually-hidden">Close more share options</span>
        </button>
      </div>
    </li>
  </ul>
  <div id="end-of-share-this-article" tabindex="-1" class="share-tools--end">End of share this article.</div>
</div>
```

Note that the format for the share options visually hidden text such as, "Facebook, share this article, external", is to aid quick navigation for screen reader users e.g. the platform name is given first. The commas create a pause when the screen reader reads this, and external is added to inform users that this is an external link.

Let's break down what else we have here:

<table>
  <caption>Semantic elements</caption>
  <tr>
    <th scope="row">
      <code>.share-tools--skip</code> and <code>.share-tools--end</code>
    </th>
    <td>
      <p>Although per-component skip links are unconventional, keyboard users can benefit from the ability to skip past the many tab stops of share tools when encountered in the body of an article. The <code>.share-tools--end</code> target is invisible to sighted keyboard users but offers assurance to screen reader users with its "End of share this article." text.</p>
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>.visually-hidden</code>
    </th>
    <td>
      <p>A visually hidden (but screen reader perceivable) <code>&lt;span></code> is preferred to an <code>aria-label</code> because it is translatable by in-browser translation services.</p>
      <p>In the case of the "Share" button, this technique is used to expand the accessible label to "More share options". In research, sighted users were not found to be confused that a button reading "Share" appears next to a set of extant sharing tools, so the shorter visual label suffices for these users.</p>
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>.share-tools--button</code>
    </th>
    <td>
      <p>This behaves as an [ARIA menu button](https://www.w3.org/TR/wai-aria-practices-1.1/#menubutton). It has <code>aria-haspopup="true"</code> to warn the user pressing it they will open (and move their focus to) a menu. <code>aria-expanded</code> indicates the open/closed state.</p>
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>.share-tools--link</code>
    </th>
    <td>
      <p>This input contains the sharing URL as its value. It is set to <code>readonly</code>. It remains focusable and keyboard users can select the URL.</p>
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>.share-tools--menu</code>
    </th>
    <td>
      <p>The menu that corresponds to <code>.share-tools--button</code>. It is not a conventional ARIA menu because it does not contain <code>aria-menuitem</code> children. Instead, its children are a list of links and a labeled input. It is important <code>aria-menuitem</code> is not used to override the semantics of these elements.</p>
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>.share-tools--close</code>
    </th>
    <td>
      <p>Unlike standard menu button components, this one has an explicit close button. This is last in source order, and therefore last to receive focus.</p>
    </td>
  </tr>
</table>

The share tools component is largely static. Only the menu button/menu is powered using JavaScript. As such, it is only exposed to the user when JavaScript is running. That is, its `display` style is switched from `none` to `inline-block`.

```js
elem.style.display = 'inline-block';
```

#### Non-exposed version

Where only the "Share" button is required, the container element should be a `<div>`. There is no need to provide the skip link functionality in this case, because the menu button only represents a single tab stop. The `share-tools--more` class is still needed for styling purposes.

```html
<div class="share-tools--more">
  <button class="share-tools--button" aria-haspopup="true" aria-expanded="false">
    Share 
    <span class="visually-hidden">this article</span>
    &hellip;
  </button>
  <div class="share-tools--menu" role="menu">
    <ul class="share-tools--social" role="list">
      <li role="listitem">
        <a href="#">
          <svg viewBox="0 0 15 15" focusable="false" aria-hidden="true">
            <polygon points="0,15 3,8 5,10 8,4 13,15" />
            <circle cx="12" cy="3" r="1.5" />
          </svg>
          <span class="visually-hidden">Facebook, share this article, external</span>
        </a>
      </li>
      <li role="listitem">
        <a href="#">
          <svg viewBox="0 0 15 15" focusable="false" aria-hidden="true">
            <polygon points="0,15 3,8 5,10 8,4 13,15" />
            <circle cx="12" cy="3" r="1.5" />
          </svg>
          <span class="visually-hidden">Twitter, share this article, external</span>
        </a>
      </li>
      <!-- more share options -->
    </ul>
    <div class="share-tools--copy">
      <label for="copy">Copy this link</label>
      <input id="copy" readonly class="share-tools--link" value="http://bbc.in/3x4mp1e" />
    </div>
    <a href="#" class="share-tools--read-more">About sharing</a>
    <button class="share-tools--close">
      <svg viewBox="0 0 10 10" width="20" height="20" focusable="false" aria-hidden="true">
        <path d="M1,1 9,9 M9,1 1,9" stroke="#969696" />
      </svg>
      <span class="visually-hidden">Close share this article</span>
    </button>
  </div>
</div>
```

Note that the clarified _"Share"_ button's accessible label is not needed when the menu button is not accompanied by preceding exposed share tools unless you wish to be explicit about what you are going to share, as in this case _"Share this article"_.

## Interaction

### General behavior

When a mouse or touch user clicks the "Share" menu button, the share tools menu is revealed. When the button is pressed again or the "⨉" close button is clicked, the menu closes. The social media sharing buttons link off to their respective sites.

Clicking on the <code>share-tools--link</code> input selects the value and copies it to the user's clipboard.

```js
input.select();
document.execCommand('copy');
```

By default, if you click outside the menu / menu button, the menu will be closed. This requires an event listener on `document` and is functionality that can be removed in the [demo](#demonstration) script's initialization options object as `closeOnBlur`:

```js
var toolsElem = document.querySelector('.share-tools--more');
var tools = new ShareMenu(toolsElem, {
  closeOnBlur: false
});
```

### Keyboard behavior

#### Skip functionality

As the user moves to the share tools component, their first tab stop is the "skip share this article" link, which is revealed on focus by resetting its `0` height value.

```css
.share-tools--skip:focus {
  height: auto;
}
```

Should the skip link not be invoked, each of the exposed share buttons receives focus in order.

Depending on context it maybe more appropriate to provide a heading rather than a skip link. For example a skip link may be appropriate if the share tools are within the body of an article, otherwise a heading may be more appropriate, the heading could be visually hidden if it’s not needed visually to help screen reader users navigate this content.

Note, even when the context is within the body of an article, it’s only recommended to use a skip link if there are 3 or more exposed icons, as the skip link itself will create an extra tab stop and only be worth it if there are a number of items to skip past. 

#### Share button

Many of the keyboard behaviors of the share tools "Share" button should match those of a [standard menu button / menu](https://www.w3.org/TR/wai-aria-practices-1.1/#keyboard-interaction-12).

<table>
  <caption>Keyboard behaviors</caption>
  <tr>
    <th scope="row">
      <kbd>Enter</kbd> or <kbd>Space</kbd> on the "Share" button (with menu closed)
    </th>
    <td>
      <p>Opens the menu and moves focus to the first interactive element inside the menu.</p>
    </td>
  </tr>
  <tr>
    <th scope="row">
      <kbd>↓</kbd> (down arrow) on the "Share" button (with menu closed)
    </th>
    <td>
      <p>Opens the menu and moves focus to the first interactive element inside the menu.</p>
    </td>
  </tr>
  <tr>
    <th scope="row">
      <kbd>Esc</kbd> (while focus is within the menu)
    </th>
    <td>
      <p>Closes the menu and moves focus back to the "Share" button.</p>
    </td>
  </tr>
</table>

### Screen reader behavior

The exposed share tools and "Share" button are members of an unordered list. When the user enters that list and focuses the first item, the list is identified and the number of items is enumerated. If JavaScript is not run, the list item in the expanded configuration remains hidden (with `display: none`) and is not counted in enumeration.

Screen readers tend to identify the "Share" menu button as a "popup button" and will communicate the state as _"expanded/collapsed"_ or _"opened/closed"_. When the button is activated, focus is moved to the first focusable item in the menu, which triggers its announcement, along with contextual link information and (in some screen readers) the ancestor menu role.

When <kbd>ESC</kbd> or the close button is pressed, the menu button is refocused, triggering the announcement of its role, label, and collapsed state.

When a screen reader user focuses the <code>share-tools--link</code> input, the content/value is automatically selected. Some screen readers will announce "selected" as affirmation. For users that are unaware the text is selected, manually pressing <kbd>CTRL</kbd> + <kbd>A</kbd> works just as well.

## Visual design requirements

The visual design requirements for share tools are laid out in the [GEL share tools page](http://www.bbc.co.uk/gel/guidelines/share-tools). Note that the [working demonstration](assets/demo1.html) provides parameters for choosing a vertical and horizontal alignment for the menu itself (see below).

In addition, it is recommended that an ellipsis (as in the [demonstration](assets/demo1.html)) or a downward point arrow is included as part of the "Share" menu button design. This assures users of the presence of a submenu, and that they will not be navigated away from the current context.

## Demonstration

A [working demonstration](assets/demo1.html) of the discussed implementation is available for you to explore. This includes a [small script](assets/ShareMenu.js) for providing the menu button functionality.

Note the initialization which accepts two arguments:

1.  The parent node you wish to transform into a share tools component
2.  The options object, with the following properties:
    - `hAlign` (string; `right` or `left` — default is `right`)
    - `vALign` (string; `below` or `above` — default is `below`)
    - `closeOnBlur` (Boolean; default is `true`)

### Example initialization

```js
var toolsElem = document.querySelector('.share-tools--more');
var tools = new ShareMenu(toolsElem, {
  hAlign: 'left',
  vAlign: 'above'
});
```

## Variants and caveats

- Social media icons are not provided in the demo, with placeholder icons in their place. Consult [GEL's iconography docs](https://www.bbc.co.uk/gel/guidelines/iconography)
- Standard menu buttons are discussed at length in [Menus & Menu Buttons](https://inclusive-components.design/menus-menu-buttons/).
- The pointer shapes for the bubbles are considered a progressive enhancement and are created using `clip-path` in supporting browsers. You can achieve a similar effect with borders or a background image but be aware that these techniques might fail in Windows High Contrast Mode.
