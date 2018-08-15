function ShareMenu(elem, options) {
  // The default settings for the tab interface
  var settings = {
    halign: 'right',
    valign: 'below'
  };

  // Overwrite defaults where they are provided in options
  for (var setting in options) {
    if (options.hasOwnProperty(setting)) {
      settings[setting] = options[setting];
    }
  }

  // Get key elements
  var menu = elem.querySelector('.share-tools--menu');
  var button = elem.querySelector('.share-tools--button');
  var firstFocusable = menu.querySelector('a, button, input');
  var closeButton = menu.querySelector('.share-tools--close');
  var inputLabel = menu.querySelector('label');
  var input = menu.querySelector('.share-tools--link');

  button.setAttribute('aria-haspopup', 'true');
  button.setAttribute('aria-expanded', 'false');

  // Add alignment class
  menu.classList.add(settings.halign + '-' + settings.valign);

  // reveal the parent element if JavaScript runs
  elem.style.display = 'inline-block';

  // Hide the menu initially
  menu.hidden = true;

  // A unique string for creating relationships
  var uniq = +Date.now();

  // Set up label/input relationship
  inputLabel.setAttribute('for', 'copy-' + uniq);
  input.id = 'copy-' + uniq;

  function open() {
    menu.hidden = false;
    button.setAttribute('aria-expanded', 'true');
    firstFocusable.focus();
  }

  function close() {
    menu.hidden = true;
    button.setAttribute('aria-expanded', 'false');
    button.focus();
  }

  function select() {
    input.select();
    document.execCommand('copy');
  }

  button.addEventListener('click', function() {
    menu.hidden ? open() : close();
  });

  button.addEventListener('keydown', function(e) {
    if (e.which === 40) {
      open();
    }
  });

  closeButton.addEventListener('click', function() {
    close();
  });

  menu.addEventListener('keydown', function(e) {
    if (e.which === 27) {
      close();
    }
  });

  input.addEventListener('focus', select);
}
