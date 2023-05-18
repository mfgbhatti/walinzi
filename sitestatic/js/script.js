function copyURI(evt) {
evt.preventDefault();
navigator.clipboard.writeText(evt.target.getAttribute('href')).then(() => {
    evt.target.innerHTML = "Copied link"
    /* clipboard successfully set */
}, () => {
    evt.target.innerHTML = "Failed"
    /* clipboard write failed */
});
}