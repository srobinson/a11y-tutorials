# Accessible web pages

In modern web development it is customary to organize your best practices around individual components, or modules: discrete pockets of functionality such as accordions, cards, or tab interfaces.

However, certain accessibility provisions pertain to the outer web page, or document. The way your components are ordered and interrelate within that document is also important.

Here, we'll cover the fundamentals of accessible web pages.

## The title

Labels are critical to accessible web interfaces. Buttons, links, and form elements must all have descriptive labels that are parsable by assistive technologies. Headings are labels for sections of content, and the `<head>`'s `<title>` allows you to label the document itself.

Upon page load a screen reader will announce the `<title>`, and you should make the most of this opportunity to describe the page in context of the site. Since users will likely have tabs from different sites open simultaneously, it's important they're aware which "Home" or "Search results" belongs to which site.

A typical structure is as follows.

```html
<title>[Label for page] - [Name for site]</title>
```

In single-page applications there is only one page and, therefore, only one `<title>` element. Accordingly, as users traverse 'routes' and load synthetic pages, you will need to update the `<title>`'s text node. This is achievable via `document.title`

```js
document.title = 'UK Politics - BBC News';
```

## Heading structure

The principle `<h1>` heading shares responsibility with the `<title>` in describing (naming) the page. There should, therefore, only be one `<h1>` per page, and its text is most effective as a subset of the `<title>`. Typically, the `<h1>` should be the `<title>` minus the site name (see above).

Example:

```html
<title>UK Politics - BBC News</title>
...
<h1>UK Politics</h1>
```

The heading level (h1—h6) for any other section of the page should be chosen in terms of belonging. That is, if the heading labels a child subsection of the page, then `<h2>` is appropriate. If the heading labels a subsection _of_ a subsection, then the level should be one higher than the parent.

- UK Politics (h1)
  - Top stories (h2)
    - Bid to get Labour to change Brexit stance (h3)
    - Ban on electric shock collars for pets (h3)

As in the above example, sibling/equivalent sections should have the same heading level. In cases where one subsection is considered more important than another, it is _not_ appropriate to change the heading level to elicit a larger heading for size (for example). This makes a nonsense of the document structure for screen
reader users. Instead, use one of the following techniques:

- Promote the item so it appears first in the order (a 'sticky post' in blogging terms)
- Include the text 'featured' or similar as part of the heading on in close proximity to it

In addition, you may use a styling technique that doesn't affect the semantics of the element to increase the `font-size`. HTML classes have no impact on how screen readers interpret the element. A common technique is to style headings by their element types as a default, and provide classes to amend styles where necessary:

```css
h1,
.h1 {
  font-size: 2.5rem;
}
h2,
.h2 {
  font-size: 2rem;
}
h3,
.h3 {
  font-size: 1.5rem;
}
/* etc */
```

Headings are one of the most important provisions for screen reader usability, since they help break the page into manageable and navigable chunks. Screen reader users can navigate between headings, and therefore sections, using shortcut keys. In NVDA and JAWS, the <kbd>2</kbd> key will take you to the next `<h2>` heading, and <kbd>Shift</kbd> + <kbd>2</kbd> will take you to the previous one.

Be aware that many screen readers aggregate headings into tables of content. It is therefore important that each heading's text makes sense and is descriptive without the assistance of surrounding content. For example, _"Ban on electric shock collars for pets"_ is preferable to _"Product ban"_ or _"Good news for pets"_.

## Landmarks

Landmarks describe the principle areas of the page. They are the continents to sections' countries. While headings describe sections, landmark elements describe landmarks. They can be applied with HTML5 or ARIA:

- `<header>` or `role="banner"` → page header, found at the top of the page (one per page)
- `<footer>` or `role="contentinfo"` → page footer, found at the bottom of the page (one per page)
- `<nav>` or `role="navigation"` → set of navigation links, typically found in or near the `<header>`
- `<aside>` or `role="complementary"` → supplementary content, either adjacent to `<main>` or as interludes within the content of `<main>`
- `<main>` or `role="main"` → contains the page's main content (one per page)

As indicated, some landmarks are expected to be included just once per page. Others, like `<nav>` and `<aside>` may be used multiple times. However, each `<nav>` or `<aside>` within the page should have a unique purpose and content. For example, you could include a `<nav>` for navigating around the site and another for navigating between sections of the current page. These should be distinguished by label.

