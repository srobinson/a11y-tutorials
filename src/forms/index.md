# Building Accessible Forms: Getting Started

Notice: This tutorial is a *working draft*, do not reference or link to this document in its current form.

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
<label for="username">User Name</label>
<input type="text" id="username" name="username">
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
<input type="range" min="1" max="5" value="3" id="rating" name="username">
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

If labels are so useful, are there ever any cases where we might want to hide them? Consider a fairly common case where a form is made up of only a single text input box and a button labelled "Search". In this case displaying the label "Search term" before the input box would be redundant, the information being requested is already made obvious by the text shown on the button.

```html
<form>
  <label class="visuallyhidden" for="search_term">Search Term</label>
  <input type="text" id="search_term" name="search_term">
  <input type="submit" value="Search">
</form>
```
Fig: Making the label vissually hidden makes sense in certain cases.

Be careful not to take this technique too far however. For example, it would technically be possible to omit the submit button in the example above, relying on users to type <kbd>Enter</kbd> to submit the query, but doing so would also eliminate the only indication of what is expected to be entered in the input box.

## Be Clear, Be Concise

Having clear and concise labels is helpful to everyone, but it can be critical for users with reading or comprehension difficulties. Finding the most effective wording is a job that will require careful consideration as well as user testing.

```html
Not enough?
<label for="username">Name</label>

Too much?
<label for="username">Type your user's name from your account in the box here</label>
```
Fig: Consider the wording of labels to maximise clarity.

## Don't Confuse

## AutoComplete and AutoSuggest

## Custom Controls

### Inputs Without Forms?

## Validation

## Complex and Multi-Page Forms

## CAPTCHA	

## Notes

[^mag-formgroup]: See [BBC Mobile Accessibility Guidelines: Grouping form elements](http://www.bbc.co.uk/guidelines/futuremedia/accessibility/mobile/forms/grouping-form-elements)								
