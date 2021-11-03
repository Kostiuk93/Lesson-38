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
    });