# Accessible Share Tools

The following is intended to be read alongside the [GEL share tools page](http://www.bbc.co.uk/gel/guidelines/share-tools). In fact, you should probably read that one first. Here, we'll just cover the technical requirements to make the share tools component as accessible as possible.

## Semantics

### Initial HTML

The foundation of any performant and accessible component is semantic markup. Where semantic markup is provided, we can defer to standard browser behaviors. The share tools component is a button that reveals a menu, with behaviors that resemble that of a standard [menu button as set out in the WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/#menubutton).

In the demonstration to follow, JavaScript is used to enhance the following HTML and apply behaviors to it.

```html
<div class="share-tools">
  <button class="share-tools-button">Share</button>
  <div class="share-tools-menu">
    <ul class="share-tools-social">
      <li>
        <a href="#">
          <svg>[icon here]</svg>
          <span class="visually-hidden">Share on Twitter</span>
        </a>
      </li>
      <li>
        <a href="#">
          <svg>[icon here]</svg>
          <span class="visually-hidden">Share on Facebook</span>
        </a>
      </li>
      <li>
        <a href="#">
          <svg>[icon here]</svg>
          <span class="visually-hidden">Share on LinkedIn</span>
        </a>
      </li>
      <li>
        <a href="#">
          <svg>[icon here]</svg>
          <span class="visually-hidden">Share on Pinterest</span>
        </a>
      </li>
    </ul>
    <div class="share-tools-copy">
      <button class="share-copy-button">Copy this link</button>
      <span class="share-copy-feedback" aria-hidden="true"></span>
      <input readonly class="share-copy-input" value="http://bbc.in/3x4mp1e" />
    </div>
    <a href="#" class="share-tools-read-more">About sharing</a>
    <button class="share-tools-close">
      <svg viewBox="0 0 10 10" width="20" height="20">
        <path d="M1,1 9,9 M9,1 1,9" stroke="#969696" />
      </svg>
      <span class="visually-hidden">close</span>
    </button>
  </div>
</div>
```

Let's break down what we have here:

<table>
  <caption>Semantic elements</caption>
  <tr>
    <th scope="row">
      <code>.share-tools-button</code>
    </th>
    <td>
      <p>This is the main button for opening (and closing) the menu. It's important a button, and not a link, is used here because its purpose is only to open the menu. It does not navigate the user anywhere by itself.</p>
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>.share-tools-menu</code>
    </th>
    <td>
      <p>The menu container, which holds all the sharing options.</p>
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>.share-tools-social</code>
    </th>
    <td>
      <p>The social media sharing links are equivalent, so grouped together in a list. Screen reader users are told when they encounter lists and their items are enumerated.</p>
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>.visually-hidden</code>
    </th>
    <td>
      <p>A visually hidden (but screen reader perceivable) <code>&lt;span></code> is preferred to an <code>aria-label</code> because it is translatable by in-browser translation services.</p>
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>.share-copy-feedback</code>
    </th>
    <td>
      <p>This empty <code>&lt;span></code> will be populated with the text "Copied!" as feedback for when the link is copied from the input to the user's clipboard. More on that to follow.</p>
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>.share-copy-input</code>
    </th>
    <td>
      <p>The input element which the copy button acts on. Some implementations hide this, but leaving it visible gives the user the choice to copy the link from the input manually, which might be their inclination.</p>
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>.share-tools-close</code>
    </th>
    <td>
      <p>Unlike standard menu button components, this one has an explicit close button. This is last in focus order, and therefore last to receive focus.</p>
    </td>
  </tr>
</table>

### Enhanced HTML

The HTML is enhanced in a number of ways when the [script](assets/ShareTools.js) runs. Notably, the copy button and feedback `span` are associated to the input using `aria-labelledby` and `aria-describedby` respectively. The unique string is generated using `+new Date()`. All `id`s must be unique.

```html
<div class="share-tools-copy">
  <button class="share-copy-button" id="copy-button-76387465">Copy this link</button>
  <span class="share-copy-feedback"
        aria-hidden="true"
        id="copy-feedback-76387465">
  </span>
  <input readonly
         class="share-copy-input"
         value="http://bbc.in/3x4mp1e"
         aria-labelledby="copy-button-76387465"
         aria-describedby="copy-feedback-76387465"
  />
</div>
```

In addition, some semantics are provided:

1.  `class="share-tools-button"` → `role="menu"`
2.  `class="share-tools-menu"` → `aria-haspopup="true"`
3.  `class="share-tools-menu"` → `aria-expanded="false"`
4.  Social icons → ARIA list semantics

(1) identifies the element as a menu in assistive technologies. It is usually used in conjunction with `role="menuitem"` children, but the content inside a GEL share tools component is too diverse for this to be viable. In some screen readers, the term "menu" will still be announced when a user enters the menu.

(2) is an ARIA property that identifies the button as having a popup menu secreted behind it. For example, in Voiceover for OSX, it means the button will be identified as a "popup button".

(3) The user is kept abreast of the menu's state (expanded or collapsed) using `aria-expanded`. The initial value is `false`.

(4) In testing it was revealed that removing the bullet styling for list items suppressed the list semantics in some screen reader / browser combinations. So `list` and `listitem` ARIA is applied remedially by [the script](assets/ShareTools.js).

## Interaction

### General behavior

When a mouse or touch user clicks the "Share" menu button, the share tools menu is revealed. When the button is pressed again or the "⨉" close button is clicked, the menu closes. The social media sharing buttons link off to their respective sites. Clicking the "Copy this link" button selects the text inside the input and copies it to the clipboard. The term "Copied!" is revealed as confirmation.

### Keyboard behavior

Many of the keyboard behaviors of the share tools component should match those of a [standard menu button / menu](https://www.w3.org/TR/wai-aria-practices-1.1/#keyboard-interaction-12).

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

The semantics and their affect of screen reader output are covered in the **Enhanced HTML** section above. When focus is moved between the menu button and the menu, the focus elements are identified by their roles, labels, and accompanying information.

### The link copying functionality

The behavior peculiar to sharing tools, and worth discussing in more depth, is that of copying links via the input element. When a screen reader user click the "Copy this link" button, the text (value) of the input is selected, moving the users focus to the input. This elicits announcement of the input's role and its label, which is taken from the button using `aria-labelledby`. Appended to this information is the announcement of "Copied!" which is provided as the input's description.

Note that "Copied!" is only announced when the button is clicked, and not when the user traverses to the input and selects its text manually. In this scenario, it would be up to the user to select and copy the text. There is therefore no place for 'feedback' regarding the work of JavaScript on the user's behalf.

## Visual design requirements

The visual design requirements for share tools are laid out in the [GEL share tools page](http://www.bbc.co.uk/gel/guidelines/share-tools). Note that the [working demonstration](assets/demo1.html) provides parameters for choosing a vertical and horizontal alignment for the menu itself (see below).

## Demonstration

A [working demonstration](assets/demo1.html) of the discussed implementation is available for you to explore. This centers around a [small script](assets/ShareTools.js).

Note the initialization which accepts three arguments:

1.  The parent node you wish to transform into a share tools component
2.  The horizontal alignment of the menu (string: `'left'` (default) or `'right'`)
3.  The vertical alignment of the menu (string: `'below'` (default) or `'above'`)

### Example initialization

```js
var toolsElem = document.querySelector('.share-tools');
var tools = new ShareTools(toolsElem, 'right', 'below');
```

## Variants and caveats

- Social media icons are not provided in the demo, with placeholder icons in their place. Consult [GEL's iconography docs](https://www.bbc.co.uk/gel/guidelines/iconography).
- Standard menu buttons are discussed at length in [Menus & Menu Buttons](https://inclusive-components.design/menus-menu-buttons/).
- The pointer shapes for the bubbles are considered a progressive enhancement and are created using `clip-path` in supporting browsers. You can achieve a similar effect with borders or a background image but be aware that these techniques might fail in Windows High Contrast Mode.
- It is possible to close the menu when a user clicks outside it, but this is not included in the script because it requires a `click` handler on the `document`. It can be implemented like so, if desired:

```js
document.addEventListener('click', function(e) {
  if (!menu.contains(e.target) && !button.contains(e.target)) {
    close();
  }
});
```
