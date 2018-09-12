# Accessible Form Fields

This guide sets out the accessible implementation of form fields, covering text inputs, radio buttons, checkboxes, and `<select>` elements. For further guidance specific to mobile/native applications, please consult the [BBC Mobile Accessibility Guidelines](http://www.bbc.co.uk/guidelines/futuremedia/accessibility/mobile/forms/labelling-form-controls). For field validation advice, see [Accessible Form Validation](/validation).

## Native form elements

The most efficient and robust way to implement accessible form fields is to use the native `<input>`, `<textarea>`, and `<select>` elements. These elements have predefined and expected behaviors, and automatically communicate their roles, values, and states to assistive technologies.

It is _possible_ to emulate native form element behavior with WAI-ARIA attribution and JavaScript, but it
is rarely a good idea. Implementations tend towards complexity, and are necessarily more likely
to break because they depend on JavaScript in order to function.

```html
<!-- native -->
<input type="checkbox">

<!-- WAI-ARIA (requiring JavaScript to switch the checked state) -->
<div role="checkbox" aria-checked="false" tabindex="0"></div>
```

It is also not possible to access and serialize non-native form elements using methods like `FormData()` because the elements cannot be identified to their parent form (they do not support the `name` attribute/property).

```js
var form = document.querySelector('form');
var data = new FormData(form); // Would be empty
```

### Input types

Where specialist HTML5 input types are well supported, it is advised they are used in place of the generic (and default) `type="text"`. The `number` `type`, for example, helpfully restricts input to numerals, allows incrementation—typically by providing up and down buttons—and elicits the display of a numerical virtual keyboard.

### Visual design

It's imperative form elements are easily recognizable, so the authored visual design should not stray far from operating system and user agent conventions.

- Radio buttons should be round
- Checkboxes should be square
- Select elements should include a downwards pointing arrow
- Text fields should appear as a bordered box

Styling some form elements directly is difficult, but you can 'defer' styles from a visually hidden input to a proxy element. Consider the following markup:

```html
<label>
  <input type="checkbox" class="visually-hidden">
  <span class="fake-checkbox">
    <span class="fake-check" aria-hidden="true">✓</span>
  </span>
  <span class="text">The label</span>
</label>
```

We can style the `fake-checkbox` element's `:focus` and `:checked` states, like so:

```css
.fake-check {
  display: none; /* hide to begin with */
}

[type="checkbox"]:focus + .fake-checkbox {
  box-shadow: 0 0 0 0.125rem blue;
}

[type="checkbox"]:checked + .fake-checkbox .fake-check {
  display: inline-block;
}
```

**Note:** A unicode point (as in the example) can be used, but should be hidden using `aria-hidden="true"` so that the value is not interpreted in screen readers. A custom SVG would be preferable. Do not use a `background-image` because it is liable to be eliminated in high contrast themes.

## Labels

All controls within a web application need labels to identify them. Typically, `<button>`s and links are labeled by their text content. Form elements are conventionally labeled _by association_ to a `<label>` element. This associative relationship is created by making the form element's `id` and the `<label>`'s `for` attribute share the same value. In the following example, the shared value is `dog`.

```html
<label for="dog">Your dog's name</label>
<input type="text" id="dog" name="dog">
```

In this example, a screen reader user would hear _"Your dog's name, text input"_ (or similar) upon focusing the `<input>`. Since screen reader users tend to traverse forms by focus, from field to field, it is only by associating the label to the field directly that they would hear the label text. An unassociated label would simply be 'skipped over'.

**Note:** It is a common misconception that the `name` attribute is used in label calculation. Although it often takes the same value as the `id`, it is only the `id` that associates the label to the input.

### Group labels

Sometimes multiple form elements should be grouped together under a common label. The standard method for creating such a group is with the `<fieldset>` and `<legend>` elements. The `<legend>` must be the first child inside the `<fieldset>`.

```html
<fieldset>
  <legend>Group label</legend>
  <!-- individually labeled elements -->
</fieldset>
```

This is most important when providing radio button controls: a group of radio buttons, sharing a common `name` attribute, constitute a _single_ form field and the `<legend>` labels this field.

```html
<fieldset>
  <legend>Your favorite pet</legend>
  <label>
    <input type="radio" name="favorite-pet">
    Cat
  </label>
  <label>
    <input type="radio" name="favorite-pet">
    Dog
  </label>
  <label>
    <input type="radio" name="favorite-pet">
    Seahorse
  </label>
</fieldset>
```

Note the use of labels _wrapping_ inputs in the above example. Only when wrapping inputs in `<label>`s can you omit the `for` and `id` association. It is a common pattern for radios and checkboxes.

It's quite legitimate to place headings inside `<legend>`s. In fact, this helps to give your form a semantic structure (navigable by screen reader users) without having to create separate and redundant labels.

```html
<fieldset>
  <legend><h2>Group label</h2></legend>
  <!-- individually labeled elements -->
</fieldset>
```

The usual rules regarding heading levels and nesting apply. That is, if you were to include a nested fieldset, the heading level should reflect the parent/child structure.

```html
<fieldset>
  <legend><h2>Group label</h2></legend>
  <!-- individually labeled elements -->
  <fieldset>
    <legend><h3>Nested group label</h3></legend>
    <!-- individually labeled elements -->
  </fieldset>
</fieldset>
```

### Placeholders

The `placeholder` attribute should not supplant the `<label>` element as a primary label for the following reasons:

- Not all assistive technologies support placeholders
- Some users perceive inputs displaying placeholders as already completed
- When the placeholder is replaced with a value, no label is available for checking the value against the requirement
- The default text color for placeholders fails WCAG contrast requirements in many browsers

Use placeholders sparingly, and as intended, to provide hints. To help differentiate placeholder text from a real value, use an italic style and prefix the placeholder text with _"E.g."_ or similar.

### Descriptions

Where space permits—and the visual design should allow for this—use descriptions in place of placeholders. Descriptions can simply be part of the `<label>` and will therefore be part of accessible label calculation.

In the following example, the `<small>` element is used to demarcate the description visually. By default, it will display smaller text. You can place it on a new line by applying `display: block`. Note that `<label>` elements are inline level, so it is non-conforming to include block elements inside them.

```html
<label for="dog">
  Your dog's name
  <small>For example: 'Doggy McDog-Face'</small>
</label>
<input type="text" id="dog" name="dog">
```

### Invisible labels

It is strongly recommended that form fields have visible and persistent labels; labels that do not disappear upon focus or input.

However, in some specific circumstances an invisible but accessible label is acceptable. For example, a single input search form may have a submit button that reads "Search" — effectively providing a label for both the input and the button itself. In this case, you can hide the `<label>` visually, using a technique that keeps the label available to assistive technologies.

```html
<label for="search" class="visually-hidden">Your search term</label>
<input id="search">
<button type="submit">Search</button>
```

The `visually-hidden` utility class looks like the following. Incorrectly using `display: none` would hide the label _both_ visually and from assistive technologies.

```css
.visually-hidden {
  clip-path: inset(100%);
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  width: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
}
```

Invisible group labels can work in much the same way:

```html
<h2>Group label</h2>
<fieldset>
  <legend class="visually-hidden">Group label</legend>
  <!-- individually labeled elements -->
</fieldset>
```

In most circumstances group labels, like labels, should be visible. Hence, in the example, the group label is only hidden because a separate heading with the same information is already provided.

### Visual design

- Place labels _above_ form elements. This is especially important on mobile platforms because the invoked virtual keyboard has a habit of obscuring labels to the side or below inputs.
- As stated in the [BBC Mobile Accessibility Guidelines](http://www.bbc.co.uk/guidelines/futuremedia/accessibility/mobile/forms/form-layout), labels should be placed more closely to their associated form elements.
- Descriptions should appear below the principle label text, in a smaller font size
