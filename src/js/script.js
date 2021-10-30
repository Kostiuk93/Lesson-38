window.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'),
            tabsContent = querySelectorAll('.tabcontent'),
            tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent () {
        tabsContent.forEach(item => {
            item.stile.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__items_active');
        });
    }

    function showTabContent (i) {
        tabContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__items_active');
    }

    hideTabContent();
    showTabContent(0); 
});