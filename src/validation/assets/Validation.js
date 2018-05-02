// The validation constructor
function Validation(formElem, rules, options) {

	// Polyfill the `find` array method
	Array.prototype.find||Object.defineProperty(Array.prototype,'find',{value:function(r){if(null==this)throw new TypeError('"this" is null or not defined');var e=Object(this),t=e.length>>>0;if("function"!=typeof r)throw new TypeError('predicate must be a function');for(var n=arguments[1],i=0;i<t;){var o=e[i];if(r.call(n,o,i,e))return o;i++;}},configurable:!0,writable:!0});

	var settings = {
		warning: 'Oops! Your form has some errors that need fixing',
		debounce: 500
	};

	// Overwrite defaults where they are provided in options
	for (var setting in options) {
		if (options.hasOwnProperty(setting)) {
			settings[setting] = options[setting];
		}
	}

	// Turn off native browser validation
	formElem.setAttribute('novalidate', true);

	// Get submit button
	var submit = formElem.querySelector('[type="submit"]');

	// Create general message live region
	var warn = document.createElement('div');
	warn.setAttribute('aria-live', 'assertive');
	warn.classList.add('form-warn');
	submit.parentNode.insertBefore(warn, submit);

	// Initialize errors array for tracking
	var allErrors = [];

	// Function to add errors if they don;t already exists
	function saveError(name) {
		if (allErrors.indexOf(name) < 0) {
			allErrors.push(name);
		}
	}

	// Delete error
	function deleteError(name) {
		allErrors = allErrors.filter(function(f) {
			return f !== name;
		});
	}

	// Get all elements defined in rules object
	var fields = rules.map(function(rule) {
		return document.querySelector('[name="'+rule.name+'"]');
	});

	// Function to show or hide warning live region
	function showHideWarn() {
		var message = allErrors.length > 0 ? settings.warning : '';
		warn.textContent = message;
	}

	// Field validation function
	function validate(field) {
		// Get the error element
		var errorElem = document.querySelector('[id="'+field.name+'-error"]');

		// Validate for required first
		if (field.getAttribute('aria-required')) {
			if (field.value.trim() === '') {
				errorElem.textContent = 'This field is required';
				field.setAttribute('aria-invalid', 'true');
				saveError(field.name);
				return;
			} else {
				errorElem.textContent = '';
				field.removeAttribute('aria-invalid');
				deleteError(field.name);
				showHideWarn();
			}
		}

		// Find the relevant rule
		var rule = rules.find(function(r) {
			return r.name === field.name;
		});

		// Find the first test that returns true if it exists
		var errored = rule.tests.find(function(t) {
			return t.error(field.value);
		});

		if (errored) {
			// Set aria-invalid="true"
			field.setAttribute('aria-invalid', 'true');
			// Populate error message
			errorElem.textContent = errored.message;
			saveError(field.name);
		} else {
			errorElem.textContent = '';
			field.removeAttribute('aria-invalid');
			deleteError(field.name);
			showHideWarn();
		}
	}

	// Initialize error markup and bindings
	fields.forEach(function(field) {
		// Set aria-describedby
		field.setAttribute('aria-decribedby', field.name + '-error');

		// If `required`, set `aria-required`
		if (field.getAttribute('required') !== null) {
			field.setAttribute('aria-required', 'true');
		}

		// Create and place error element
		var errorElem = document.createElement('div');
		errorElem.id = field.name + '-error';
		errorElem.classList.add('field-error');
		field.parentNode.insertBefore(errorElem, field.nextSibling);

		// Bind to keyup event
		var debounced;
		field.addEventListener('keyup', function() {
			window.clearTimeout(debounced);
			debounced = setTimeout(function() {
				validate(field);
			}, settings.debounce);
		});
	});

	formElem.addEventListener('submit', function(e) {
		e.preventDefault();
		fields.forEach(function(field) {
			validate(field);
		});
		showHideWarn();
	});
}
