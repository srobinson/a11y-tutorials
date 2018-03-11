# Building Accessible Forms: Getting Started

**Attention**: This tutorial is a *work-in-progress draft*. We believe in developing in the open as strongly as we believe you should not reference or link to this document in its current form.

In this tutorial we walk through a variety of examples of forms that follow the BBC GEL and BBC Accessibility Guidelines.

## Our Old Workhorse, the Form

The humble web form has been quietly toiling away on our web pages for nearly as long as there has been a Web. In fact, forms are so common that we might even be forgiven for taking them for granted, but that would be a mistake. The interactive power that forms unlock: to register and respond, to question and query, can make a huge difference to our users. And for users with disabilities, forms can be even more important, opening up services and utilities that would otherwise be inaccessible.

With such a long history, not to mention near-universal browser support, it should be a straightforward job to deliver accessible web forms, but it is surprisingly easy to go off track with forms. Let's look at some ways we can keep forms working for everyone.

## Start With Standards

Most accessibility problems can be avoided from the start by applying a few fundamental rules from HTML standards. First among these is that input controls must be properly labelled.

### Love Your Labels

As a form creator, you obviously want the user to provide you with complete and valid information; labels can go a long way to making that happen.

The HTML `label` element should generally be your starting point when asking the user for input. This one tag will provide a wide array of built-in usability and accessibility features to your form, automatically and for free.

> "All form controls, such as text inputs, check boxes, select lists, or buttons, must each have a unique label." -- [BBC MAG: Labelling form controls](http://www.bbc.co.uk/guidelines/futuremedia/accessibility/mobile/forms/labelling-form-controls)

### A Simple Example
 
```
<label \!for="username"\!>User Name</label>
<input type="text" \!id="username"\! name="username">
```
Fig: Use the `for` attribute to associate a label with its input control.

The [HTML Specification for labels](https://html.spec.whatwg.org/multipage/forms.html#the-label-element) provides us with a list of all the types of elements that can have labels, the so-called "labelable elements". The most common labelable elements are shown below:

* button
* input (if type is not "hidden")
* select
* textarea

### More Label Examples

```html
<label for="rating">Rating (between 1 and 5):</label>
<input type="range" min="1" max="5" value="3" id="rating" name="rating">
```
Fig: You can use labels for a range of input controls, including the `range` control!

---

```html
<fieldset>
  <legend>Will you be attending?</legend>
  
  <input name="attending" type="radio" id="attending_yes" value="yes">
  <label for="attending_yes">Yes, I plan to attend</label>
  
  <input name="attending" type="radio" id="attending_no" value="no">
  <label for="attending_no">No, I will not attend</label>
</fieldset>
```
Fig: You can group related input controls, along with their unique labels, together under a shared `legend`.[^mag-formgroup]

### Invisible Labels

If labels are so useful, is there ever a case where you might want to hide them? Consider a fairly common case where a form is made up of only a single text input box and a button labelled "Search". In this case displaying the label "Search term" before the input box would be redundant, the information being requested is already made obvious by the text shown on the button.

```html
<form>
  <label class="visuallyhidden" for="search_term">Search Term</label>
  <input type="text" id="search_term" name="search_term">
  <input type="submit" value="Search">
</form>
```
Fig: Making the label vissually hidden makes sense in certain cases.

Be careful not to take this technique too far however. For example, it would technically be possible to omit the submit button in the example above, relying on users to type <kbd>Enter</kbd> to submit the query, but doing so would also eliminate the only indication of what is expected to be entered in the input box.

### Non-text Labels

Some designs rely heavily on images and icons instead of text to communicate meaning; this is particularly true where the available screen-space is limited. However, this presents an obvious difficulty for low-vision and blind users.

## ARIA

The standard `label` element should always be preferred but there are edge cases where just a simple label might not be sufficient. In cases where visually-impaired user might not get sufficient context from the label alone, adding ARIA can be helpful.



### Multiple labels for input

In complex layouts, there may be several peices of information visible that combine to give the user information about a form input. For example, imagine a form input that is described by both a table column heading and a table row heading. While the meaning may be clear to a sighted user

```html
<h3 id="sender">Sender</h3>

<div>
    <label id="sender-name-lbl" for="sender-name">Full Name</label>
    <input id="sender-name" name="sender-name" type="text" \!aria-labelledby="sender sender-name-lbl"\!>
</div>
<div>
    <label id="sender-email-lbl" for="sender-email">Email</label>
    <input id="sender-email" name="sender-email" type="text" aria-labelledby="sender sender-email-lbl">
</div>

<h3 id="recipient">Recipient</h3>

<div>
    <label id="recipient-name-lbl" for="recipient-name">Full Name</label>
    <input id="recipient-name" name="recipient-name" type="text" \!aria-labelledby="recipient recipient-name-lbl"\!>
</div>
<div>
    <label id="recipient-email-lbl" for="recipient-email">Email</label>
    <input id="recipient" name="recipient" type="email" aria-labelledby="recipient recipient-email-lbl">
</div>
```
Fig: An exmple of using ARIA to associate multiple elements to label a single input field.

Note that if a control has both an associated `<label>` and an `aria-labelledby` attribute, the referenced `aria-labelledby` text will take precedence and be read out instead of the `<label>`.

## Be Clear, Be Concise

> "Keep labels and legends succinct to minimise verbosity." -- [BBC Mobile Accessibility Guidelines: Grouping form elements](http://www.bbc.co.uk/guidelines/futuremedia/accessibility/mobile/forms/grouping-form-elements)

Having clear and concise labels is helpful to everyone but it can be especially helpful to users with reading or comprehension difficulties. Finding the most effective wording is a job that can require careful consideration as well as user testing.

```html
Not enough information?
<label for="username">Name</label>

Too much information?
<label for="username">Type your user's name from your account in the box here</label>
```
Fig: Consider the wording of labels to maximise clarity.

## Don't Surprise

You won't get famous for avant-garde page layouts by using the familiar and expected arrangement of label and input control, but you will lighten your user's cognitive-decoding work considerably by being a bit boring. The [research into the subject of form readability](https://research.googleblog.com/2014/07/simple-is-better-making-your-web-forms.html) suggests that simple top-down scanning should be encouraged: Keep the label immediately adjacent to, and preferrably just above, its related input control.

You want the user to complete your form fully and accurately, so make it easy for them to understand.

## AutoComplete and AutoSuggest

To the extent that enhancements like autoComplete and autoSuggest can be helpful to most users, it's important that these features don't add an unwelcome obstacle to users with disabilities.

## Custom Controls

### Hidden labels / hidden controls

### Inputs Without Forms?

## Validation

### Error messages

### A note about colour and error indicators

## Complex and Multi-Page Forms

## CAPTCHA	

## Notes

[^mag-formgroup]: See [BBC Mobile Accessibility Guidelines: Grouping form elements](http://www.bbc.co.uk/guidelines/futuremedia/accessibility/mobile/forms/grouping-form-elements)								
