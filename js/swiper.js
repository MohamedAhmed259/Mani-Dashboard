// إعدادات Swiper بدون autoplay
let swiperOptions = {
    loop: true,
    spaceBetween: 30,
    speed: 500,
    pagination: {
        el: '.swiper-pagination',
        type: 'custom',
        clickable: true,
        
        renderCustom: (swiper, current, total) => {
            const maxPagesToShow = 5; // عدد الأرقام التي ستظهر في الباجنيشن
            let paginationHTML = '';

            let start = current - Math.floor(maxPagesToShow / 2);
            let end = current + Math.floor(maxPagesToShow / 2);

            if (start < 1) {
                start = 1;
                end = Math.min(total, maxPagesToShow);
            }

            if (end > total) {
                end = total;
                start = Math.max(1, total - maxPagesToShow + 1);
            }

            // إنشاء الأرقام من start إلى end
            for (let i = start; i <= end; i++) {
                paginationHTML += `<span class="swiper-pagination-number ${i === current ? 'active' : ''}" data-index="${i}">${i}</span>`;
            }

            return paginationHTML;
        },
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        }
    }
};

// تهيئة Swiper
let mySwiper = initSwiper();

// وظيفة تهيئة Swiper
function initSwiper() {
    // تفعيل autoplay للشاشات الصغيرة فقط
    // if (window.innerWidth < 768) {
    //     swiperOptions.autoplay = {
    //         delay: 0,
    //         disableOnInteraction: false,
    //     };
    // } else {
    //     swiperOptions.autoplay = false;
    // }

    // تهيئة Swiper بالإعدادات النهائية
    const swiper = new Swiper('.card-wrapper', swiperOptions);

    // إضافة أحداث النقر على أزرار الباجنيشن بعد التهيئة
    addPaginationClickEvent(swiper);

    return swiper;
}

// وظيفة لإضافة أحداث النقر على الأرقام في الباجنيشن
function addPaginationClickEvent(swiper) {
    // في البداية إزالة الأحداث القديمة لضمان عدم تضاعف الأحداث
    document.querySelectorAll('.swiper-pagination-number').forEach((number) => {
        number.removeEventListener('click', handlePaginationClick);
    });

    // إضافة حدث النقر على الأرقام بعد أن يتم إضافة الباجنيشن
    document.querySelectorAll('.swiper-pagination-number').forEach((number) => {
        number.addEventListener('click', handlePaginationClick);
    });

    function handlePaginationClick(event) {
        const index = parseInt(event.target.dataset.index) - 1; // خصم 1 للتأكد من توافق الفهرس مع الفهرس الصحيح في Swiper
        swiper.slideTo(index); // الانتقال إلى الشريحة المطلوبة

        // تحديث الأرقام في الباجنيشن لتمييز الرقم النشط
        document.querySelectorAll('.swiper-pagination-number').forEach((number) => {
            number.classList.remove('active');
        });
        event.target.classList.add('active');
    }
}

// إعادة تهيئة Swiper عند تغيير حجم الشاشة
window.addEventListener('resize', () => {
    if (mySwiper) {
        mySwiper.destroy(true, true); // تدمير Swiper الحالي
    }
    mySwiper = initSwiper(); // إعادة تهيئة Swiper بعد التدمير
});
