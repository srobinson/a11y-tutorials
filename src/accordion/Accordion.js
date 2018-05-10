// The Accordion constructor
function Accordion(elem, listARIA) {
  // Give the container a special class
  elem.classList.add('accordion-interface');

  // Make the container a list if requested
  if (listARIA) {
    elem.setAttribute('role', 'list');
  }

  // Get all children to turn into headers/panels
  var sections = elem.children;

  function toggle(button, panel) {
    var expanded = button.getAttribute('aria-expanded') === 'true' || false;
    button.setAttribute('aria-expanded', !expanded);
    panel.hidden = !panel.hidden;
  }

  // Adapt markup and add events for each section
  Array.prototype.forEach.call(sections, function(section) {
    // Make the section a list item if requested
    if (listARIA) {
      section.setAttribute('role', 'listitem');
    }
    // Get the first element, which should be a heading
    var heading = section.firstElementChild;

    // Get the rest of the contents
    var contents = section.querySelectorAll('*');
    // Convert nodeList to array and remove first child
    contents = [].slice.call(contents, 1);

    // Build headerDOM, with button
    var header = document.createElement('div');
    header.classList.add('accordion-interface-header');
    header.appendChild(heading);
    var button = document.createElement('button');
    button.innerHTML = '<svg viewBox="0 0 20 20" width="20" height="20" focusable="false"><polyline points="4 4, 10 16, 16 4"></polyline></svg><span class="visually-hidden">Open '+heading.textContent+'</span>';
    button.setAttribute('aria-expanded', false);
    header.appendChild(button);

    // Insert the handle
    section.insertBefore(header, section.firstChild);

    // Build panel HTML
    var panel = document.createElement('div');
    panel.classList.add('accordion-interface-panel');
    panel.hidden = true;
    contents.forEach(function(node) {
      panel.appendChild(node);
    });

    // Insert the panel
    section.appendChild(panel);

    // Add toggle handler
    button.addEventListener('click', function() {
      toggle(button, panel);
    });

    // Add redundant handle to header
    header.addEventListener('click', function(e) {
      if (e.target !== button) {
        button.click();
      }
    });
  });
}
