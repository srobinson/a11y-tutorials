# Accessible Accordion

The following is intended to be read alongside the [GEL Accordion page](https://www.bbc.co.uk/gel/guidelines/accordion). In fact, you should probably read that one first. Here, we'll just cover the technical requirements to make tab interfaces as accessible as possible.

The implementation to come is:

* Written with plain CSS and ES5 Javascript (_no build process assumed_)
* Lacking any dependencies (_for maximum portability and minimum payload_)
* Based on progressive enhancement (_the HTML is fine without the Javascript or the CSS_)
* Is editor friendly (_can be easily dropped into HTML and/or markdown files_)

## Semantics

### Initial HTML

There are a couple of different ways you can mark up the basic content to be enhanced into an accordion interface. One way is to write a succession of sections, introduced by headings each of an equal level.

```html
<div class="accordion">
  <section>
    <h2>Section 1</h2>
    <p>Lorem ipsum dolor sit amet...</p>
  </section>
  <section>
    <h2>Section 2</h2>
    <p>Pellentesque facilisis...</p>
  </section>
  <section>
    <h2>Section 3</h2>
    <p>Nam condimentum lobortis...</p>
  </section>
  <section>
    <h2>Section 4</h2>
    <p>Suspendisse pharetra nec...</p>
  </section>
</div>
```

Both the heading elements and `<section>`s provide structure and navigation cues in screen reader software. For example, the <kbd>R</kbd> key in JAWS lets one move between regions (`<section>` elements implicitly have region roles).

Alternatively, and depending on the context, you might consider a list a better choice:

```html
<ul class="accordion">
  <li>
    <h2>Section 1</h2>
    <p>Lorem ipsum dolor sit amet...</p>
  </li>
  <li>
    <h2>Section 2</h2>
    <p>Pellentesque facilisis...</p>
  </li>
  <li>
    <h2>Section 3</h2>
    <p>Nam condimentum lobortis...</p>
  </li>
  <li>
    <h2>Section 4</h2>
    <p>Suspendisse pharetra nec...</p>
  </li>
</ul>
```

Lists also provide navigation shortcuts in screen reader software. For example, NVDA provides <kbd>L</kbd> for switching between lists and <kbd>I</kbd> for switching between list items. The added advantage of a list is that, upon being first identified, it will enumerate the items available. This gives assistive software users an idea of how much content is present before they embark on traversing it.

The accordion constructor of the [demonstration](#demonstation) to follow gives the option — as the second argument — of forcing list semantics with ARIA. This allows you to use simple `<section>`s or just `<div>`s at the outset and before enhancement.

### Enhanced HTML

Assuming `<section>` are used in the initial HTML, and list semantics are requested, this is what the augmented HTML would look like after initialization:

```html
<div class="accordion accordion-interface" role="list">
  <section role="listitem">
    <div class="accordion-interface-header">
      <h2>Section 1</h2>
      <button aria-expanded="false">
        <svg height="20" viewbox="0 0 20 20" width="20"><polyline points="4 4, 10 16, 16 4"></polyline></svg>
        <span class="visually-hidden">Open Section 1</span>
      </button>
    </div>
    <div class="accordion-interface-drawer" hidden>
      <p>Lorem ipsum dolor sit amet...</p>
    </div>
  </section>
  <section role="listitem">
    <div class="accordion-interface-header">
      <h2 id="section2">Section 2</h2>
      <button aria-expanded="false">
        <svg height="20" viewbox="0 0 20 20" width="20"><polyline points="4 4, 10 16, 16 4"></polyline></svg>
        <span class="visually-hidden">Open Section 2</span>
      </button>
    </div>
    <div class="accordion-interface-drawer" hidden>
      <p>Pellentesque facilisis...</p>
    </div>
  </section>
  <section role="listitem">
    <div class="accordion-interface-header">
      <h2>Section 3</h2>
      <button aria-expanded="false">
        <svg height="20" viewbox="0 0 20 20" width="20"><polyline points="4 4, 10 16, 16 4"></polyline></svg>
        <span class="visually-hidden">Open Section 3</span>
      </button>
    </div>
    <div class="accordion-interface-drawer" hidden>
      <p>Nam condimentum lobortis est eu maximus...</p>
    </div>
  </section>
  <section role="listitem">
    <div class="accordion-interface-header">
      <h2>Section 4</h2>
      <button aria-expanded="false">
        <svg height="20" viewbox="0 0 20 20" width="20"><polyline points="4 4, 10 16, 16 4"></polyline></svg>
        <span class="visually-hidden">Open Section 4</span>
      </button>
    </div>
    <div class="accordion-interface-drawer" hidden>
      <p>Suspendisse pharetra nec neque...</p>
    </div>
  </section>
</div>
```

Let's unpack that new structure, piece by piece.

<table>
  <caption>Restructured HTML</caption>
  <tr>
    <th scope="row">
      <code>role="list"</code>
    </th>
    <td>
      The parent element take <code>role="list"</code>, making it a <code>&lt;ul></code> in the accessibility tree.
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>role="listitem"</code>
    </th>
    <td>
      Accordingly, each accordion item must have <code>role="listitem"</code>. Note that this will override the region role of <code>&lt;section></code> here.
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>accordion-interface-header</code> and <code>accordion-interface-drawer</code>
    </th>
    <td>
      Each item is divided into two: a header and body ('drawer'). At the outset, the drawer is hidden using the <code>hidden</code> property. To support older user agents ensure you include <code>[hidden] { display: none }</code> in your CSS. This property behaves like <code>display: none</code> by hiding the subject DOM tree from assistive technologies and remove its contents from tab order. Keyboard users are therefore able to jump directly between header buttons.
    </td>
  </tr>
  <tr>
    <th scope="row">
      The button
    </th>
    <td>
      A button is supplied for toggling the display of the drawer, with the following faetures:
      <ul>
        <li><code>aria-expanded</code>: This ARIA attribute communicates whether the subject drawer is in an expanded (<code>true</code>) or collapsed (<code>false</code>) state</li>
        <li><strong>Visually hidden text:</strong> Because the state is being toggled, the label must persist. Screen reader users will hear something similar to _"open [section name], toggle button, expanded"_ and _"open [section name], toggle button, collapsed"_. A visually hidden <code>&lt;span></code> is prefered over an <code>aria-label</code> because <a href="http://www.heydonworks.com/article/aria-label-is-a-xenophobe"><code>aria-label</code> is not translated</a>. The <code>visually-hidden</code> (but available to assistive technologies) class is available in the <a href="assets/demo1.html">demo</a>.</li>
        <li><strong>The SVG:</strong> A small inline SVG is provided for performance. It uses <code>currentColor</code> to ensure it respects schemes chosen in  Windows High Contrast Mode.</li>
      </ul>
    </td>
  </tr>
</table>

## Interaction

### General behavior

The enhancement in experience offered by an accordion is that the user is afforded an overview of the sections available to read. An accordion is its own table of contents. Accordions also reduce the amount of scrolling required, and make it less easy to get 'lost' among longform content.

The toggle function at the heart of the [demonstration script](assets/Accordion.js) is quite simple:

```js
function toggle(button, drawer) {
  var expanded = button.getAttribute('aria-expanded') === 'true' || false;
  button.setAttribute('aria-expanded', !expanded);
  drawer.hidden = !drawer.hidden;
}
```

When a user clicks or taps anywhere on a header, the item's 'drawer' is opened to show the drawer content. The SVG arrow upends to indicate that the next action will close the drawer.

### Keyboard behavior

Accordions have an added advantage for keyboard users. By removing the contents of closed accordion items from focus order, it's faster and easier to switch between the different sections, bringing only requested content into focus order.

Keyboard users operate the provided toggle `<button>` directly by focusing and activating it with either the <kbd>Space</kbd> or <kbd>Enter</kbd> keys. Note that the only reason mouse and touch users can click _anywhere_ on the bar is because the action is delegated to the button:

```js
// Add listener to header
header.addEventListener('click', function(e) {
  if (e.target !== button) {
    button.click();
  }
});
```

### Screen reader behavior

As covered, where list semantics are present, the list is identified and its items enumerated. For example, if I navigate to the accordion list in VoiceOver for OSX using <kbd>Ctrl</kbd> + <kbd>Option</kbd> + <code>→</code>, I will hear _"list, four items"_.

If, instead, I am navigating by <kbd>Tab</kbd> and I focus the first `<button>`, I will hear _"open section 1, collapsed button, list, four items"_. When I activate the button, VoiceOver immediately feeds back by saying _"Open Section 1, expanded button"_. The opened content is easy to find because it is next in source order.

## Visual design requirements

The visual design of the demo follows [advice provided in the GEL Accordion page](https://www.bbc.co.uk/gel/guidelines/accordion).

In addition, the recommended hover style is also mapped to `:focus-within`. That is, where `:focus-within` is supported, the whole header appears focused rather than just the focused button. Note that the focus style for the button is only removed _if_ `:focus-within` is supported. This means older user agents still get a basic focus style.

```css
.accordion-interface-header:hover,
.accordion-interface-header:focus-within {
  background-color: #c8c8c8;
}

.accordion-interface-header:focus-within button:focus {
  outline: none;
}
```

## Demonstration

A [working demonstration](assets/demo1.html) of the discussed implementation is available for you to explore.

Note the initialization which accepts two arguments:

* The node you wish to transform into an accordion interface (*DOM node*)
* Whether to enforce list semantics, which is not necessary if a list is used for the initial HTML (*Boolean*, default: `false`)

### Initialization

```js
// Initialize
var accordionElem = document.querySelector('.accordion');
var accordion = new Accordion(accordionElem);
```

To enforce list semantics, just add `true` as the second argument to the constructor:

```js
var accordion = new Accordion(accordionElem, true);
```

## Variants and caveats

One variant would be to make the toggle button the child of the heading, like so:

```html
<h2>
  <button aria-expanded="false">Section 1</button>
</h2>
```

Arguably this provides a better experience to screen reader users because they can effectively navigate to the button _as_ they navigate to the heading and vice versa. That is, they would hear something similar to _"Heading level 2, Section 1, button, collapsed"_. However, at least in some screen readers, navigating to the heading does not focus the button therein. A second navigation step is still necessary and label inherited by the button omits the explicit "Open..." prefix, so may be unclear on account of repetition.

If this structure is adopted, one would have to carefully reset the button styles so that they inherited each from the parent heading. The `all: inherit` declaration is the least verbose solution, but it is not supported in Internet Explorer.

```css
h2 button {
  all: inherit
}
```
