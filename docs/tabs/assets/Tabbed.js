// The tabs constructor
function Tabbed(elem, options) {
  // The default settings for the tab interface
  var settings = {
    breakPoint: '400px',
    trackHash: true,
    tabsFocusable: false
  }

  // Overwrite defaults where they are provided in options
  for (var setting in options) {
    if (options.hasOwnProperty(setting)) {
      settings[setting] = options[setting];
    }
  }

  // Give the outer elem a class for styling
  elem.classList.add('tab-interface');

  // Test for matchMedia support
  if (typeof window.matchMedia !== "undefined") {
    // Check to see we are above the breakpoint threshold
    if (window.matchMedia('(min-width: '+settings.breakPoint+')').matches) {
      // Get key elements
      var tablist = elem.querySelector('ul');
      var tabs = tablist.querySelectorAll('a');
      var panels = elem.querySelectorAll('ul:first-child ~ section');

      // Set random id string to avoid duplicate ids
      var ident = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

      // Set up ARIA semantics
      tablist.setAttribute('role', 'tablist');
      Array.prototype.forEach.call(tabs, function (tab, i) {
        tab.setAttribute('role', 'tab');
        if(!settings.tabsFocusable) {
          tab.setAttribute('tabindex', '-1');
        }
        tab.setAttribute('aria-selected', 'false');
        tab.setAttribute('id', 'tab-' + ident + '-' + (i + 1));
        tab.parentElement.setAttribute('role', 'presentation');
      });
      Array.prototype.forEach.call(panels, function (panel, i) {
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', tabs[i].id);
        panel.setAttribute('tabindex', '-1');
        panel.hidden = true;
      });

      // The tab switching function
      var switchTab = function (index, updateHash) {
        // Handle old tab
        var oldTab = tablist.querySelector('[aria-selected="true"]');
        if (oldTab) {
          if(!settings.tabsFocusable) {
            oldTab.setAttribute('tabindex', '-1');
          }
          oldTab.setAttribute('aria-selected', 'false');
        }

        var newTab = tabs[index];
        // Handle new tab
        newTab.setAttribute('aria-selected', 'true');
        newTab.removeAttribute('tabindex');

        // Show/hide the relevant panels
        if (oldTab) {
          var oldIndex = Array.prototype.indexOf.call(tabs, oldTab);
          panels[oldIndex].hidden = true;
        }
        panels[index].hidden = false;

        // Update hash unless no matching hash
        if (settings.trackHash && updateHash) {
          history.pushState(null, null, '#' + panels[index].id);
        }
      };

      // Set up mouse and keyboard events
      Array.prototype.forEach.call(tabs, function (tab) {
        // Mouse interaction
        tab.addEventListener('click', function (e) {
          e.preventDefault();
          var currentTab = tablist.querySelector('[aria-selected="true"]');
          if (e.currentTarget !== currentTab) {
            switchTab(Array.prototype.indexOf.call(tabs, e.currentTarget), true);
          }
        });

        // Keyboard interaction
        tab.addEventListener('keydown', function (e) {
          // Get index of focused tab
          var index = Array.prototype.indexOf.call(tabs, e.currentTarget);

          // Determine key pressed
          var dir = e.which === 37 ? index - 1 : e.which === 39 ? index + 1 : null;

          // Switch to the new tab if it exists
          if (dir !== null) {
            e.preventDefault();

            // Find correct tab to focus
            var newIndex;
            if (tabs[dir]) {
              newIndex = dir;
            } else {
              // Loop around if adjacent tab doesn't exist
              newIndex = dir === index - 1 ? tabs.length - 1 : 0;
            }
            switchTab(newIndex, true);
            tabs[newIndex].focus();
          }
        });
      });

      // Find out if a hash corresponds to a panel element
      function panelWithHash (hash) {
        var index = -1;
        if (hash !== '') {
          var target = document.querySelector(hash);
          panels.forEach(function (panel) {
            if (panel && panel.contains(target)) {
              index = Array.prototype.indexOf.call(panels, panel);
            }
          });
        }
        return index;
      }

      if (settings.trackHash) {
        // Support back button and panel linking
        window.addEventListener('hashchange', function (e) {
          // Get the index of the panel id (or `-1` if it doesn't exist)
          var index = panelWithHash(window.location.hash);

          if (index > -1) {
            switchTab(index, false);
          }
        });
      }

      // Initial tab selection based on hash
      window.addEventListener('DOMContentLoaded', function () {
        // Get the index of the panel id (or `-1` if it doesn't exist)
        var index = panelWithHash(window.location.hash);
        if (index > -1) {
          switchTab(index, true);
        } else {
          // Open the first tab if no panel matches
          switchTab(0, false);
        }
      });
    }
  }
}
