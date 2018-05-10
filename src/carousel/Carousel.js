// The Carousel constructor
function Carousel(elem, label, itemWidth) {
  // Give the outer elem a class for styling
  elem.classList.add('carousel-interface');
  // Make the outer element focusable
  elem.setAttribute('tabindex', '0');
  // Set the label
  elem.setAttribute('aria-label', label);

  // Define list elements
  var list = elem.querySelector('ul');
  list.classList.add('carousel-interface-list');
  var items = list.children;

  Array.prototype.forEach.call(items, function(item) {
    // Set item width from arg or fall back on 25%
    item.style.width = itemWidth !== undefined ? itemWidth : '25%';

    // Define item heading
    var heading = item.querySelector('h2, h3, h4, h5');
    // Define item link
    var link = item.querySelector('a');

    // Give the link an accessible label
    link.setAttribute('aria-label', 'Play: ' + heading.textContent);

    // Handle mouse click on parent
    item.addEventListener('click', function() {
      link.click();
    });
  });

  // Manage focus with intersectionObserver
  if ('IntersectionObserver' in window) {
    const observerSettings = {
      root: elem
    }

    var callback = function(items, observer) {
      Array.prototype.forEach.call(items, function(item) {
        var a = item.target.querySelector('a');
        if (item.intersectionRatio > 0) {
          a.removeAttribute('tabindex');
        } else {
          a.setAttribute('tabindex', '-1');
        }
      });
    }
    var observer = new IntersectionObserver(callback, observerSettings);
    Array.prototype.forEach.call(items, function(item) {
      observer.observe(item);
    });
  }
}
