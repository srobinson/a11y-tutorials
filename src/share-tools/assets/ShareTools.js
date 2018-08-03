// The share controls constructor
function ShareTools(elem, halign, valign) {
  var button = elem.querySelector('.share-tools-button');
  var menu = elem.querySelector('.share-tools-menu');
  var first = menu.querySelector('a, button, input');
  var closeButton = elem.querySelector('.share-tools-close');
  var copyButton = elem.querySelector('.share-copy-button');
  var copyFeedback = elem.querySelector('.share-copy-feedback');
  var copyInput = elem.querySelector('.share-copy-input');

  var halign = halign || 'left';
  var valign = valign || 'below';

  menu.classList.add(halign + '-' + valign);

  var uniq = +Date.now();
  copyButton.id = 'copy-link-' + uniq;
  copyInput.setAttribute('aria-labelledby', 'copy-link-' + uniq);

  menu.hidden = true;

  function open() {
    menu.hidden = false;
    first.focus();
  }

  function close() {
    menu.hidden = true;
    button.focus();
  }

  button.addEventListener('click', function() {
    open();
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
