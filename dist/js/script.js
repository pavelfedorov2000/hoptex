function DynamicAdapt(type) {
    this.type = type;
}

DynamicAdapt.prototype.init = function () {
    const _this = this;
    // массив объектов
    this.оbjects = [];
    this.daClassname = "_dynamic_adapt_";
    // массив DOM-элементов
    this.nodes = document.querySelectorAll("[data-da]");

    // наполнение оbjects объктами
    for (let i = 0; i < this.nodes.length; i++) {
        const node = this.nodes[i];
        const data = node.dataset.da.trim();
        const dataArray = data.split(",");
        const оbject = {};
        оbject.element = node;
        оbject.parent = node.parentNode;
        оbject.destination = document.querySelector(dataArray[0].trim());
        оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
        оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.оbjects.push(оbject);
    }

    this.arraySort(this.оbjects);

    // массив уникальных медиа-запросов
    this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
        return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
    }, this);
    this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
        return Array.prototype.indexOf.call(self, item) === index;
    });

    // навешивание слушателя на медиа-запрос
    // и вызов обработчика при первом запуске
    for (let i = 0; i < this.mediaQueries.length; i++) {
        const media = this.mediaQueries[i];
        const mediaSplit = String.prototype.split.call(media, ',');
        const matchMedia = window.matchMedia(mediaSplit[0]);
        const mediaBreakpoint = mediaSplit[1];

        // массив объектов с подходящим брейкпоинтом
        const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
            return item.breakpoint === mediaBreakpoint;
        });
        matchMedia.addListener(function () {
            _this.mediaHandler(matchMedia, оbjectsFilter);
        });
        this.mediaHandler(matchMedia, оbjectsFilter);
    }
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
    if (matchMedia.matches) {
        for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.moveTo(оbject.place, оbject.element, оbject.destination);
        }
    } else {
        for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            if (оbject.element.classList.contains(this.daClassname)) {
                this.moveBack(оbject.parent, оbject.element, оbject.index);
            }
        }
    }
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
    element.classList.add(this.daClassname);
    if (place === 'last' || place >= destination.children.length) {
        destination.insertAdjacentElement('beforeend', element);
        return;
    }
    if (place === 'first') {
        destination.insertAdjacentElement('afterbegin', element);
        return;
    }
    destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== undefined) {
        parent.children[index].insertAdjacentElement('beforebegin', element);
    } else {
        parent.insertAdjacentElement('beforeend', element);
    }
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
    const array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
    if (this.type === "min") {
        Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) {
                    return 0;
                }

                if (a.place === "first" || b.place === "last") {
                    return -1;
                }

                if (a.place === "last" || b.place === "first") {
                    return 1;
                }

                return a.place - b.place;
            }

            return a.breakpoint - b.breakpoint;
        });
    } else {
        Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) {
                    return 0;
                }

                if (a.place === "first" || b.place === "last") {
                    return 1;
                }

                if (a.place === "last" || b.place === "first") {
                    return -1;
                }

                return b.place - a.place;
            }

            return b.breakpoint - a.breakpoint;
        });
        return;
    }
};

const da = new DynamicAdapt("max");
da.init();
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
const promoSlider = new Swiper('.promo__slider', {
    loop: true,
    speed: 1000,
    autoplay: {
        delay: 3000,
    },
    pagination: {
        el: '.promo-pagination',
        clickable: true,
    },
});

const newsSlider = new Swiper('.slider-news__slider', {
    loop: true,
    speed: 1000,
    spaceBetween: 15,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }, 
});

const homeRecentProjectsSlider = new Swiper('.p-home-projects__slider', {
    loop: true,
    speed: 1000,
    spaceBetween: 20,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }, 
    breakpoints: {
        768: {
            spaceBetween: 50,
            slidesPerView: 2,
        },
        1025: {
            spaceBetween: 120,
            slidesPerView: 2,
        }
    }
});

homeRecentProjectsSlider.on('slideChange', function () {
    let lazyLoadInstance = new LazyLoad();
});

const projectsSlider = new Swiper('.slider-projects__slider', {
    loop: true,
    speed: 1000,
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }, 
    breakpoints: {
        768: {
            spaceBetween: 30,
            slidesPerView: 2,
        },
        1025: {
            spaceBetween: 60,
            slidesPerView: 2,
        }
    }
});
projectsSlider.on('slideChange', function () {
    let lazyLoadInstance = new LazyLoad();
});

const photogallerySlider = new Swiper('.photogallery__slider', {
    loop: true,
    speed: 1000,
    spaceBetween: 20,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }, 
    breakpoints: {
        768: {
            spaceBetween: 25,
            slidesPerView: 2,
        },
        1025: {
            spaceBetween: 37.5,
            slidesPerView: 3,
        }
    },
});
photogallerySlider.on('slideChange', function () {
    let lazyLoadInstance = new LazyLoad();
});

const gallerySlider = new Swiper('.gallery__slider', {
    loop: true,
    speed: 1000,
    spaceBetween: 15,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }, 
    breakpoints: {
        768: {
            spaceBetween: 30,
            slidesPerView: 2,
        },
        1025: {
            spaceBetween: 60,
            slidesPerView: 3,
        }
    }
});



