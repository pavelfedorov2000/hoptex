window.addEventListener('DOMContentLoaded', function () {
    const asideFiltersTitles = document.querySelectorAll('.aside-filters__item-title');
    asideFiltersTitles.forEach(title => {
        title.addEventListener('click', () => {
            title.classList.toggle('aside-filters__item-title--active');
            title.nextElementSibling.classList.toggle('aside-filters__item-checks--active');
        });
    });

    const filterBtn = document.querySelector('.filter-btn');
    const asideFilters = document.querySelector('.aside-filters');
    const asideFiltersCloseBtn = document.querySelector('.aside-filters__close');
    if (filterBtn) {
        filterBtn.addEventListener('click', () => {
            asideFilters.classList.add('aside-filters--active');
            body.classList.add('_lock');
        });
    }
    if (asideFilters && asideFiltersCloseBtn) {
        asideFiltersCloseBtn.addEventListener('click', () => {
            asideFilters.classList.remove('aside-filters--active');
            body.classList.remove('_lock');
        });
    }
});