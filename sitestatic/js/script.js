/**
 * Things to do once the DOM is loaded
 */
document.addEventListener("DOMContentLoaded", function () {
    // Getting the required elements
    let searchRepoInputElem = document.getElementById("filter-menu");

    // Adding filtering to the link section ids in the sidebar
    let linkSectionIDsList = new List("sidebar", {
        valueNames: ["name", "alt-name"],
    });

    // Handle keydown events (overridden)
    halfmoon.keydownHandler = function (event) {
        /*
        Shortcuts are triggered only if no input, textarea, or select has focus,
        And if the control key or command key is not pressed down
        */
        if (
            !(
                document.querySelector("input:focus") ||
                document.querySelector("textarea:focus") ||
                document.querySelector("select:focus")
            )
        ) {
            if (!(event.ctrlKey || event.metaKey)) {
                /*
                Focus on the filter link element when [shift] + [F] keys are  pressed, but only if
                sidebar is not hidden (since the filter box is in the sidebar)
                */
                if (event.which === 70 && event.shiftKey) {
                    searchRepoInputElem.focus();
                    event.preventDefault();
                }
            }
        }
    };
});

/**
 * Function to handle form changes
 * @param {HTMLFormElement} form - The form element to track changes for
 */
function checkFormChange(form) {
    let formEdited = false,
        submit = form.querySelector('button[type = "submit"]');

    function handleFormChange() {
        if (formEdited) {
            submit.removeAttribute("disabled");
        }
    }

    form.addEventListener("change", function () {
        formEdited = true;
        handleFormChange();
    });

    form.addEventListener("focusin", function () {
        formEdited = true;
        handleFormChange();
    });
}
