# Accessible Cards

The following is intended to be read alongside the [GEL Cards page](https://www.bbc.co.uk/gel/guidelines/cards). In fact, you should probably read that one first. Here, we'll just cover the technical requirements to make cards as accessible as possible.

## Semantics

### Initial HTML

The foundation of any performant and accessible component is semantic markup. Where semantic markup is provided, we can defer to standard browser behaviors.

In the following, which outlines the basic structure of a generic card, there are three sections.

```html
<div class="card-interface">
  <div class="card-interface-img">
    <img src="1.jpg" alt="">
  </div>
  <div class="card-interface-text">
    <h2 class="card-interface-title">
      <a href="[url]">Title Of Card</a>
    </h2>
    <p>Description of the card</p>
    <small>Attribution</small>
  </div>
  <ul class="card-interface-toolbar">
    <li><button>Love</button></li>
    <li><button>Add</button></li>
    <li><button>Share</button></li>
  </ul>
</div>
```

Let's break down what we have here:

<table>
  <caption>Semantic elements</caption>
  <tr>
    <th scope="row">
      <code>.card-interface</code>
    </th>
    <td>
      <p>This class is added by the <code>Card</code> constructor of the [demonstration](#demonstartion) if it does not exist. It identifies the container for the card. <strong>Important:</strong> Most cards appear as part of packs/decks and these packs must be marked up as lists. In which case, the <code>.card-interface</code> element would be an <code>&lt;li></code>.</p>
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>.card-interface-img</code>
    </th>
    <td>
      <p>This element houses the image, and can be removed if no image is required. In many implementations, the image for a card is (a) linked and, therefore, (b) takes <code>alt</code> text that labels the link and its action. This is avoided as it represents duplication and an increased number of <kbd>Tab</kbd> stops. The title/heading's link suffices as the main action (see <code>.card-interface-title</code>). The image is a decorative flourish and takes <code>alt=""</code> to suppress its identification is screen reader software. All the pertinent information should be in the visible text (see below).</p>
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>.card-interface-text</code>
    </th>
    <td>
      <p>This container houses all of the text content. It is the only child element <em>needed</em> in the composition of the card (the image and toolbar can be removed, where applicable, and without damaging the layout).</p>
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>.card-interface-title</code>
    </th>
    <td>
      <p>This should be a heading of the correct level in the document outline. Where cards belong to a list (which most will), each heading must be of the same level, regardless of how 'important' any one or more cards might be deemed. Place featured/important cards first, and don't break the heading structure.</p>
      <p><strong>Important:</strong> The link wrapping the heading text represents the only element that links to the primary URL/permalink. In some implementations, the entire card is wrapped in a link. This (a) results in a long and confusing label for the link and (b) makes targeting interactive elements <em>inside</em> the link prone to error. The JavaScript in the <a href="#demonstration">demonstration</a> makes the image container clickable by mouse, to increase the targetable area without duplication in assistive technologies, or adding of redundant <kbd>Tab</kbd> stops.</p>
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>.card-interface-toolbar</code>
    </th>
    <td>
      <p>This contains a list of actions, facilitated by <code>&lt;button></code> elements. Since the actions (<em>love, add, and/or share</em>) do not represent navigating to a new page or section, the <code>&lt;a></code> element would be inappropriate. The list semantics groups the actions/controls together as a set of equivalent choices — a tool set.</p>
    </td>
  </tr>
</table>

### Enhanced HTML

The card component should be usable in the absence of JavaScript. The only enhancement, therefore, is to add a default icon, which overlays the image as prescribed in the [GEL Cards page](https://www.bbc.co.uk/gel/guidelines/cards). This is for convenience. The [demonstration](#demonstration) renders the default icon of a play button. This can be overridden as the `icon` property of the options object. A falsey value will mean the rendering of an icon is skipped.

## Interaction

### General behavior

The user can click on the title/heading or the image (if present) and the link supplied to the title/heading will be activated. The following JavaScript is responsible for handling the image click event to activate the link.

```js
// Make the image box clickable
if (imgBox && titleLink) {
  imgBox.style.cursor = 'pointer';
  imgBox.addEventListener('click', function() {
    titleLink.click();
  });
}
```

### Keyboard behavior

The proxying of the click event as described under **General behavior** makes the principle heading/title link the first <kbd>Tab</kbd> stop, eliminating redundancy. From this point, any other controls in the `.card-interface-text` container will be focused, followed by any controls in `.card-interface-toolbar`. 

It is recommended the total number of <kbd>Tab</kbd> stops are few, since multiple tab stops make keyboard navigation across multiple cards arduous.

### Screen reader behavior

* The decorative image is suppressed and ignored in in screen reader output. 
* The user can navigate between cards in a list using list and list item shortcut keys
* The user can navigate between cards using the heading shortcut key (typically <kbd>h</kbd> or a number key representing the appropriate level)
* The toolbar buttons are identified as belonging to a list and can be switched between using the <kbd>Tab</kbd> key

Some implementations provide a separate call-to-action in the form of a "read more" or "expand" button. However, this results in undifferentiated link labels in the screen reader link list interfaces. Instead, the unique title/heading doubles as the main interactive control.

**Note:** The specific actions of the individual toolbar buttons are not known at the time of writing. However, if they toggle state, this should be reflected in assistive technologies. For example, it is likely the _love_ button is a simple toggle — click to love; click to unlove. The `aria-pressed` attribute is appropriate here.

```html
<!-- unloved -->
<button aria-pressed="false">Love</button>

<!-- loved -->
<button aria-pressed="true">Love</button>
```

Do not change the label along with the state, because this can cause confusion. It should remain "Love" here.

## Visual design requirements

### Image editorial

Images fit the available space of their container without losing their aspect ratio, thanks to `object-fit: cover` where supported. 

```css
.card-interface-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

This allows the author to adjust the height of the card's image without fear of squashing the image or otherwise breaking the layout. The height is set using the `imgHeight` property of the constructor's options object.

### Consistent height

When the cards are rendered side-by-side, they should share the same height. This can be achieved automatically by making the parent (container) element a FlexBox context.

```css
.cards {
  display: flex;
}
```

To distribute the card's contents vertically, the card is also made a FlexBox container, with `flex-direction: column`. The last element in the card is given `margin-top: auto` so that it is aligned with the bottom of the card's height. Other implementations try to achieve this with `position: absolute`, but this would mean knowing the height of the last element ahead of time and compensating for it with padding.

[See the demo for multiple cards in a FlexBox list.](assets/demo1.html#cards-as-a-list)

### Card width

The card width is determined by the author, in the CSS. In the [demo](assets/demo1.html#cards-as-a-list) it is set at `300px`. For a responsive solution, it may be optimal to set the width on the container using CSS grid, where supported. 

In the following example, cards are between `300px` and `1fr` in width, depending on the available space. The upshot here is that no 'gaps' become visible as the cards wrap. Because we are using `object-fit: cover` for the image, the variable width does not break the image layout.

```css
@supports (display: grid) {
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-column-gap: 1.5rem;
    grid-row-gap:1.5rem;
  }
}
```

**Note:** It is suggested that fallback CSS is used for where CSS grid is not supported. In the [demo](assets/demo1.html#cards-as-a-list) a fixed width, floats, and margins are used, then undone where CSS Grid is supported.

```css
/* group styles */
.card-interface-group .card-interface {
  width: 300px;
  float: left;
  margin-right: 1.5rem;
}

@supports (display: grid) {
  .card-interface-group {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-column-gap: 1.5rem;
    grid-row-gap:1.5rem;
  }

  .card-interface-group .card-interface {
    width: auto;
    float: none;
    margin-right: 0;
  }
}
```

### The icon

The default icon is a small inline SVG, using `currentColor` to ensure that Windows High Contrast mode is respected and the fill changes color in line with the surrounding text. The `focusable="false"` attribution is also included, because Internet Explorer and early versions of Edge make SVGs focusable by default.

```html
<svg fill="currentColor" viewBox="0 0 20 20" width="20" height="20" focusable="false">
  <polyline points="2 2, 18 10, 2 18"></polyline>
</svg>
```

## Demonstration

A [working demonstration](assets/demo1.html) of the discussed implementation is available for you to explore.

Note the initialization which accepts two arguments:

1. The node you wish to transform into a card
2. An options object
    * `imgHeight`: the height of the image area of the card in pixels (integer; default is `200`)
    * `icon`: the code for the icon, recommended as inline SVG (string, default is a small SVG using `currentColor` to support Windows High Contrast Mode)

## Variants and caveats

Where cards have a variable width, it's possible that — in some configurations — they may become quite wide. This may cause a wider-than-optimal [measure](https://en.wikipedia.org/wiki/Line_length) for the description and diminish readability. You can cap the measure (line length) using `max-width`. The optimal measure is between 45 and 75 characters. 

In the following example, the `ch` unit is used to cap the measure to approximately 60 characters (1 `ch` is equal to the width of one `0` character).

```css
.card-interface p {
  max-width: 60ch;
}
```