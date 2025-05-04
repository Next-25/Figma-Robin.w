//автоматическое скрытие-появления меню гамбургер от размера экрана

function check() {

    if (window.matchMedia("(min-width: 768px)").matches) {
        document.querySelector('.header-nav').classList.remove('hidden');
        document.querySelector('.header-button').classList.add('hidden-button');
    } else {
        document.querySelector('.header-nav').classList.add('hidden');
        document.querySelector('.header-button').classList.remove('hidden-button');
    }
}
check();
window.addEventListener('resize', check);

// меню гамбургер
const headerMenu = document.getElementById('header-button');
headerMenu.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('nav').classList.toggle('hidden');
});


//переключение фотографий

let active_photo = document.querySelector('#italy');

const italy_button = document.getElementById('italy-button');
italy_button.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('#italy').classList.toggle('hidden');
    active_photo.classList.toggle('hidden');
    active_photo = document.querySelector('#italy');
});

const australia_button = document.getElementById('australia-button');
australia_button.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('#australia').classList.toggle('hidden');
    active_photo.classList.toggle('hidden');
    active_photo = document.querySelector('#australia');
});

const india_button = document.getElementById('india-button');
india_button.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('#india').classList.toggle('hidden');
    active_photo.classList.toggle('hidden');
    active_photo = document.querySelector('#india');
});

const brazil_button = document.getElementById('brazil-button');
brazil_button.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('#brazil').classList.toggle('hidden');
    active_photo.classList.toggle('hidden');
    active_photo = document.querySelector('#brazil');
});

//кнопка прокрутки вверх

const scrollBtn = document.getElementById("scroll_top_button");

// Показать кнопку при прокрутке вниз
window.addEventListener("scroll", function () {
    scrollBtn.style.display = (window.scrollY > 300) ? "block" : "none";
});

// Плавный скролл вверх
scrollBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


//Telegrambot

let lastSent = 0;
const minDelay = 60 * 1000;

const TOKEN = "7975611155:AAHlSPMFQjycv4dMmCbC6kuXTLf4uzmxZRk";
const CHAT_ID = "6529836765";
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

document.getElementById("feedback-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const now = Date.now();
    if (now - lastSent < minDelay) {
        alert("Подождите немного перед повторной отправкой.");
        return;
    }

    lastSent = now;

    const name = this.name.value;
    const email = this.email.value;
    const message = this.message.value;

    const text = `📩 Новое сообщение с сайта:\n\n👤 Имя: ${name}\n📧 Email: ${email}\n📝 Сообщение: ${message}`;

    fetch(URI_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: text
        })
    })
        .then(res => {
            if (res.ok) {
                alert("Сообщение отправлено!");
                this.reset();
            } else {
                alert("Ошибка при отправке.");
            }
        })
        .catch(err => alert("Ошибка: " + err));
});
