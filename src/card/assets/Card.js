// The card constructor
function Card(elem, options) {
  // The default settings for the carousel.
  var settings = {
    imgHeight: 200,
    icon: '<svg fill="currentColor" viewBox="0 0 20 20" width="20" height="20" focusable="false"><polyline points="2 2, 18 10, 2 18"></polyline></svg>'
  }

  // Overwrite defaults where they are provided in options
  for (var setting in options) {
    if (options.hasOwnProperty(setting)) {
      settings[setting] = options[setting];
    }
  }

  // Add class to card container in case it doesn't exist
  elem.classList.add('card-interface');

  // Get image container
  var imgBox = elem.querySelector('.card-interface-img');

  if (imgBox) {
    imgBox.style.height = settings.imgHeight + 'px';
  }

  if (imgBox && settings.icon) {
    imgBox.innerHTML += '<span class="card-interface-icon">'+ settings.icon +'</span>';
  }

  // Get title link container
  var titleLink = elem.querySelector('.card-interface-title a');

  // Make the image box clickable
  if (imgBox && titleLink) {
    imgBox.style.cursor = 'pointer';
    imgBox.addEventListener('click', function() {
      titleLink.click();
    });
  }
}
