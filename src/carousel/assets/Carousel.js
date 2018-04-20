// The tabs constructor
function Carousel(elem, options) {

  // The default settings for the carousel.
  var settings = {
    label: 'Selected videos',
    itemWidth: 300,
    itemMargin: 16,
    imageHeight: 150,
    icon: '<svg viewBox="0 0 20 20" width="20" height="20" focusable="false"><polyline points="2 2, 18 10, 2 18"></polyline></svg>'
  }

  // Overwrite defaults where they are provided in options
  for (var setting in options) {
    if (options.hasOwnProperty(setting)) {
      settings[setting] = options[setting];
    }
  }

  // Give the outer elem a class for styling
  elem.classList.add('carousel-interface');
  elem.setAttribute('role', 'region');
  elem.setAttribute('aria-label', settings.label);

  // Define list and items
  var list = elem.querySelector('ul');
  list.classList.add('carousel-interface-list');
  var items = list.children;

  // Wrap the list for scrolling
  var scrollable = document.createElement('div');
  scrollable.classList.add('carousel-interface-scrollable');
  list.parentNode.insertBefore(scrollable, list);
  scrollable.appendChild(list);

  // Make the outer element focusable
  scrollable.setAttribute('tabindex', '0');
  // Set the group role (for label compatibility)
  scrollable.setAttribute('role', 'group');
  // Set the label
  scrollable.setAttribute('aria-label', 'scroll for more');

  // Create buttons container
  var buttons = document.createElement('div');
  buttons.classList.add('carousel-interface-buttons');


  Array.prototype.forEach.call(items, function(item, i) {
    // Add the margin to all but the first item
    if (i > 0) {
      item.style.marginLeft = settings.itemMargin + 'px';
    }

    // Set item width from arg or fall back on 25%
    item.style.width = settings.itemWidth + 'px';

    // Set classes on divs
    var imageBox = item.children[0];
    var textBox = item.children[1];
    imageBox.classList.add('carousel-interface-image');
    textBox.classList.add('carousel-interface-text');

    // Add the icon
    imageBox.innerHTML += '<span class="carousel-interface-icon">'+settings.icon+'</span>';
    // Set the height
    imageBox.style.height = settings.imageHeight + 'px';

    // Define item heading
    var heading = textBox.querySelector('h2, h3, h4, h5');
    // Define item link
    var link = heading.querySelector('a');

    // Handle mouse click on parent
    item.addEventListener('click', function() {
      link.click();
    });
  });

  // Create buttons
  var prev = document.createElement('button');
  prev.setAttribute('aria-label', 'previous');
  prev.disabled = true;
  prev.innerHTML = '<svg viewBox="0 0 20 20" width="20" height="20"><polyline points="14 6, 6 10, 14 14"></polyline></svg>';
  buttons.appendChild(prev);
  var next = document.createElement('button');
  next.setAttribute('aria-label', 'next');
  next.innerHTML = '<svg viewBox="0 0 20 20" width="20" height="20"><polyline points="6 6, 14 10, 6 14"></polyline></svg>';
  buttons.appendChild(next);

  // Add incremental scrolling functionality
  prev.addEventListener('click', function (e) {
    scrollable.scrollLeft +=  -(settings.itemWidth + settings.itemMargin);
  });
  next.addEventListener('click', function (e) {
    scrollable.scrollLeft +=  (settings.itemWidth + settings.itemMargin);
  });

  function disableEnable() {
    prev.disabled = scrollable.scrollLeft < 1;
    next.disabled = scrollable.scrollLeft === list.scrollWidth - list.offsetWidth;
  }

  // Debounce the button disabling function on scroll
  var debounced;
  scrollable.addEventListener('scroll', function () {
    window.clearTimeout(debounced);
    debounced = setTimeout(disableEnable, 200);
  });

  // Add the buttons to the DOM
  elem.appendChild(buttons);

  // Manage focus order with intersectionObserver
  if ('IntersectionObserver' in window) {
    var observerSettings = {
      root: scrollable
    }

    // The callback function for the observer
    var callback = function(items, observer) {
      Array.prototype.forEach.call(items, function(item) {
        // `item.target` is needed to get the node
        var a = item.target.querySelector('a');
        if (item.intersectionRatio > 0) {
          a.removeAttribute('tabindex');
          item.target.removeAttribute('aria-hidden');
        } else {
          a.setAttribute('tabindex', '-1');
          item.target.setAttribute('aria-hidden', 'true');
        }
      });
    }

    // Initialize the observer
    var observer = new IntersectionObserver(callback, observerSettings);
    Array.prototype.forEach.call(items, function(item) {
      observer.observe(item);
    });
  }
}
