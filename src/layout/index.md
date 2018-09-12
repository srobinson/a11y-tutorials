# Accessible grid

## Semantic HTML

Necessarily, a grid is composed of individual grid _items_ that together form a set, or group. Sometimes the items should be perceived as related, and in other cases they are only grouped together in order to achieve a visual layout. 

A sighted user is typically afforded visual cues that two or more adjacent grid items belong to a set, such as a disparity in style and layout. A blind user instead has to rely on the semantics, or lack thereof, communicated by their screen reader software.

Should grid items represent arbitrary containers, solely used to place items in a grid formation, the `<div>` element can be used.

```html
<div class="gel-layout">
    <div class="gel-layout__item gel-1/2">One item</div>
    <div class="gel-layout__item gel-1/2">Another unrelated item to the right</div>
</div>
```

The `<div>` element is not represented in the [browser accessibility tree](https://developer.paciellogroup.com/blog/2015/01/the-browser-accessibility-tree/) and therefore presents the user with no undue or unexpected semantic information. Only the contents of the items, where semantic HTML is provided, will be interpreted.

In some cases, the items will have independent semantics to express. In which case, use the appropriate semantic elements for the grid items. In the following example, a tangentially related `<main>` and `<aside>` form a wider content column and a narrower sidebar.

```html
<div class="gel-layout">
    <main class="gel-layout__item gel-2/3">Content</main>
    <aside class="gel-layout__item gel-1/3">Sidebar</aside>
</div>
```

### Grids as lists

If items belong thematically to a set, the standard is to mark them up as a list. Doing so fulfills [WCAG 1.3.1 Info and Relationships](https://www.w3.org/TR/WCAG20/#content-structure-separation). Lists are identified by assistive technologies, and their items are enumerated. Many screen readers also provide shortcuts to traverse list items, such as [the <kbd>i</kbd> key in NVDA](https://webaim.org/resources/shortcuts/nvda).

A grid of scheduled programmes can be considered a thematic set, because each item is of the class 'programme'.

```html
<ul class="gel-layout">
    <li class="gel-layout__item gel-1/4">Doctor Who</li>
    <li class="gel-layout__item gel-1/4">Miranda</li>
    <li class="gel-layout__item gel-1/4">Holby City</li>
    <li class="gel-layout__item gel-1/4">Springwatch</li>
</ul>
```

Lists that contain children that are not list items are invalid, and liable to cause inconsistent output in browsers. Such parsing issues are considered a failure under [WCAG 4.1.1 Parsing](https://www.w3.org/TR/WCAG20/#ensure-compat).

The correct way to incorporate row wrappers into a list is, therefore, to use WAI-ARIA:

```html
<div role="list">
    <div role="presentation" class="gel-layout">
        <div role="listitem" class="gel-layout__item gel-1/4">Doctor Who</div>
        <div role="listitem" class="gel-layout__item gel-1/4">Miranda</div>
        <div role="listitem" class="gel-layout__item gel-1/4">Holby City</div>
        <div role="listitem" class="gel-layout__item gel-1/4">Springwatch</div>
    </div>
    <div role="presentation" class="gel-layout">
        <div role="listitem" class="gel-layout__item gel-1/4">Dragon's Den</div>
        <div role="listitem" class="gel-layout__item gel-1/4">Blue Peter</div>
        <div role="listitem" class="gel-layout__item gel-1/4">Daily Politics</div>
        <div role="listitem" class="gel-layout__item gel-1/4">Robot Wars</div>
    </div>
</div>
```

In the example, the grid is defined using `role="list"`. Children are explicitly removed from the accessibility tree using `role="presentation"`, and items are marked with `role="listitem"`. The outcome is that assistive technologies correctly report one list encapsulating eight list items.

### Headings

Headings, together with lists, create a perceivable structure non-visually, and provide navigational cues. A page should make liberal but appropriate use of headings, whether the layout is divided into a grid or exists as a single column of text.

It's quite legitimate to place headings within list items, and beneficial where they represent grid items that contain a lot of structured content. But be aware that a list represents a _flat_ hierarchical structure, so each principle item heading should be of the same level, to reflect this. This level is determined by the level of the heading that introduces the list itself.

```html
<h2>Upcoming programmes</h2>
<ul class="gel-layout">
    <li class="gel-layout__item gel-1/4">
        <h3>Doctor Who</h3>
        <p>[description]</p>
    </li>
    <li class="gel-layout__item gel-1/4">
        <h3>Miranda</h3>
        <p>[description]</p>
    </li>
    <li class="gel-layout__item gel-1/4">
        <h3>Holby City</h3>
        <p>[description]</p>
    </li>
</ul>
```

The nesting structure for the above example creates the following outline, with "Upcoming programmes" labelling a list of programme subsections.

* Upcoming programmes
    * Doctor Who
    * Miranda
    * Holby City

## Order

Since the [GEL grid system](https://github.com/bbc/gel-grid) uses Flexbox, it is possible to affect the layout order of the grid items using the `order` property.

```html
<style>
.promote {
    order: 1;
}
</style>

<div class="gel-layout">
    <div class="gel-layout__item gel-1/3">First item</div>
    <div class="gel-layout__item gel-1/3 promote">Second</div>
    <div class="gel-layout__item gel-1/3">Third</div>
</div>
```

In this example, the `class="promote"` item is "promoted" from the second position to the first. This creates problems for blind, partially sighted, and keyboard users. 

* **Blind users:** The markup consumed by the user's screen reader remains in the original order, meaning there is a disparity between their and a sighted user's experience
* **Partially sighted users:** If the user is running a screen reader, there is a disparity between the visual order they can partially perceive, and the order that content is announced by the screen reader. This can cause a failure under [WCAG 1.3.2 Meaningful Sequence](https://www.w3.org/TR/WCAG20/#content-structure-separation-sequence)
* **Keyboard users:** Any interactive/focusable elements will receive focus in an order that contradicts the order in which they appear. This is a failure according to [WCAG 2.4.3 Focus Order](https://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-order).
 
For these reasons, in most cases a different visual order should be achieved by editing the source order—not by employing the `order` property.

## RTL languages

Flexbox intrinsically supports `direction` by reversing the order of grid items where `dir="ltr"` is switched to `dir="rtl"`, or the CSS property `direction` is switched between `ltr` and `rtl`. 

Since switching to a RTL `lang` does not automatically change the direction, you will have to explicitly reverse your grid's order in your CSS. In the following example, `my-grid` switches the direction of its items in a page set to Arabic.

```css
:lang(ar) .my-grid {
    direction: rtl;
}
```

Depending on the content of the grid items, and their relationship to one another, it may not be necessary or suitable to switch the direction of the grid, even in a RTL language context.

## Tables

Data tables are read from top to bottom and left to right, with headers along the top and (sometimes) down the left hand side. It is imperative the visual structure matches the semantic structure in all viewports: table elements must not be allowed to wrap and find themselves falling under different headers.

The [GEL grid system](https://github.com/bbc/gel-grid) is not applicable to data tables, which should be marked up using `<table>`, `<th>` (table header) and `<td>` elements, eliciting the basic, desired layout via user agent styling.

Since wrapping is not permissible, creating a responsive table is a matter of letting the user scroll the table horizontally. To enable this accessibly, you need to:

1. Wrap the table in an element with `overflow-x: auto`
2. Make this element focusable with `tabindex="0"`, so it can be scrolled using the keyboard
3. Label this focusable element for screen reader users, preferably using a table caption

[Inclusive components: Data tables](https://inclusive-components.design/data-tables/) has an example. Note the `group` role, which elicits the announcement of the role along with the element's associated label.

```html
<div class="table-container" tabindex="0" role="group" aria-labelledby="caption">  
  <table>
    <caption id="caption">Grindcore bands</caption>
    <!-- table content -->
  </table>
</div>
```

## Magnification

Some users will magnify their web pages using add-on software, like [ZoomText](https://www.zoomtext.com/products/zoomtext-magnifierreader/). Others will use 'full-page zoom', as initiated by pressing <kbd>Cmd</kbd> (or <kbd>Ctrl</kbd>) and <kbd>+</kbd>.

Full-page zoom triggers breakpoints in the same way that physically narrowing or widening the viewport does, meaning responsive interfaces support magnification, and the visually impaired. You just need to ensure that content _within_ grid items is responsive too. That means:

* Avoiding fixed widths, set with `width`, so that grid content does not overflow
* Avoiding fixed heights, set with `height`, that would cause wrapped content to overlap
* Avoiding `white-space: nowrap`, which prevents text from wrapping