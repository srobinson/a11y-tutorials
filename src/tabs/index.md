# Accessible Tabs

The following is intended to be read alongside the [GEL Tabs page](http://www.bbc.co.uk/gel/guidelines/tabs#orb-footer). In fact, you should probably read that one first. Here, we'll just cover the technical requirements to make tab interfaces as accessible as possible.

The implementation to come is:

* Written with plain CSS and ES5 JavaScript (_no build process assumed_)
* Lacking any dependencies (_for maximum portability and minimum payload_)
* Based on progressive enhancement (_the HTML is fine without the JavaScript or the CSS_)
* Is editor friendly (_can be easily dropped into HTML and/or markdown files_)

## Semantics

### Initial HTML

The foundation of any performant and accessible component is semantic markup. This markup should make sense and be usable in the absence of JavaScript. Hence, we begin by using a simple list structure including same-page links. Note the wrapping `<div>` with `class="tab"`. This simply [groups the content together](https://github.com/BulbEnergy/design/pull/177) and can act as a hook for the JavaScript that will run to transform the content into a true tab interface (see the [demonstration](#demonstration)).

```html
<div class="tabs">
  <ul>
    <li>
      <a href="#section1">Section 1</a>
    </li>
    <li>
      <a href="#section2">Section 2</a>
    </li>
    <li>
      <a href="#section3">Section 3</a>
    </li>
  </ul>
  <section id="section1">
    <h2>Section 1</h2>
  </section>
  <section id="section2">
    <h2>Section 2</h2>
  </section>
  <section id="section3">
    <h2>Section 3</h2>
  </section>
</div>
```

As you can see, each 'tab panel' starts out as a simple section. In the absence of JavaScript, the user can navigate to a section by pressing a corresponding link.

Sections are introduced by headings, and should be of the same level (whichever is appropriate to the tab interface's position in the document structure). You would, of course, be providing some content under each section's heading!

Since tabs are laid out side-by-side, there's little room for them in narrow viewports. That's why we'll only be enhancing to a tab interface at a given breakpoint. This actually has two advantages:

* The interface remains a 'one column' structure which fits better into a portrait orientation
* Reduced JavaScript (including DOM manipulation) is run on smaller, typically lower-powered devices

In the [demonstration](#demonstration) at the end of this document, you'll find `matchMedia` is used for this logic.

```js
if (window.matchMedia('(min-width: '+breakpoint+')').matches) {
  // Enhance to a tab interface here
}
```

### Enhanced HTML

Where a tab interface pattern is adopted, certain semantics and behaviors should accompany the change in visual design. Otherwise, assistive technology and keyboard users will have trouble interacting with it. The semantics tell the user what kind of interface they are encountering, and how it should be used (see [Interaction](#interaction)).

First let's deal with the change of semantics.

```html
<div class="tabs">
  <ul role="tablist">
    <li role="presentation">
      <a href="#section1" role="tab" id="tab1" aria-selected="true">Section 1</a>
    </li>
    <li role="presentation">
      <a href="#section2" role="tab" id="tab2" aria-selected="false">Section 2</a>
    </li>
    <li role="presentation">
      <a href="#section3" role="tab" id="tab3" aria-selected="false">Section 3</a>
    </li>
  </ul>
  <section role="tabpanel" id="section1" aria-labelledby="tab1">
    <h2>Section 1</h2>
  </section>
  <section role="tabpanel" id="section2" aria-labelledby="tab2">
    <h2>Section 2</h2>
  </section>
  <section role="tabpanel" id="section3" aria-labelledby="tab3">
    <h2>Section 3</h2>
  </section>
</div>
```

There's a lot to unpack here, so lets look at each addition in turn.

<table>
  <caption>Semantic attribution</caption>
  <tr>
    <th scope="row">
      <code>role="tablist"</code>
    </th>
    <td>
      The tablist role tells assistive software that the list is, in fact, a set of tabs.
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>role="tab"</code>
    </th>
    <td>
      Each link in the tablist must take an explicit tab role, otherwise assistive software has trouble enumerating the tabs.
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>role="presentation"</code>
    </th>
    <td>
      Now that our links are enumerable tabs, there's no need for the list semantics. The presentation role effectively hides list information form assistive software.
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>role="presentation"</code>
    </th>
    <td>
      Now that our links are enumerable tabs, there's no need for the list semantics. The presentation role effectively hides list information from assistive software.
    </td>  
  </tr>
  <tr>
    <th scope="row">
      <code>aria-selected="true|false"</code>
    </th>
    <td>
      This state attribute tells assistive software which tab is the selected (or 'current') tab.
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>role="tabpanel"</code>
    </th>
    <td>
      Each section is defined as a tab panel within the tab interface.
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>aria-labelledby="[tab ID]"</code>
    </th>
    <td>
      The <code>aria-labelledby</code> attribute labels the tab panel by its corresponding tab. In practice, this means a screen reader user will be told they are entering <em>"tab panel [label]"</em> as they move their focus or virtual cursor into it. This is good for context.
    </td>
  </tr>
</table>

#### A note on unique IDs

You may have noticed that tab `id` attributes have magically appeared to support the `aria-labelledby` relationships. It is important that each `id` is unique, otherwise such relationships break down. In case there are two tab interfaces on the page, the [demonstration](#demonstration) script generates unique `id` strings.

The code looks like this:

```js
// Set random id string
var ident = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

// Set a tab's id (where `i` is the index of the tab)
tab.setAttribute('id', 'tab-' + ident + '-' + (i + 1));
```

Use of duplicate `id` values is one of the most common failings under WCAG's [4.1.1 Parsing](https://www.w3.org/TR/WCAG20/#ensure-compat) criterion.

## Interaction

### General behavior

For mouse and touch users the interface is intuitive: As you press a tab, the previously selected tab panel is hidden and the newly selected tab panel appears.

It is important that, although our tabs will adopt certain behaviors peculiar to tab interfaces, we do not _remove_ desirable browser behaviors afforded by the initial structure (outlined in the [Semantics](#semantics) section).

Therefore, as each new tab is chosen, the script updates the document `hash` (`window.location.hash`) using the history API.

```js
history.pushState(null, null, '#' + panels[index].id);
```

This means we can use tab panels like standard document fragments, as before, with some additional logic to run on page load:

* When the page loads, does the URL's `hash` correspond to a tab panel's `id`?
    * **Yes**: Select that tab and reveal its corresponding panel
    * **No**: Reveal the first of the tab interface's tab panels, and _do not_ update the `hash`. Document fragments not corresponding to tabs should still function as expected.

Note that, because the newly revealed panel has `tabindex="-1"`, we have ensured its contents are placed next in focus order. That is, if the panel contains a link, pressing <kbd>Tab</kbd> once the panel has been revealed will focus that link.

To support links pointing to panels, as well as use of the back and forward browser buttons, we also listen to the `hashchange` event:

```js
window.addEventListener('hashchange', function (e) {
  var index = panelWithHash(window.location.hash);
  if (index > -1) {
    switchTab(index, false);
  }
});
```

Note the `panelWithHash` function that determines if there is either

* A panel `id` that corresponds directly to the hash;
* A panel that _contains_ an element that corresponds directly to the hash

This way, we can reveal the panel for document fragments linked within it. It uses the `contains` method, which returns `true` for either of the above conditions (it considers elements to 'contain' themselves).

```js
function panelWithHash (hash) {
  var target = document.querySelector(hash);
  var index = -1;
  if (hash) {
    panels.forEach(function (panel) {
      if (panel && panel.contains(target)) {
        index = Array.prototype.indexOf.call(panels, panel);
      }
    });
  }
  return index;
}
```

### Keyboard behavior

In keeping with conventions set in longstanding native application design, tab interfaces have a prescribed set of behaviors for keyboard interaction. These are outlined in the [WAI ARIA practices guide for tabs](https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel).

The full set of expected behaviors are detailed here:

<table>
  <caption>Tab interface keyboard behaviors</caption>
  <tr>
    <th scope="row">
      Entering the tablist by <kbd>Tab</kbd>
    </th>
    <td>
      Focus the selected tab (the one with <code>aria-selected</code>)
    </td>
  </tr>
  <tr>
    <th scope="row">
      Focused tab: <kbd>Tab</kbd>
    </th>
    <td>
      Focus the first interactive element inside the open tab panel or, if one does not exist, the next interactive element past the tab interface.
    </td>
  </tr>
  <tr>
    <th scope="row">
      Focused tab: <kbd>Shift</kbd> + <kbd>Tab</kbd>
    </th>
    <td>
      Focus the closest interactive element outside (above) the tab interface.
    </td>
  </tr>
  <tr>
    <th scope="row">
      Focused tab: <kbd>→</kbd> (right arrow key)
    </th>
    <td>
      Select and focus the adjacent tab to the right or, if none exists, the first tab in the tablist.
    </td>
  </tr>
  <tr>
    <th scope="row">
      Focused tab: <kbd>←</kbd> (left arrow key)
    </th>
    <td>
      Select and focus the adjacent tab to the left or, if none exists, the last tab in the tablist.
    </td>
  </tr>
</table>

These are the standard behaviors, but there is some dispute over whether keyboard users are generally aware or expect arrow keys to be their sole means of selecting and activating tabs. The [demonstration](#demonstration) script therefore supports the option of placing the tabs into focus order. With the `tabsFocusable` option set to `true` users can

* Simultaneously select and activate tabs using the left and right arrow keys
* Focus tabs using the <kbd>Tab</kbd> key, then activate them with the <kbd>Enter</kbd> key

#### Focus management

In order to support arrow navigation for unselected tabs, we need to programmatically manage focus.

* Each unselected tab must take `tabindex="-1"`, removing it from user focus by <kbd>Tab</kbd> (unless `tabsFocusable` is set to `true` in the options object)
* On pressing a left or right arrow key:
    * The standard key behavior must be suppressed (`e.preventDefault()`)
    * The corresponding (left or right) tab must be focused and selected
    * The newly selected tab must have `tabindex="-1"` removed, making it focusable by <kbd>Tab</kbd> again

With the `tabindex` attribution included, the tablist should look something like this (assuming the second tab is currently selected, and `tabsFocusable` is set to `false` — the default value):

```html
<ul role="tablist">
  <li role="presentation">
    <a href="#section1" role="tab" id="tab1" aria-selected="false" tabindex="-1">Section 1</a>
  </li>
  <li role="presentation">
    <a href="#section2" role="tab" id="tab2" aria-selected="true">Section 2</a>
  </li>
  <li role="presentation">
    <a href="#section3" role="tab" id="tab3" aria-selected="false" tabindex="-1">Section 3</a>
  </li>
</ul>
```

## Visual design requirements

### Initial design

It should be clear the list acts as a 'table of contents' for the upcoming sections. User agent styles take care of most of this for us, by providing bullets for the list items, and underlines for the links. If you override these styles, be sure to make it clear — by other means — that the interface given is a list of links.

### Enhanced design

As described in the [GEL Tabs page](http://www.bbc.co.uk/gel/guidelines/tabs), the relationship of the tabs to the panels should be clear — as well as which tab is the selected one.

In addition, be sure to include strong focus styles for keyboard users in accordance with WCAG [2.4.7 Focus Visible](https://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-visible). It is recommended the faint, dotted outline afforded by some user agents is replaced with an inset box-shadow.

```css
.tab-interface [role="tab"]:focus {
  outline: none;
  box-shadow: inset 0 0 0 0.25rem #666;
}
```

**Note:** The script used in the [demonstration](#demonstration) applies the class `tab-interface` to the container element as a styling context.

A focus style for the tab panel that is focused on page load is optional since standard document fragments do not receive focus styles as part of sequential navigation. The `outline` is suppressed in the [demonstration](#demonstration).

## Demonstration

A [working demonstration](assets/demo1.html) of the discussed implementation is available for you to explore.

Note the initialization which accepts two arguments:

1. The node you wish to transform into a tab interface (*DOM node*)
2. An options object:
    * `breakPoint`: the viewport width at which the script runs to enhance the content into tabs (string; default is `400px`)
    * `trackHash`: whether or not to treat tab panels as page fragments and support the back button (Boolean; default is `true`)
    * `tabsFocusable`: whether the tabs should be in focus order. Placing them in focus order in nonstandard but may aid usability for some audiences (Boolean; default is `false`)

```js
var tabsElem = document.querySelector('.tabs');
var tabInterface = new Tabbed(tabsElem, {
  breakPoint: '600px';
});
```

To initialize multiple tab interfaces you can do something like this:

```js
var tabsElems = document.querySelectorAll('.tabs');
Array.prototype.forEach.call(tabsElems, function(tabsElem) {
  var tabInterface = new Tabbed(tabsElem);
});
```

## Variants and caveats

* Inside a form interface, a set of radio buttons would be more appropriate than a tablist for choosing between panels of input options. Generally, only form elements are expected by users inside forms.
* Where there are only two tabs to choose from, allowing both tabs to be focusable by the user may be preferable since it is a more common interaction behavior and there is less need to give a 'bypass' ability to reduce tab stops.
* Do not use tab interfaces for your site's page navigation and, accordingly, do not make your site's page navigation _look_ like a set of tabs. ARIA tab interfaces are for choosing content _within_ a page. The focus behavior is — for one thing — quite different for loading whole pages.
* Testing may reveal that the arrow navigation paradigm is not obvious to some users. It may be beneficial to provide a hint in the form of a description, or to make the tabs focusable. This is possible by setting `tabsFocusable` to `true` in the demonstration's options object argument.
