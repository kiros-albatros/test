var slider = tns({
    "container": '.slider',
    "items": 2,
    "center": true,
    "loop": true,
    "swipeAngle": false,
    "speed": 400,
    "nav": false,
    "prevButton": '.slider__prev',
    "nextButton": '.slider__next',
    'autoHeigh': false
});

// POPUP

let mailButton = document.querySelector('.header__mail');
let popupBackground = document.querySelector('.modal-background');
let popup = document.querySelector('.modal');
let modalCross = document.querySelector('.modal__cross');

mailButton.addEventListener('click', function (event) {
    event.preventDefault();
    popupBackground.classList.add('show-modal');
    popup.classList.add('show-modal');
})

modalCross.addEventListener('click', function () {
    popupBackground.classList.remove('show-modal');
    popup.classList.remove('show-modal');
})

// AJAX

let modalForm = document.querySelector('.modal__form');

modalForm.addEventListener("submit", function (event) {
    console.log('start ajax');
    event.preventDefault();

    let request = new XMLHttpRequest();
    request.open("POST", "server.php");
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    let modalData = new FormData(modalForm);
    request.send(modalData);
    let message = document.createElement("div");
    popup.append(message);

    request.addEventListener("readystatechange", function () {
        if (request.readyState < 4) {
            message.innerHTML = "Загрузка...";
        } else if (request.readyState === 4 && request.status == 200) {
            message.innerHTML = "Спасибо, скоро мы с вами свяжемся";
            modalForm.reset();
        } else {
            message.innerHTML = "Что-то пошло не так";
        }
    });
});

// finish AJAX