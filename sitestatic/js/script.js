/**
 * Things to do once the DOM is loaded
 */
document.addEventListener("DOMContentLoaded", function () {
  // Getting the required elements
  var searchRepoInputElem = document.getElementById("filter-menu");

  // Adding filtering to the link section ids in the sidebar
  var linkSectionIDsList = new List("sidebar", {
    valueNames: ["name", "alt-name"],
  });

  // Handle keydown events (overridden)
  halfmoon.keydownHandler = function (event) {
    // Shortcuts are triggered only if no input, textarea, or select has focus,
    // And if the control key or command key is not pressed down
    if (
      !(
        document.querySelector("input:focus") ||
        document.querySelector("textarea:focus") ||
        document.querySelector("select:focus")
      )
    ) {
      if (!(event.ctrlKey || event.metaKey)) {
        // Focus on the filter link element when [shift] + [F] keys are  pressed, but only if sidebar is not hidden (since the filter box is in the sidebar)
        if (event.shiftKey && event.which == 70) {
          searchRepoInputElem.focus();
          event.preventDefault();
        }
      }
    }
  };
});
