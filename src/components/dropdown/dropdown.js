//import './dropdown.scss';

console.log('dropdown');

document.addEventListener('DOMContentLoaded', function() {
    drop = document.getElementsByClassName('dropdown__name');
    let i = 0;
    while (i < drop.length) {
        drop[i].addEventListener('click', function() {
            event.target.closest(".dropdown").classList.toggle("active");
        })
        i++;
    }
})