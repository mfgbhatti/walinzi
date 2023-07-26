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
 * display controller for halfmoon
 * @constructor
 * @param {*} editor editor instance
 * @param {object} form form instance
 * @param {Function} callback  function to call when the form is closed
 */
(function () {
  var Editor = $.fn.dataTable.Editor;
  Editor.display.halfmoon = $.extend(true, {}, Editor.models.display, {
    /* create the HTML mark-up needed the display controller */
    init: function (editor) {
      return Editor.display.halfmoon;
    },

    /* show the form */
    open: function (editor, form, callback) {
      /* close any rows which are already open */
      Editor.display.halfmoon.close(editor);

      if (callback) {
        callback();
      }
    },

    /* hide the form */
    close: function (editor, callback) {
      /* Editor.display.halfmoon.close(editor, callback); */
      if (callback) {
        callback();
      }
    },
  });
})();

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
