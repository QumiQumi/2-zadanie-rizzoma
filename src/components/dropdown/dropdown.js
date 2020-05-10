//import './dropdown.scss';

console.log('dropdown');

document.addEventListener('DOMContentLoaded', function() {
    drop = $('.dropdown') //document.getElementsByClassName('dropdown');
    let i = 0;
    while (i < drop.length) {
        //на дропдаун
        drop[i].addEventListener('click', function() {
                event.target.closest(".dropdown").classList.toggle("active");
            })
            //на плюсы и минусы
        switchArr = drop[i].querySelectorAll('.dropdown-list__switcher')
        switchCount = 0
        while (switchCount < switchArr.length) {
            switchElem = switchArr[switchCount]
            minus = switchElem.querySelectorAll('.dropdown-list__switcher_circle')[0]
            plus = switchElem.querySelectorAll('.dropdown-list__switcher_circle')[1]
            number = switchElem.querySelector('.dropdown-list__switcher_number')

            minus.addEventListener('click', function() {
                number = event.target.closest('.dropdown-list__switcher').querySelector('.dropdown-list__switcher_number').querySelector('h3')
                if (number.textContent > 0) {
                    number.textContent--
                }
                console.log(checkSum(event))
                if (checkSum(event) == 0)
                    clearBtnInactive();
                event.stopPropagation();
            })
            plus.addEventListener('click', function() {
                number = event.target.closest('.dropdown-list__switcher').querySelector('.dropdown-list__switcher_number').querySelector('h3')
                if (number.textContent < 9) {
                    number.textContent++
                }
                if (checkSum(event) == 0)
                    clearBtnInactive();
                event.stopPropagation();
            })
            switchCount++
        }
        console.log(switchArr)
        i++;
    }


})

function checkSum(event) {
    sum = 0
    numbers = event.target.closest('.dropdown-list').querySelectorAll('.dropdown-list__switcher_number')
    numbers.forEach(element => {
        sum += element.textContent
    });
    return sum
}

function clearBtnInactive(event) {
    dropdown = event.target.closest('.dropdown-list').querySelector('.dropdown-list__toolbar_clear')
        // dropdown.classList.add("inactive");
}