```html
<nav aria-labelledby="site-nav-heading">
  <h2 id="site-nav-heading">Site</h2>
  <!-- list of links -->
</nav>
...
<nav aria-labelledby="page-nav-heading">
  <h2 id="page-nav-heading">This page</h2>
  <!-- list of links -->
</nav>
```

**Note:** You can hide the headings for these `<nav>`s if you wish. The `display: none` declaration is applicable in this case, because the association via `aria-labelledby` preserves announcement despite `display: none` typically removing elements from screen reader output.

With the exception of `<main>`, landmarks used across multiple pages (such as the site navigation landmark, above) must be placed consistently and contain consistent content. It is not recommended that the 'current' page is removed from a list of `<nav>` links, since this is helpful for context when wayfinding. You can mark the current page with `aria-current="page"` and use an attribute selector for styling.

```css
[aria-current='page'] {
  text-decoration: underline; /* for example */
}
```

Ensure that all content exists within one landmark or another. Any 'orphaned' content can be missed when a screen reader user is navigating by landmark.

## Skip links

It is recommended the `<header>` landmark and navigation come before the `<main>` content. This way, it's easy for users to get around the site. This does present a problem, though: keyboard users are faced with a number of links to <kbd>Tab</kbd> through to reach the main content of the page.

The traditional remedy is to provide a 'skip link' that lets users bypass the header and move directly into the page's unique content. Here's how this is typically marked up:

```html
<!-- skip link (first interactive element on the page) -->
<a href="#main">Skip to content</a>

<!-- skip link target -->
<main id="main" tabindex="-1">
...
</main>
```

Note the use of `tabindex="-1"`. This forces browsers to move focus into `<main>` when users activate the link. Without it, some browsers leave focus at the point of origin. This will elicit a `:focus` style, which can be removed for focus targets that use `tabindex="-1"` and are, therefore, not focusable by the user with the <kbd>Tab</kbd> key.

```css
[tabindex='-1']:focus {
  outline: none;
}
```

Skip links can appear by default or — since they are intended for keyboard users primarily — be made invisible until the user focuses them. The CSS would look something like the following, using positioning to move the link in and out of view.

```css
[href='#main'] {
  position: absolute;
  top: -2rem;
}

[href='#main']:focus {
  top: 0;
}
```

Do not use `display: none` to hide the skip link, because then it will be unable to receive focus and never appear to the user.

## The page language

Internationalization is an important aspect of inclusive design, especially since most of the web is accessible by anyone, from anywhere around the world.

By declaring a default language for the page, you help translation engines like Google Translate convert the content for audiences of different first languages. In addition, it tells screen readers which synthetic voice profile to use. Were a screen reader to read French text with a Dutch voice profile (for example) the words would be garbled.

Applying a default language is simple. Here is an British English example. Just "`en`" would probably suffice, in fact.

```html
<html lang="en-GB">
```

If your page in mostly in English but has sections in different languages, you can switch into the relevant language on a case-by-case basis. For instance, if you were to quote Magritte, you can do this:

```html
<p>The artist Magritte famously said:</p>
<blockquote lang="fr">
  <p>Ceci n'est pas une pipe</p>
</blockquote>
```

Sometimes, you will want to switch to a preferred font for the language — because that font has better support for the language's character set. For example, you can provide a preferred font for Arabic text:

```css
[lang='ar'] {
  font-family: Neue Helvetica Arabic, serif;
}
```

## The viewport meta tag

The [viewport meta tag](https://css-tricks.com/snippets/html/responsive-meta-tag/) is one of the corner stones of responsive web design, since it tells devices to display content appropriate to the device's vieport dimensions. Without `width=device-width`, pages tend to 'zoom out', meaning content becomes unreadably small by default.

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

While a default scale is important, it's also imperative you allow the user to zoom the content in and out at their discretion. This helps sight impaired users read but can also be used to enlarge interactive controls, making operation easier for those with unsteady hands. You simply need to omit the value `user-scalable=no`.

## A note on simplicity

A well-structured web page, including all the provisions covered here, will perform better than one lacking in structural rigor. But even pages that are structurally sound will challenge readers and users where the sheer amount of information present is too large. 

Commit to making concise and incisive content, and web pages that focus as much as possible on single subjects. Remove as many tangential and extraneous features, components, sections, and controls as possible. Simple interfaces benefit everyone.