window.addEventListener('DOMContentLoaded', () => {


//Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
            tabsContent = document.querySelectorAll('.tabcontent'),
            tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent () {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent (i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent(); 

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i); 
                }  
            });
        }
    });

//Timer

    const deadline = '2021-11-05'; //Задаем начальную точку отсчета

    function getTimeRemaining(endtime) {
        const   t = Date.parse(endtime) - Date.parse(new Date()), //разница между конечной датой и нынешней датой в миллисекундах
                days = Math.floor(t / (1000 * 60 * 60 *24)),  //Math.floor() округление до ближайшего целого целого
                hours = Math.floor((t / (1000 * 60 * 60) & 24)), //вычисление остатка оставшихся часов
                minutes = Math.floor((t / 1000 / 60) % 60),     //вычисление остатка оставшихся минут
                seconds = Math.floor((t / 1000 ) %60);          //вычисление остатка оставшихся секунд

        // Создание объекта
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    // функция для того чтобы перед числом меньше 10 стоял ноль
    function getZero (num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        updateClock(); // убирает мигание верстки, то есть задержку запуска функции updateClock() на странице

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadline);

//Create Modal Window

    const   modWin = document.querySelector('.modal'),
            modBtn = document.querySelectorAll('[data-modal]'),
            modClose = document.querySelector('[data-close]');

    function modalOpen() {
    // modWin.style.display = 'flex';       // 1 способ смены стилей Css

        modWin.classList.add('show');       // 2 способ смены стилей
        modWin.classList.remove('hide');    // 2 способ смены стилей

        // modWin.classList.toggle('show');       // 3 способ смены стилей
        document.body.style.overflow = 'hidden'; //отключение прокрутки экрана при вызове модального окна
        clearInterval(modalTimerId);
    }
    function modalClose() {
        // modWin.style.display = 'none';    // 1 способ смены стилей Css

        modWin.classList.add('hide');        // 2 способ смены стилей
        modWin.classList.remove('show');     // 2 способ смены стилей

        // modWin.classList.toggle('show');       // 3 способ смены стилей
        document.body.style.overflow = '';    //возврат прокрутки экрана 
    }

    // Открыть модальные окна
    modBtn.forEach(btn => {
        btn.addEventListener('click', modalOpen);
    });
    
    // Закрыть модальное окно
    modClose.addEventListener('click', modalClose); 

    // Закрытие модального окна кликом на пустое пространство вокруг модального окна
    modWin.addEventListener('click', (e) => {
        if (e.target === modWin) {
            modalClose();
        }
    });

    // Закрыть модальное окно при нажатии клавиши на клавиатуре 
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modWin.classList.contains('show')) {
            modalClose();
        } if (e.code === "KeyM" ) {
            modalOpen();
        }
    });
   
    //Появление модального окна через определенное количество времени
    // const modalTimerId = setTimeout(modalOpen, 3000);


    // Появление модального окна при скроле до конца страницы
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            modalOpen();
            window.removeEventListener('scroll', showModalByScroll); // удаляет обработчик событий addEventListener, для того чтобы модальное окно поялвялось только 1 раз, а не каждый раз, когда мы скролим страницу до конца.
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // ИСпользуем классы для карточек

   class MenuCard {
       constructor(src, alt, title, descr, price, parentSelector) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.transfer = 27;
        this.changeToUAH();
        this.parent = document.querySelector(parentSelector);
       }

       changeToUAH() {
        this.price = this.price * this.transfer;
       }

       render() {
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="menu__item">
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>
            `;
        this.parent.append(element);
       }
   } 

//    const div = new MenuCard();
//    div.render(); это тоже самое , что :

//    new MenuCard().render();

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        20,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        16,
        '.menu .container'
    ).render();
}); 