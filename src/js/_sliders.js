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