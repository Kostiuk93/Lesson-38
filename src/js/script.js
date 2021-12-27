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
    
        const deadline = '2021-12-05'; //Задаем начальную точку отсчета
    
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
                modBtn = document.querySelectorAll('[data-modal]');
    
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
        
        // Закрытие модального окна кликом на пустое пространство вокруг модального окна и при нажатии на крестик
        modWin.addEventListener('click', (e) => {
            if (e.target === modWin || e.target.classList.contains('modal__close')) {
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
        const modalTimerId = setTimeout(modalOpen, 50000);
    
    
        // Появление модального окна при скроле до конца страницы
        function showModalByScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                modalOpen();
                window.removeEventListener('scroll', showModalByScroll); // удаляет обработчик событий addEventListener, для того чтобы модальное окно поялвялось только 1 раз, а не каждый раз, когда мы скролим страницу до конца.
            }
        }
    
        window.addEventListener('scroll', showModalByScroll);
    
        // Иcпользуем классы для карточек
    
       class MenuCard {
           constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH();
            this.parent = document.querySelector(parentSelector);
           }
    
           changeToUAH() {
            this.price = this.price * this.transfer;
           }
    
           render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {  //создание блока по калссу HTML по умоланию
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
    
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
           }
       } 
    
        const getResurce = async (url) => {
            const res = await fetch(url);
    
            if (!res.ok) {
                throw new Error(`Could not fetch  ${url}, status ${res.status}`);
            }
    
            return await res.json(); //возвращаем промис
        };
    
    
        // Создаем карточки товаров исходя из информации базы данных в db.json
        //Первый способ
        /* getResurce('http://localhost:3000/menu')
            .then(data => {
                data.forEach(({img, altimg, title, descr, price}) => {
                    new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
                });
            }); */
        // Способ при использовании библиотеки axios
        axios.get('http://localhost:3000/menu') 
            .then(data => {
                data.data.forEach(({img, altimg, title, descr, price}) => {
                    new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
                });
            });
    
    // Forms
        
        const forms = document.querySelectorAll('form');
    
        const message = {
            loading: 'img/form/spinner.svg', //добавляем изображение вместо текста
            success: 'Спасибо! Скоро мы с Вами свяжемся',
            failure: 'Что то пошло не так...'
        }
    
        forms.forEach(item => {
            bindPostData(item);
        });
    
        // функия общения с сервером
        const postData = async (url, data) => {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            });
    
            return await res.json(); //возвращаем промис
        };
        //_____________________________________________
    
    
        function bindPostData(form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
    
                // statusMessage окно загрузки обработки запроса
                const statusMessage = document.createElement('img'); // изменяем div на img
                statusMessage.src = message.loading; //меняем путь 
                //задаем стиль изображению
                statusMessage.style.cssText = `  
                    display: block;
                    margin: 0 auto;
                `;
                form.insertAdjacentElement('afterend', statusMessage); // изображение будет появлятся после формы
    
                const formData = new FormData(form);
    
                const json = JSON.stringify(Object.fromEntries(formData.entries()));
    
                postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
            });
        }
    
        function showThanksModal(message) {
            const prevModalDilog = document.querySelector('.modal__dialog');
    
            prevModalDilog.classList.add('hide');
            modalOpen();
    
            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
                <div class="modal__content">
                    <div data-close class="modal__close">×</div>
                    <div class="modal__title">${message}</div>
                </div>
            `;
            
            //Добавление нового модального окна
            document.querySelector('.modal').append(thanksModal);
    
            setTimeout(() => {
                thanksModal.remove();
                prevModalDilog.classList.add('show');
                prevModalDilog.classList.remove('hide');
                modalClose();
            }, 3000);
        }
    
    // Слайдер-карусель
    
        const slides = document.querySelectorAll('.offer__slide'),
              slider = document.querySelector('.offer__slider'),
              prev = document.querySelector('.offer__slider-prev'),
              next = document.querySelector('.offer__slider-next'),
              total = document.querySelector('#total'),
              current = document.querySelector('#current'),
              slidesWrapper = document.querySelector('.offer__slider-wrapper'),
              slidesField = document.querySelector('.offer__slider-inner'),
              width = window.getComputedStyle(slidesWrapper).width;
    
        let slideIndex = 1;
        let offset = 0;
    
        if(slides.length < 10){
            total.textContent = `0${slides.length}`;
            current.textContent = `0${slideIndex}`;
        }   else {
            total.textContent = slides.length;
            current.textContent = slideIndex;
        }
    
        slidesField.style.width = 100 * slides.length + '%';
        slidesField.style.display = 'flex';
        slidesField.style.transition = '0.5s all';
    
        slidesWrapper.style.overflow = 'hidden';
    
        slides.forEach(slide => {
            slide.style.width = width;
        });
    
        // Создание навигационных клавиш
        slider.style.position = 'relative';
    
        const indicators = document.createElement('ol'),
            dots = [];
        indicators.classList.add('carousel-indicatiors');
        indicators.style.cssText = `
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 15;
            display: flex;
            justify-content: center;
            margin-right: 15%;
            margin-left: 15%;
            list-style: none;
        `;
        slider.append(indicators);
    
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('li');
            dot.setAttribute('data-slide-to', i + 1);
            dot.style.cssText = `
                box-sizing: content-box;
                flex: 0 1 auto;
                width: 30px;
                height: 6px;
                margin-right: 3px;
                margin-left: 3px;
                cursor: pointer;
                background-color: #fff;
                background-clip: padding-box;
                border-top: 10px solid transparent;
                border-bottom: 10px solid transparent;
                opacity: .5;
                transition: opacity .6s ease;
            `;
            if (i == 0) {
                dot.style.opacity = 1;
            }
            indicators.append(dot);
            dots.push(dot);
        }
    
        function deleteNotDigits(str) {
            return +str.replace(/\D/g, '');
        }
    
        next.addEventListener('click', () => {
            if (offset == deleteNotDigits(width) * (slides.length - 1)) {
                offset = 0;
            }   else {
                offset += deleteNotDigits(width);
            }
            slidesField.style.transform = `translateX(-${offset}px)`;
    
            if (slideIndex == slides.length) {
                slideIndex = 1;
            }   else {
                slideIndex++;
            }
    
            if (slides.length < 10) {
                current.textContent =  `0${slideIndex}`;
            }   else {
                current.textContent =  slideIndex;
            }
    
            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = '1';
        });
    
        prev.addEventListener('click', () => {
            if (offset == 0) {
                offset = deleteNotDigits(width) * (slides.length - 1);
            }   else {
                offset -= deleteNotDigits(width);
            }
            slidesField.style.transform = `translateX(-${offset}px)`;
    
            if (slideIndex == 1) {
                slideIndex = slides.length;
            }   else {
                slideIndex--;
            }
    
            if (slides.length < 10) {
                current.textContent =  `0${slideIndex}`;
            }   else {
                current.textContent =  slideIndex;
            }
    
            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = '1';
        });
    
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideTo = e.target.getAttribute('data-slide-to');
    
                slideIndex = slideTo;
                offset = deleteNotDigits(width) * (slideTo - 1);
    
                slidesField.style.transform = `translateX(-${offset}px)`;
    
                if (slides.length < 10) {
                    current.textContent =  `0${slideIndex}`;
                }   else {
                    current.textContent =  slideIndex;
                }
    
                dots.forEach(dot => dot.style.opacity = '.5');
                dots[slideIndex - 1].style.opacity = '1';
            });
        });
    
    }); 