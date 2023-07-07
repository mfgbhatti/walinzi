/**
 * function to copy to clipboard
 * @param {*} evt event object
 */
function copyURI(evt) {
  evt.preventDefault();
  navigator.clipboard.writeText(evt.target.getAttribute("href")).then(
    () => {
      evt.target.innerHTML = "Copied";
      /* clipboard successfully set */
    },
    () => {
      evt.target.innerHTML = "Failed";
      /* clipboard write failed */
    }
  );
}

/**
 * Getting cookie value
 * @param {string} name cookie name
 * @returns cookieValue
 */
function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      //delete white space
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

/**
 * Handle response
 * @param {*} jqXHR xhr object
 * @param {*} textStatus response status
 * @param {*} errorThrown response error
 * @param {*} alertType halfmoon alert type
 */
function responseHandler(jqXHR, textStatus, errorThrown, alertType) {
  var alert = "";
  var content = "";
  var title = "";
  if (alertType === "danger") {
    alert = "alert-danger";
    content =
      'There is an error with message "' +
      errorThrown +
      '" with status ' +
      jqXHR.status +
      ".";
    title = "Error";
    // log it
    console.group();
    console.log("Status: " + jqXHR.status);
    console.log("Error: " + errorThrown);
    console.warn("Please recheck you submission form.");
    console.groupEnd();
  } else {
    alert = "alert-success";
    content = "This action is done successfully.";
    title = "Success";
  }
  halfmoon.initStickyAlert({
    content: content,
    title: title,
    alertType: alert,
    fillType: "filled",
  });
}

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
