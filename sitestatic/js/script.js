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

// get csrf_token
function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      // delete white space
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

//handle response
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
    content = "This action has been saved successfully.";
    title = "Success";
  }
  halfmoon.initStickyAlert({
    content: content,
    title: title,
    alertType: alert,
    fillType: "filled",
  });
}
