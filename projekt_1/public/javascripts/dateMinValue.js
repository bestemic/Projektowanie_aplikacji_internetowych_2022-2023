const dt = new Date();
const dateControl = document.querySelectorAll('input[type="datetime-local"]');
dateControl.forEach(element => {
    element.min = dt.toISOString().substring(0, 16);
});