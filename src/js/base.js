@@include('_dinamic-adapt.js')
window.addEventListener('DOMContentLoaded', function () {

    let lazyLoadInstance = new LazyLoad();

    const body = document.querySelector('body');
    const burgerBtn = document.querySelector('.burger-btn');
    const burgerMenu = document.querySelector('.burger-menu');
    const burgerMenuClose = document.querySelector('.burger-menu__close');

    burgerBtn.addEventListener('click', function () {
        body.classList.add('_lock');
        this.classList.add('burger-btn--active');
        burgerMenu.classList.add('burger-menu--active');
    });

    burgerMenuClose.addEventListener('click', function () {
        body.classList.remove('_lock');
        burgerBtn.classList.remove('burger-btn--active');
        burgerMenu.classList.remove('burger-menu--active');
    });

    const searchForm = document.querySelector('.search-form');
    const searchInput = searchForm.querySelector('.search-form__input');
    const searchBtn = document.querySelector('.header__search-btn');
    searchBtn.addEventListener('click', function () {
        searchForm.classList.add('search-form--active');
    });

    document.addEventListener('mouseup', (e) => {
        if (searchForm != e.target && searchInput != e.target) {
            searchForm.classList.remove('search-form--active');
        }
    });

    const callbackBtn = document.querySelector('.header__callback');
    const callbackPopup = document.querySelector('#callback-popup');
    const overlay = document.querySelector('.overlay');
    const thanksPopup = document.querySelector('#thanks');
    const popupClose = document.querySelectorAll('.popup__close');
    callbackBtn.addEventListener('click', () => {
        body.classList.add('_lock');
        overlay.style.display = 'block';
        callbackPopup.style.display = 'block';
    });
    popupClose.forEach(close => {
        close.addEventListener('click', () => {
            overlay.style.display = 'none';
            close.parentElement.style.display = 'none';
            body.classList.remove('_lock');
        });
    });

    /* overlay.addEventListener('mouseup', (e) => {
        document.querySelectorAll('.popup').forEach(popup => {
            if (popup != e.target && popup.querySelector('.popup__form') != e.target && e.target.length != 0) {
                overlay.style.display = 'none';
                popup.parentElement.style.display = 'none';
                body.classList.remove('_lock');
            }
        });
    }); */

    let popupForm = callbackPopup.querySelector('form');
    popupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        callbackPopup.style.display = 'none';
        thanksPopup.style.display = 'block';
        popupForm.querySelectorAll('input').forEach(input => {
            input.value = '';
        });
    });

    const tabs = document.querySelectorAll('.tab');
    if (tabs) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelector('.tab--active').classList.remove('tab--active');
                document.querySelector('.tabs-content--active').classList.remove('tabs-content--active');
                document.getElementById(tab.getAttribute('data-tab')).classList.add('tabs-content--active');
                tab.classList.add('tab--active');
            });
        });
    }

    let visible = 7;
    const projectsGrid = document.querySelector('.projects__grid');
    let projectCards;
    if (projectsGrid) {
        projectCards = projectsGrid.querySelectorAll('.project-card');
        projectCards.forEach((card, i) => {
            if (i > visible - 1) {
                card.classList.add('hidden');
            }
        });
    }
    const projectsFilters = document.querySelector('.projects-filter');
    let projectsFiltersButtons;
    if (projectsFilters) {
        projectsFiltersButtons = projectsFilters.querySelectorAll('.projects-filter__btn');
        projectsFiltersButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                let activeFilter = btn.getAttribute('data-category-filter');
                if (activeFilter != 'all') {
                    projectCards.forEach(proj => {
                        proj.style.display = 'none';
                    });
                    document.querySelectorAll(`[data-project-category = ${activeFilter}]`).forEach(proj => {
                        proj.style.display = 'grid';
                    });
                } else {
                    projectCards.forEach(proj => {
                        proj.style.display = 'grid';
                    });
                }
                document.querySelector('.projects-filter__btn--active').classList.remove('projects-filter__btn--active');
                btn.classList.add('projects-filter__btn--active');
            });
        });
    }
    const moreProjectsBtn = document.querySelector('.projects__more');
    if (moreProjectsBtn) {
        moreProjectsBtn.addEventListener('click', function () {
            this.style.display = 'none';
            projectCards.forEach(card => {
                card.classList.remove('hidden');
            });
        });
    }

    const catalogGrid = document.querySelector('.catalog__grid');
    if (window.innerWidth < 1025 && catalogGrid) {
        catalogGrid.querySelectorAll('.device-item').forEach(card => {
            card.addEventListener('click', function () {
                card.classList.toggle('device-item--active');
            });
        });
    }
    if (catalogGrid) {
        document.addEventListener('mouseup', function (e) {
            let activeCard = catalogGrid.querySelector('.device-item--active');
            if (activeCard && activeCard != e.target) {
                activeCard.classList.remove('device-item--active');
            }
        });
    }

    const pageUp = document.querySelector('.page-up');
    pageUp.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    const footer = document.querySelector('.footer');
    const footerOffset = footer.offsetTop;
    const footerHeight = footer.getBoundingClientRect().height;

    window.addEventListener('scroll', function () {
        let scrolled = window.scrollY;
        if (scrolled > 700) {
            pageUp.classList.add('page-up--fixed');
        } else {
            pageUp.classList.remove('page-up--fixed');
        }
        if (scrolled >= footerOffset - footerHeight - page.children[page.children.length - 1].getBoundingClientRect().height) {
            pageUp.classList.remove('page-up--fixed');
            pageUp.classList.add('page-up--in-footer');
        } else {
            pageUp.classList.remove('page-up--in-footer');
            pageUp.classList.add('page-up--fixed');
        }
    });

    const page = document.querySelector('.page');
    if (page.children[page.children.length - 1].className === 'feedback') {
        pageUp.classList.add('page-up--white');
    } else {
        pageUp.classList.add('page-up--red');
    }

    const minusBtn = document.querySelector('.minus-btn');
    const plusBtn = document.querySelector('.plus-btn');

    if (minusBtn) {
        minusBtn.addEventListener('click', function (e) {
            e.preventDefault();
            let input = this.nextElementSibling;
            let value = parseInt(input.value);
            while (value > 0) {
                value--;
                break;
            }
            input.value = value;
        });
    }
    if (plusBtn) {
        plusBtn.addEventListener('click', function (e) {
            e.preventDefault();
            let input = this.previousElementSibling;
            let value = parseInt(input.value);
            value++;
            input.value = value;
        });
    }
    // wow js
    //new WOW().init();
});