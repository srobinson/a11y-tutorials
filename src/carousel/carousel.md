# Accessible Carousel

The following is intended to be read alongside the [GEL Carousel page](http://www.bbc.co.uk/gel/guidelines/tabs#orb-footer). In fact, you should probably read that one first. Here, we'll just cover the technical requirements to make carousels as accessible as possible.

The implementation to come is:

* Written with plain CSS and ES5 JavaScript (_no build process assumed_)
* Lacking any dependencies (_for maximum portability and minimum payload_)
* Based on progressive enhancement (_the HTML is fine without the JavaScript or the CSS_)
* Is editor friendly (_can be easily dropped into HTML and/or markdown files_)

## Semantics

### Initial HTML

The foundation of any performant and accessible component is semantic markup. Where semantic markup is provided, we can defer to standard browser behaviors.

```html
<div class="carousel">
  <ul>
    <li>
      <div>
        <img src="[url]" alt="">
      </div>
      <div>
        <h2><a href="[url]">Headline 1</a></h2>
        <p>Description</p>
        <small>Attribution</small>
      </div>
    </li>
    <li>
      <div>
        <img src="[url]" alt="">
      </div>
      <div>
        <h2><a href="[url]">Headline 2</a></h2>
        <p>Description</p>
        <small>Attribution</small>
      </div>
    </li>
    <li>
      <div>
        <img src="[url]" alt="">
      </div>
      <div>
        <h2><a href="#">Headline 3</a></h2>
        <p>Description</p>
        <small>Attribution</small>
      </div>
    </li>
    <li>
      <div>
        <img src="[url]" alt="">
      </div>
      <div>
        <h2><a href="[url]">Headline That is Very Long</a></h2>
        <p>Description</p>
        <small>Attribution</small>
      </div>
    </li>
    <!-- more 'slides' here -->
  </ul>
</div>
```

Let's break down what we have here:

<table>
  <caption>Semantic elements</caption>
  <tr>
    <th scope="row">
      <code>&lt;ul> and &lt;li></code>
    </th>
    <td>
      Any sets of related/equivalent content should be marked up as lists. Our set of carousel slides is no different. The practical upshot of using list semantics for screen reader users is twofold:
      <ul>
        <li>The list is identified and the number of items is enumerated.</li>
        <li>Screen readers list keyboard shortcuts are activated, allowing navigation between items.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>&lt;h2></code>
    </th>
    <td>
      Headings are a primary form of navigation for screen reader users. Each item has a heading of the same level to reflect the flat list hierarchy and to support navigation shortcuts.
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>&lt;a></code>
    </th>
    <td>
      The link is placed around the heading text node. This form is adopted for two reasons:
      <ul>
        <li>It ensures the link text is descriptive and unique. "Read more" (or similar) for each item results in an unhelpful lack of differentiation when links are aggregated by screen reader software.</li>
        <li>The common practice of wrapping <em>all</em> the slide content in one link can result in a verbose and confused accessible label. In this case, it would contain the title, description, and attribution. (As we shall explore, a redundant click handler can be placed on the outer slide without adversely affecting accessibility.)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>&lt;small></code>
    </th>
    <td>
      The small element is not identified as such in screen reader software, but it does ensure that the text size remains suitably diminutive in the absence or failure of CSS.
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>&lt;div>s</code>
    </th>
    <td>
      The <code>&lt;div></code> element is not identified in assistive software. It is used to separate the image from the text for styling purposes, as discussed in <a href="#visual-design-requirements">Visual design requirements</a>.
    </td>
  </tr>
</table>

### Enhanced HTML

The [demonstration script](#demonstration) provided enhances this basic semantic HTML in a number of ways pertaining to semantics and interactive behavior. Here is how the enhanced HTML of the [demo](assets/demo1.html) looks (some slides have been removed for brevity):

```html
<div class="carousel carousel-interface" role="region" aria-label="Selected videos">
   <div class="carousel-interface-scrollable" tabindex="0" role="group" aria-label="scroll for more">
      <ul class="carousel-interface-list">
         <li style="width: 300px;">
            <div class="carousel-interface-image" style="height: 150px;">
               <img src="http://via.placeholder.com/350x150" alt="">
               <span class="carousel-interface-icon">
                  <svg viewBox="0 0 20 20" width="20" height="20" focusable="false">
                     <polyline points="2 2, 18 10, 2 18"></polyline>
                  </svg>
               </span>
            </div>
            <div class="carousel-interface-text">
               <h2><a href="#">Headline 1</a></h2>
               <p>Description</p>
               <small>Attribution</small>
            </div>
         </li>
         <li style="width: 300px;">
            <div class="carousel-interface-image" style="height: 150px;">
               <img src="http://via.placeholder.com/350x150" alt="">
               <span class="carousel-interface-icon">
                  <svg viewBox="0 0 20 20" width="20" height="20" focusable="false">
                     <polyline points="2 2, 18 10, 2 18"></polyline>
                  </svg>
               </span>
            </div>
            <div class="carousel-interface-text">
               <h2><a href="#">Headline 2</a></h2>
               <p>Description</p>
               <small>Attribution</small>
            </div>
         </li>
         <li style="width: 300px;">
            <div class="carousel-interface-image" style="height: 150px;">
               <img src="http://via.placeholder.com/350x150" alt="">
               <span class="carousel-interface-icon">
                  <svg viewBox="0 0 20 20" width="20" height="20" focusable="false">
                     <polyline points="2 2, 18 10, 2 18"></polyline>
                  </svg>
               </span>
            </div>
            <div class="carousel-interface-text">
               <h2><a href="#">Headline 3</a></h2>
               <p>Description</p>
               <small>Attribution</small>
            </div>
         </li>
      </ul>
   </div>
   <div class="carousel-interface-buttons">
      <button aria-label="scroll back">
         <svg viewBox="0 0 20 20" width="20" height="20" focusable="false">
            <polyline points="14 6, 6 10, 14 14"></polyline>
         </svg>
      </button>
      <button aria-label="scroll forward">
         <svg viewBox="0 0 20 20" width="20" height="20" focusable="false">
            <polyline points="6 6, 14 10, 6 14"></polyline>
         </svg>
      </button>
   </div>
</div>
```

There's plenty to unpack here, so let's look at each important addition in turn:

<table>
  <caption>Semantic elements</caption>
  <tr>
    <th scope="row">
      The <code>.carousel-interface</code> wrapper with <code>role="region"</code> and <code>aria-label</code>
    </th>
    <td>
      The carousel represents a large amount of content, so is thematically grouped together as a region. Many screen readers provide shortcuts for regions, and encountering one while browsing will announce its role and label, provided here using <code>aria-label</code>. This can be changed from the default 'Selected videos' in the options object upon initialization in the demonstration to follow. The scrollable group and button controls represent the two components of this larger region.
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>.carousel-interface-scrollable</code> with <code>role="group"</code> and <code>tabindex="0"</code>
    </th>
    <td>
      The list is wrapped in a container that is made scrollable horizontally using CSS's <code>overflow-x: auto</code>. To ensure this scrolling behavior is accessible by keyboard, the element is made focusable with <code>tabindex="0"</code>. The <code>group</code> role combined with <code>aria-label="scroll for more"</code> ensure screen reader users are aware of the focusable element's purpose too.
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>.carousel-interface-icon</code>
    </th>
    <td>
      Each slide's image has an icon, as per the <a href="http://www.bbc.co.uk/gel/guidelines/tabs#orb-footer">GEL Carousel page</a>. This icon can be considered decorative, so has no accessible label. It takes <code>focusable="false"</code> to ensure it is not focusable in any browsers  (<a href="https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8090208/">Internet Explorer 11 and early versions of Edge</a> make all SVGs focusable by default.)
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>.carousel-interface-buttons</code>
    </th>
    <td>
      A pair of buttons are provided to scroll the region forwards and backwards. The ability to scroll the slides group directly, and incrementally via these buttons, makes the carousel <a href="https://en.wikipedia.org/wiki/Multimodal_interaction">multimodal</a>. That is, users have a choice as to how they operate it, settling for whatever suits them best.
    </td>
  </tr>
</table>

## Interaction

### General behavior

Whether by mouse or keyboard, the user is able to scroll the list of slides left and right. Should the ability to scroll the region not be obvious to them, the button controls achieve the same goal via regular slide-width increments.

The mouse user can scroll by dragging the scrollbar handle, and the trackpad user can use gestures (on a Macbook, it's a two-finger swipe). A custom scrollbar style is employed to give added affordance where supported (see the [Visual design requirements](#visual-design-requirements) section).

Clicking anywhere on a slide item by mouse or touch will activate the link contained in its main heading/title. This is achieved by adding an event listener to the containing `<li>` element (or `item` variable in the script):

```js
item.addEventListener('click', function() {
  link.click();
});
```

### Keyboard behavior

Let's go over keyboard behavior chronologically, from the user first focusing the the carousel

1. The first <kbd>Tab</kbd> stop reached is the scrollable wrapper element. With this focused, the user can scroll slides into view with the left and right arrow keys.
2. When the user tabs away from this wrapper, the first item they focus is the first _visible_ slide's link. Slides that are not visible are removed from the focus order so that the experience for a keyboard user is the same as that of a mouse user, with only the visible slides being interactive.
3. When the user tabs from the last visible slide, they focus the first of the button controls. They are then able to scroll the slides in increments. When a slide appears that they wish to click, they can move back into the slide area with <kbd>Shift + Tab</kbd>.

The focusability (and availability to assistive technologies) of slide items is managed using `IntersectionObserver` where supported. Where it is not supported the keyboard user has a slightly degraded experience, finding that each item is in focus order at all times. Since native scrolling behavior is used, invisible items focused in this scenario are brought into view. No invisible items receive focus, avoiding a [2.4.3 Focus Order](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-focus-order.html) WCAG 2.0 failure.

```js
// Manage focus order with intersectionObserver
if ('IntersectionObserver' in window) {
  const observerSettings = {
    root: scrollable
  }

  // The callback function for the observer
  var callback = function(items, observer) {
    Array.prototype.forEach.call(items, function(item) {
      // `item.target` is needed to get the node
      var a = item.target.querySelector('a');
      if (item.intersectionRatio > 0) {
        a.removeAttribute('tabindex');
        item.target.removeAttribute('aria-hidden');
      } else {
        a.setAttribute('tabindex', '-1');
        item.target.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Initialize the observer
  var observer = new IntersectionObserver(callback, observerSettings);
  Array.prototype.forEach.call(items, function(item) {
    observer.observe(item);
  });
}
```

#### Disabled buttons

The back and forward buttons can be disabled when they have run out of distance to cover. Accordingly, the back button is disabled at the time of initialization. From this point we need to manage the disabled state of each button in accordance with the scrollable container's `scroll` event.

Famously, the `scroll` event is triggered extremely frequently without intervention. Therefore, for performance's sake, we [debounce](https://davidwalsh.name/javascript-debounce-function) the disabling/enabling function:

```js
function disableEnable() {
  prev.disabled = scrollable.scrollLeft < 1;
  next.disabled = scrollable.scrollLeft === list.scrollWidth - list.offsetWidth;
}

// Debounce the button disabling function on scroll
var debounced;
scrollable.addEventListener('scroll', function () {
  window.clearTimeout(debounced);
  debounced = setTimeout(disableEnable, 100);
});
```

### Screen reader behavior

Screen reader interaction is much the same where the user is operating by the <kbd>Tab</kbd> key. In addition, the user can navigate using their list item shortcut (<kbd>i</kbd> in NVDA). Items that are not visible are set to `aria-hidden="true"`, meaning only visible items can be interacted with.

Note that disabled buttons (see the **Disabled buttons** section above) are not focusable. However, screen reader users can still browse to these buttons, which will be announced as "dimmed" or "disabled" to them.

### Snap points

Where supported (currently only in webkit browsers such as iOS and OSX Safari) CSS scroll snap points are implemented. As users with these devices scroll, the child slides snap into alignment along the left edge of the container.

```css
.carousel-interface-scrollable {
  scroll-snap-type: mandatory;
}

.carousel-interface-list > li {
  scroll-snap-align: start;
}
```

## Visual design requirements

The visual design must meet a number of requirements in terms of usability and tolerance of dynamic content.

### Slide card design

The [GEL Carousel page](http://www.bbc.co.uk/gel/guidelines/tabs#orb-footer) mandates that each slide conforms to a standard, set width. In the [demonstration](#demonstration) you can set this width in the options object. The default is `300` (as in pixels).

```js
var carouselElem = document.querySelector('.carousel');
var carousel = new Carousel(carouselElem, {
  itemWidth: 200
});
```

In terms of height and the distribution of contents, Flexbox ensures a consistent design with each slide item as tall as the tallest of the set. The last text element (the attribution in the demo) is aligned to the bottom of the slide shape. This is achieved with an `auto` margin, as opposed to absolute positioning which could result in the attribution being obscured by wrapped content above it.

```css
.carousel-interface-text > :last-child {
  margin-top: auto;
}
```

The `:last-child` selector ensures that _any_ element in this position takes the margin style, affording editorial flexibility.

### The images

The images container (`.carousel-interface-image`) uses a combination of Flexbox and `object-fit: cover` to make sure any arbitrary image takes up the height and width available while keeping its aspect ratio. The `imageHeight` is adjustable in the options object. The default (in pixels) is `150`.

```js
var carouselElem = document.querySelector('.carousel');
var carousel = new Carousel(carouselElem, {
  imageHeight: 300
});
```

### The scrollbar

The scroll bar gives the carousel interface perceived affordance, as well as showing the user their position within the scrollable area. In many browsers and operating systems, a scrollbar is always shown by default for scrollable regions. On OSX this is not the case, so custom scrollbar styles are provided in supporting (webkit) browsers:

```css
.carousel-interface-scrollable::-webkit-scrollbar {
  height: 0.5rem;
}

.carousel-interface-scrollable::-webkit-scrollbar-track {
  background-color: #ccc;
}

.carousel-interface-scrollable::-webkit-scrollbar-thumb {
  background-color: #404040;
}
```

Note that exposing, and styling, the real scrollbar is much more efficient and reliable than replacing it with a custom JavaScript implementation.

### Focus styles

Focus styles are handled progressively too. If `:focus-within` is supported by the browser, focusing the slide's link draws a box-shadow around the whole parent item, making it appear that the card itself is the link. As discussed, _actually_ making the card the link results in a verbose accessible label and should be avoided.

Where `:focus-within` is not supported, the link gets a clear underlined text style. Here's how this works in the CSS's cascade:

```css
/* add the :focus-within style if supported */
.carousel-interface-list > li:focus-within {
  box-shadow: inset 0 0 0 0.25rem #404040;
}

/* remove the :focus style only if :focus-within is supported */
.carousel-interface-list > li:focus-within a:focus {
  text-decoration: none;
}
```

## Demonstration

A [working demonstration](assets/demo1.html) of the discussed implementation is available for you to explore.

Note the initialization which accepts two arguments:

1. The node you wish to transform into a carousel
2. An options object
    * `label`: The label for the outer carousel region, included as the value of an `aria-label` (string; default is 'Selected videos')
    * `itemWidth`: The width in pixels of each slide item (integer; default is `300`)
    * `itemMargin`: The width in pixels of the margin between items (integer; default is `16`)
    * `imageHeight`: The height in pixels of the image container (integer; default is `150`)
    * `icon`: The icon that appears over the bottom left corner of the image (SVG string; default is a simple play icon)

## Variants and caveats

* Some of the features, including the button controls and snap point CSS are enhancements and could be removed for brevity
* The `IntersectionObserver` section of the script could be harnessed to support lazy loading of the images by switching from `data-src` to a true `src` when the slide intersects. The fixed image height area means a placeholder image of the same dimensions is not needed in this case, simplifying the implementation detail
* Depending on where the carousel is used, a different icon might be needed (as supported in the options). The iPlayer icon for iPlayer content, for example.
