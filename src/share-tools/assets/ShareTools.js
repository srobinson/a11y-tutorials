// The share controls constructor
function ShareTools(elem, halign, valign) {
  var button = elem.querySelector('.share-tools-button');
  var menu = elem.querySelector('.share-tools-menu');
  var shareList = elem.querySelector('.share-tools-social');
  var shareListItems = elem.querySelectorAll('.share-tools-social li');
  var firstFocusable = menu.querySelector('a, button, input');
  var closeButton = elem.querySelector('.share-tools-close');
  var copyButton = elem.querySelector('.share-copy-button');
  var copyFeedback = elem.querySelector('.share-copy-feedback');
  var copyInput = elem.querySelector('.share-copy-input');

  var halign = halign || 'left';
  var valign = valign || 'below';

  menu.classList.add(halign + '-' + valign);

  button.setAttribute('aria-haspopup', 'true');
  button.setAttribute('aria-expanded', 'false');

  menu.setAttribute('role', 'menu');

  shareList.setAttribute('role', 'list');

  Array.prototype.forEach.call(shareListItems, function(item) {
    item.setAttribute('role', 'listitem');
  });

  var uniq = +Date.now();

  copyButton.id = 'copy-button-' + uniq;

  copyFeedback.id = 'copy-feedback-' + uniq;

  copyInput.setAttribute('aria-labelledby', 'copy-button-' + uniq);
  copyInput.setAttribute('aria-describedby', 'copy-feedback-' + uniq);

  menu.hidden = true;

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

  copyButton.addEventListener('click', function() {
    copyInput.select();
    document.execCommand('copy');
    copyFeedback.textContent = '';
    window.setTimeout(function() {
      copyFeedback.textContent = 'Copied!';
    }, 200);
  });
}
