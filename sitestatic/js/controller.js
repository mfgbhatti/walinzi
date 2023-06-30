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
