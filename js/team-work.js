document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper', {
        slidesPerView: 4, // عرض عمودين
        grid: {
            rows: 2, // صفين
            fill: 'column', // تعبئة العناصر بشكل أعمدة
        },
        spaceBetween: 20, // المسافة بين البطاقات
        slidesPerGroup: 1, // التحرك بمقدار بطاقتين عند التنقل
        pagination: {
            el: '.swiper-pagination',
            type: 'custom',
            renderCustom: function (swiper, current, total) {
                let numbers = [];
                let start = Math.max(current - 2, 1); // عرض 5 أرقام كحد أقصى حول الرقم الحالي
                let end = Math.min(current + 2, total);
                for (let i = start; i <= end; i++) {
                    numbers.push(i);
                }
                return numbers.map((number) => {
                    return `<span class="swiper-pagination-bullet" data-index="${number}">${number}</span>`;
                }).join('');
            }
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        loop: false, // يمكنك تفعيل التكرار إذا أردت
    });

    // إضافة مستمع لحدث النقر على الـpagination
    document.querySelector('.swiper-pagination').addEventListener('click', (event) => {
        if (event.target.classList.contains('swiper-pagination-bullet')) {
            const index = parseInt(event.target.dataset.index) - 1; // خصم 1 للتأكد من توافق الفهرس مع فهرس Swiper
            swiper.slideTo(index); // الانتقال إلى الشريحة المطلوبة
        }
    });

    // تحديث الـpagination عند تغيير الشريحة
    swiper.on('slideChange', () => {
        const currentIndex = swiper.realIndex + 1; // الرقم الخاص بالشريحة الحالية (1-based index)
        
        // تحديث الـpagination لتمييز الرقم النشط
        document.querySelectorAll('.swiper-pagination-bullet').forEach((bullet) => {
            bullet.classList.remove('active'); // إزالة التنسيق السابق
            if (parseInt(bullet.dataset.index) === currentIndex) {
                bullet.classList.add('active'); // إضافة التنسيق للرقم النشط
            }
        });
    });

    // تمييز الرقم النشط عند تحميل الصفحة
    const initialIndex = swiper.realIndex + 1;
    document.querySelectorAll('.swiper-pagination-bullet').forEach((bullet) => {
        if (parseInt(bullet.dataset.index) === initialIndex) {
            bullet.classList.add('active'); // تمييز الرقم النشط في البداية
        }
    });
});
// الحصول على كل الأزرار
// const buttons = document.querySelectorAll(".swiper-slide .card-link button");
// let activeState = null; // متغير لتتبع العنصر الظاهر حاليًا

// buttons.forEach((button) => {
//     const state = button.querySelector(".status");

//     button.addEventListener("click", (event) => {
//         event.stopPropagation(); // لمنع انتشار الحدث عند النقر على الزر

//         // إخفاء الحالة السابقة إذا كانت ظاهرة وتختلف عن الحالة الحالية
//         if (activeState && activeState !== state) {
//             activeState.style.display = "none";
//         }

//         // تبديل حالة العرض للعنصر الحالي
//         state.style.display = state.style.display === "none" ? "flex" : "none";

//         // تحديث العنصر النشط
//         activeState = state.style.display === "flex" ? state : null;
//     });
// });

// // إخفاء الحالة عند النقر في أي مكان آخر في الصفحة
// document.addEventListener("click", () => {
//     if (activeState) {
//         activeState.style.display = "none";
//         activeState = null;
//     }
// });
