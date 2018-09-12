# Accessible Carousel

The following is intended to be read alongside the [GEL Carousel page](http://www.bbc.co.uk/gel/guidelines/tabs#orb-footer). In fact, you should probably read that one first. Here, we'll just cover the technical requirements to make carousels as accessible as possible.

The implementation to come is:

* Written with plain CSS and ES5 JavaScript (_no build process assumed_)
* Lacking any dependencies (_for maximum portability and minimum payload_)
* Based on progressive enhancement (_the HTML is fine without the JavaScript or the CSS_)

## Semantics

### Initial HTML

The foundation of any performant and accessible component is semantic markup. Where semantic markup is provided, we can defer to standard browser behaviors.

```html
<div class="carousel">
  <ul>
    <li class="card-interface">
      <div class="card-interface-img">
        <img src="1.jpg" alt="">
      </div>
      <div class="card-interface-text">
        <h2 class="card-interface-title"><a href="[url]">Title Of Card</a></h2>
        <p>Description of the card</p>
        <small>Attribution</small>
      </div>
      <ul class="card-interface-toolbar">
        <li><button>Love</button></li>
        <li><button>Add</button></li>
        <li><button>Share</button></li>
      </ul>
    </li>
    <li class="card-interface">
      <div class="card-interface-img">
        <img src="2.jpg" alt="">
      </div>
      <div class="card-interface-text">
        <h2 class="card-interface-title"><a href="[url]">Title Of Second Card</a></h2>
        <p>Description of the card that is longer than other descriptions in the set of cards.</p>
        <small>Attribution</small>
      </div>
      <ul class="card-interface-toolbar">
        <li><button>Love</button></li>
        <li><button>Add</button></li>
        <li><button>Share</button></li>
      </ul>
    </li>
    <li class="card-interface">
      <div class="card-interface-img">
        <img src="3.jpg" alt="">
      </div>
      <div class="card-interface-text">
        <h2 class="card-interface-title"><a href="[url]">The Third Card's Title</a></h2>
        <p>Short description of the card</p>
        <small>Attribution</small>
      </div>
      <ul class="card-interface-toolbar">
        <li><button>Love</button></li>
        <li><button>Add</button></li>
        <li><button>Share</button></li>
      </ul>
    </li>
    <li class="card-interface">
      <div class="card-interface-img">
        <img src="4.jpg" alt="">
      </div>
      <div class="card-interface-text">
        <h2 class="card-interface-title"><a href="[url]">The Fourth Card</a></h2>
        <p>Long description of the card because that adds variety in terms of vertical space.</p>
        <small>Attribution</small>
      </div>
      <ul class="card-interface-toolbar">
        <li><button>Love</button></li>
        <li><button>Add</button></li>
        <li><button>Share</button></li>
      </ul>
    </li>
    <li>
      <div class="card-interface-img">
        <img src="5.jpg" alt="">
      </div>
      <div class="card-interface-text">
        <h2 class="card-interface-title"><a href="[url]">The Fifth Card Is Here</a></h2>
        <p>Short description here.</p>
        <small>Attribution</small>
      </div>
      <ul class="card-interface-toolbar">
        <li><button>Love</button></li>
        <li><button>Add</button></li>
        <li><button>Share</button></li>
      </ul>
    </li>
    <li>
      <div class="card-interface-img">
        <img src="6.jpg" alt="">
      </div>
      <div class="card-interface-text">
        <h2 class="card-interface-title"><a href="[url]">The Sixth Card For You</a></h2>
        <p>Short description here.</p>
        <small>Attribution</small>
      </div>
      <ul class="card-interface-toolbar">
        <li><button>Love</button></li>
        <li><button>Add</button></li>
        <li><button>Share</button></li>
      </ul>
    </li>
  </ul>
</div>
```

Note that each 'card' within the carousel is created according to the [GEL Cards page](https://www.bbc.co.uk/gel/guidelines/cards) and accompanying [Accessible Cards](../card) document. Details on card design is not repeated here.

<table>
  <caption>Semantic elements</caption>
  <tr>
    <th scope="row">
      <code>&lt;ul> and &lt;li></code>
    </th>
    <td>
      <p>Any sets of related/equivalent content should be marked up as lists. Our set of carousel cards is no different. The practical upshot of using list semantics for screen reader users is twofold:</p>
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
      <p>Although the headings are part of the <a href="../card">card component</a>, it's worth noting here that headings provide navigation cues to screen reader users, and that each item's principle heading within a list needs to be of the same level.</p>
    </td>
  </tr>
</table>

### Enhanced HTML

The [demonstration script](#demonstration) enhances this basic semantic HTML in a number of ways pertaining to semantics and interactive behavior. Here is how the enhanced HTML of the [demo](assets/demo1.html) looks (some slides have been removed for brevity):

```html
<div class="carousel carousel-interface" role="region" aria-label="Selected videos">
   <div class="carousel-interface-scrollable" tabindex="0" role="group" aria-label="scroll for more">
      <ul class="carousel-interface-list">
         <li class="card-interface" style="width: 300px;">
            <div class="card-interface-img" style="height: 200px; cursor: pointer;">
               <img src="1.jpg" alt="">
               <span class="card-interface-icon">
                  <svg fill="currentColor" viewBox="0 0 20 20" width="20" height="20" focusable="false">
                     <polyline points="2 2, 18 10, 2 18"></polyline>
                  </svg>
               </span>
            </div>
            <div class="card-interface-text">
               <h2 class="card-interface-title"><a href="[url]">Title Of Card</a></h2>
               <p>Description of the card</p>
               <small>Attribution</small>
            </div>
            <ul class="card-interface-toolbar">
               <li><button>Love</button></li>
               <li><button>Add</button></li>
               <li><button>Share</button></li>
            </ul>
         </li>
         <li class="card-interface" style="width: 300px; margin-left: 16px;">
            <div class="card-interface-img" style="height: 200px; cursor: pointer;">
               <img src="2.jpg" alt="">
               <span class="card-interface-icon">
                  <svg fill="currentColor" viewBox="0 0 20 20" width="20" height="20" focusable="false">
                     <polyline points="2 2, 18 10, 2 18"></polyline>
                  </svg>
               </span>
            </div>
            <div class="card-interface-text">
               <h2 class="card-interface-title"><a href="[url]">Title Of Second Card</a></h2>
               <p>Description of the card that is longer than other descriptions in the set of cards.</p>
               <small>Attribution</small>
            </div>
            <ul class="card-interface-toolbar">
               <li><button>Love</button></li>
               <li><button>Add</button></li>
               <li><button>Share</button></li>
            </ul>
         </li>
      </ul>
   </div>
   <div class="carousel-interface-buttons">
      <button aria-label="previous" disabled="">
         <svg viewBox="0 0 20 20" width="20" height="20">
            <polyline points="14 6, 6 10, 14 14"></polyline>
         </svg>
      </button>
      <button aria-label="next">
         <svg viewBox="0 0 20 20" width="20" height="20">
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
      The list is wrapped in a container that is made scrollable horizontally using CSS's <code>overflow-x: auto</code>. To ensure this scrolling behavior is accessible by keyboard, the element is made focusable with <code>tabindex="0"</code>. The <code>group</code> role combined with <code>aria-label="scroll for more"</code> ensures screen reader users are aware of the focusable element's purpose too.
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>.carousel-interface-buttons</code>
    </th>
    <td>
      A pair of buttons are provided to scroll the region forwards and backwards. The ability to scroll the cards group directly, and incrementally via these buttons, makes the carousel <a href="https://en.wikipedia.org/wiki/Multimodal_interaction">multimodal</a>. That is, users have a choice as to how they operate it, and can settle for whatever suits them best.
    </td>
  </tr>
</table>

## Interaction

### General behavior

Whether by mouse or keyboard, the user is able to scroll the list of cards left and right. The buttons improve the experience in two ways:

* They increase the affordance of the component, indicating that it can indeed be scrolled in either direction
* They offer an alternative means to scoll, and in regular increments

The mouse user can scroll by dragging the scrollbar handle, and the trackpad user can use gestures (on a Macbook, it's a two-finger swipe). A custom scrollbar style is employed to give added affordance where supported (see the [Visual design requirements](#visual-design-requirements) section).

### Keyboard behavior

Let's go over keyboard behavior chronologically, starting with the user first focusing the carousel

1. The first <kbd>Tab</kbd> stop reached is the scrollable wrapper element. With this focused, the user can scroll cards into view with the left and right arrow keys.
2. When the user tabs away from this wrapper, the first item they focus is the link of the first _visible_ card's title. Cards not visible are removed from the focus order so that the experience for a keyboard user is the same as that of a mouse user, with only the visible cards being interactive.
3. When the user tabs from the last visible card, they focus the first of the button controls. They are then able to scroll the cards in increments. When a card appears that they wish to click, they can move back into the card area with <kbd>Shift + Tab</kbd>.

The ability to focus (and availability to assistive technologies) of card items is managed using `IntersectionObserver` where supported. Where it is not supported the keyboard user has a slightly degraded experience, finding that each item is in focus order at all times. Since native scrolling behavior is used, invisible items focused in this scenario are brought into view. No invisible items receive focus, avoiding a [WCAG 2.4.3 Focus Order](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-focus-order.html) failure.

The script adds/removes `tabindex="-1"` to each interactive element of a card as it goes in or out of view, removing or adding those interactive elements from focus order as appropriate.

```js
// Manage focus order with intersectionObserver
if ('IntersectionObserver' in window) {
  var observerSettings = {
    root: scrollable
  }

  // The callback function for the observer
  var callback = function(items, observer) {
    Array.prototype.forEach.call(items, function(item) {
      // `item.target` is needed to get the node
      var controls = item.target.querySelectorAll('a, button');
      if (item.intersectionRatio > 0) {
        Array.prototype.forEach.call(controls, function(control) {
          control.removeAttribute('tabindex');
        });
        item.target.removeAttribute('aria-hidden');
      } else {
        Array.prototype.forEach.call(controls, function(control) {
          control.setAttribute('tabindex', '-1');
        });
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

The `scroll` event is triggered extremely frequently without intervention. Therefore, for performance's sake, we [debounce](https://davidwalsh.name/javascript-debounce-function) the disabling/enabling function:

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

Where supported (currently only in webkit browsers such as iOS and OSX Safari) CSS scroll snap points are implemented. As users with these devices scroll, the child cards snap into alignment along the left edge of the container.

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

See the [GEL Cards page](https://www.bbc.co.uk/gel/guidelines/cards) and accompanying [Accessible Cards](../card) document.

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

## Demonstration

A [working demonstration](assets/demo1.html) of the discussed implementation is available for you to explore.

Note the initialization which accepts two arguments:

1. The node you wish to transform into a carousel
2. An options object
    * `label`: The label for the outer carousel region, included as the value of an `aria-label` (string; default is 'Selected videos')
    * `itemWidth`: The width in pixels of each slide item (integer; default is `300`)
    * `itemMargin`: The width in pixels of the margin between items (integer; default is `16`)

## Variants and caveats

* Some of the features, including the button controls and snap point CSS are enhancements and could be removed for brevity.
* The `IntersectionObserver` section of the script could be harnessed to support lazy loading of the images by switching from `data-src` to a true `src` when the slide intersects. The fixed image height area means a placeholder image of the same dimensions is not needed in this case, simplifying the implementation detail.
