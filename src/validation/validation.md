# Accessible Form Validation

The following is intended to be read alongside the BBC resources on accessible forms. For a primer on accessible form design, please read the following:

* [Labelling form controls](http://www.bbc.co.uk/guidelines/futuremedia/accessibility/mobile/forms/labelling-form-controls)
* [Form inputs](http://www.bbc.co.uk/guidelines/futuremedia/accessibility/mobile/forms/form-inputs)
* [Form layout](http://www.bbc.co.uk/guidelines/futuremedia/accessibility/mobile/forms/form-layout)

The form validation implementation to come is

* Written with plain CSS and ES5 Javascript (_no build process assumed_)
* Lacking any dependencies (_for maximum portability and minimum payload_)
* A client-side implementation that can be used in combination with server-side validation

## Semantics

### Initial HTML

The validation script is designed to work with well-formed and accessible HTML. The following form is used for the [validation demo provided](assets/demo1.html). There are notes to follow.

```html
<form>
  <div>
    <label for="userName">Username</label>
    <input id="userName" name="userName" aria-required="true">
  </div>
  <div>
    <label for="email">Email</label>
    <input id="email" name="email" type="email" required>
  </div>
  <div>
    <label for="discountCode">
      Discount code
      <small>(The 5 digit number you received by email)</small>
    </label>
    <input id="discountCode" name="discountCode" type="number">
  </div>
  <div>
    <button type="submit">Submit</button>
  </div>
</form>
```

<table>
  <caption>Basic form semantics</caption>
  <tr>
    <th scope="row">
      <code>for</code> and <code>id</code>
    </th>
    <td>
      Any input needs to be associated programmatically with a label. This is achieved by making the label's <code>for</code> attribute and the input's <code>id</code> attribute share the same value. Note that, for text inputs, the <code>id</code> and <code>name</code> values are conventionally the same. However, associated <code>radio</code> inputs <em>share</em> a <code>name</code> attribute to make them a set.
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>&lt;small></code> description
    </th>
    <td>
      Some inputs, like the example discount code input may benefit from additional direction, to help users avoid errors or know where to find the information they need to submit. The description must go <em>inside</em> the label element so that it becomes part of the associated label. In this case, it is demarcated with parentheses. SOme screen reader users will hear something similar to <em>"open parenthesis, the five digit number you received by email, close parenthesis"</em>.
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>&lt;small></code> description
    </th>
    <td>
      Wherever suitable, we make use of the HTML5 input types. For example, by using <code>type="number"</code>, the user experience is improved for users of certain browsers and devices. They may find they are prohibited from typing letters — making it harder to mess up the input format — or that their phone presents them with the numeric keypad by default.
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>required</code> and <code>aria-required</code>
    </th>
    <td>
      Note that the demo, quite inconsistently, uses <code>required</code> on one input and <code>aria-required</code> on another. Because <code>aria-required="true"</code> is better and more consistently supported by assistive technologies, the [demonstration](#demonstration) script forces its use by applying it wherever <code>required</code> is found, during initialization. Beware that WAI-ARIA properties and states like <code>aria-required</code> need an explicit value of <code>true</code> or <code>false</code>, unlike <code>required</code> and similar.
    </td>
  </tr>
</table>

### Enhanced HTML

The [demonstration](#demonstration) script is initialized with a "rules" object. This identifies which fields need to be validated (and how) by their `name`s. For the demo, it looks like this:

```js
var rules = [
  {
    name: 'userName',
    tests: [
      {
        error: function(val) { return val.trim().indexOf(' ') > -1 },
        message: 'No spaces allowed'
      },
      {
        error: function(val) { return val.trim() === 'Heydon' },
        message: 'This username is already taken by another user'
      }
    ]
  },
  {
    name: 'email',
    tests: [
      {
        error: function(val) { return val.indexOf('@') === -1 },
        message: 'Please supply a valid email address'
      }
    ]
  },
  {
    name: 'discountCode',
    tests: [
      {
        error: function(val) { return val.length !== 5 },
        message: 'The discount code must be five digits'
      }
    ]
  }
];
```

After initialization, the demo form is enhanced to look like this:

```html
<form novalidate>
  <div>
    <label for="userName">Username</label>
    <input id="userName" name="userName" required="" aria-describedby="userName-error" aria-required="true">
    <div id="userName-error" class="field-error"></div>
  </div>
  <div>
    <label for="email">Email</label>
    <input id="email" name="email" type="email" required aria-describedby="email-error" aria-required="true">
    <div id="email-error" class="field-error"></div>
  </div>
  <div>
    <label for="discountCode">
      Discount code
      <small>(The 5 digit number you received by email)</small>
    </label>
    <input id="discountCode" name="discountCode" type="number" aria-describedby="discountCode-error">
    <div id="discountCode-error" class="field-error"></div>
  </div>
  <div>
    <div aria-live="assertive" class="form-warn"></div>
    <button type="submit">Submit</button>
  </div>
</form>
```

<table>
  <caption>Enhanced form structure</caption>
  <tr>
    <th scope="row">
      <code>novalidate</code>
    </th>
    <td>
      We want the form to validate, but on our terms. The <code>novalidate</code> attribute (on the <code>&lt;form></code> element) ensures that native HTML5 validation — which is inconsistently implemented, especially in terms of assistive technology compatibility — is suppressed.
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>.field-error</code> elements and <code>aria-describedby</code>
    </th>
    <td>
      Accessible descriptions complement accessible labels where they are appropriate. Here, we are using the accessible description to provide an error message to each invalid field. The <code>aria-describedby</code> attribute associates the message to the field. Conventionally, the description / error message will be read after all of the other information (label, type, value, state) the field offers. These elements are empty at the outset, and therefore do not provide a description.
    </td>
  </tr>
  <tr>
    <th scope="row">
      <code>aria-live="assertive"</code>
    </th>
    <td>
      <p>As we shall explore, each field is validated as the user types (subject to debouncing). However, it's still possible for the user to reach the submit button and press it with invalid data still present. We will not be trapping users' focus within fields until they are valid, because that violates [WCAG 2.1.2 No Keyboard Trap](https://www.w3.org/TR/UNDERSTANDING-WCAG20/keyboard-operation-trapping.html).</p>
      <p>Instead, we use a message that doubles as a live region, to warn users that the form is still not valid upon attempted submission. The advantage of a live region is that the screen reader user hears the warning without their focus being unexpectedly moved. This message is placed directly above the submit button so that it is visible to sighted users without the necessity of scrolling. Users who have zoomed the page would have been worst affected by this general error message appearing above the form.</p>
    </td>
  </tr>  
</table>

## Interaction

### Field validation

When the user is focused on a field, validation for that field occurs as the user types, based on the `keyup` event.

* On `keyup`, is the field required, but empty?
    * **Yes:** Apply `aria-invalid="true"` to the input and populate the error message element with a generic "field is required" message. Skip further validation.
    * **No:** Move on to specific formatting validation, as described in the rules object (see below).
* On `keyup`, is the field invalid?
    * **Yes:** Apply `aria-invalid="true"` to the input and populate the error message element with the first of the applicable error messages from the rules object.
    * **No:** Remove the `aria-invalid` attribute, and empty the error message element.


Debouncing is employed so that the described logic is only run when the (reasonably fast typing) user pauses from typing. This makes validation more performant, less aggressive, and reduces noise in screen reader output.

```js
var debounced;
field.addEventListener('keyup', function(e) {
  var key = e.which || e.keyCode;
  // Don't run on the Tab and Shift keys
  if (key !== 9 && key !== 16) {
    window.clearTimeout(debounced);
    debounced = setTimeout(function() {
      validate(field);
    }, settings.debounce);
  }
});
```

Note that validation is not run on `keyup` events for the <kbd>Tab</kbd> and <kbd>Shift</kbd> keys, since these keys are used to move focus between fields. A user _may_ press the <kbd>Shift</kbd> during input (for capitalization) but this is unlikely to be detrimental. Input that should be lowercase can be made lowercase before validation and, where capitalization _is_ pertinent, validation can be performed on subsequent strokes or after attempted submission.

#### Screen reader behavior

Let's compare the normal/initial and invalid states for one field:

```html
<!-- normal/initial -->
<div>
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required aria-describedby="email-error" aria-required="true">
  <div id="email-error" class="field-error"></div>
</div>

<!-- invalid -->
<div>
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required aria-describedby="email-error" aria-required="true" aria-invalid="true">
  <div id="email-error" class="field-error"><strong>Error:</strong> Please supply a valid email address</div>
</div>
```

Screen readers typically identify any fields that either have `aria-invalid="true"`, or `aria-required="true"` but are empty, as "invalid" or "invalid data". When `aria-invalid="true"` is applied to the focused field, most screen readers will (re)announce the field, including it's newly invalid state and newly populated error message (associated to the field with `aria-describedby`).

### Submission

The [demonstration](#demonstration) script keeps track of errors by populating an `allErrors` array. If, at the time of submission, this array is not empty (i.e. errors have occurred), the general error message live region is populated (triggering announcement in screen readers) and becomes visible.

```html
<div aria-live="assertive" class="form-warn">
  <strong>Error:</strong> Oops! Oops! Your form has some errors that need fixing
</div>
```

After the general error message has been triggered, the user is expected to go back and fix each invalid field. When the last of the invalid fields is corrected (and `allErrors` becomes empty again) the general message is removed.

## Visual design

### Input design

Despite certain visual styles that have been adopted previously, it is recommended that a conventional input design, with the label above the input at all times and boxed input shape (with a border on all sides) is adopted. This shape makes it easy to see where input is expected. Unconventional design produces cognitive challenges. Where animated 'floating' labels are adopted, confusion is likely to be exacerbated. It also means the ability to use the `placeholder` attribute conventionally (to provide a hint to the suggested input format) is no longer possible.

### Focus styles

The important thing is that there _are_ focus styles. A `box-shadow` style is recommended, since it will hug the curved corners of the input and button shapes.

```css
input:focus, button:focus {
  outline: none;
  box-shadow: 0 0 0 0.125rem CornflowerBlue;
}
```

### Color independence

For easier cognition, especially for color blind users not able to see the red error coloration, the text prefix "Error" is supplied to errors. This could be replaced with an icon signifying 'error', but the text "error" should remain (possibly visually hidden) for screen reader users.

The [demonstration](#demonstration) script includes an options object with a `prefix` property. An SVG could be supplied alongside a visually hidden `<span>`:

```js
prefix: '<svg width="20" height="20" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40"/><line x1="50" y1="28" x2="50" y2="50"/><circle cx="50" cy="70" r="2"/></svg><span class="visually-hidden">Error:</span>';
```

The `visually-hidden` class uses a specific set of properties to ensure the span is not visible (or takes up layout) but is announced in screen reader software.

```css
.visually-hidden {
  clip-path: inset(100%);
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
```
