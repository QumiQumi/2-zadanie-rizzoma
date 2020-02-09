// var dropdown = document.getElementsByid('dropdown');
// //var dropdownAfter = window.getComputedStyle(dropdown, '::after');
// dropdown.addEventListener("click", () => dropdown.focus());
$(document).ready(function() {
    $('#dropdown').click(function() {
        $('#dropdown').select();
    });
})