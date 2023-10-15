// 1. main banner

$('.slide_wrap').slick({
    slidesToShow: 1,
    arrows: true,
    dots:true,
    autoplay: true,
  autoplaySpeed: 2000,
  infinite: true,
  prevArrow: '<div class="arrow slick-prev"></div>',
    nextArrow: '<div class="arrow slick-next"></div>',
  customPaging: function(slider, i) {
    var titles = ['Biobank', 'Support Center', 'On-line Searching'];
    return '<button>' + titles[i] + '</button>';
}
  });



  // 2. about acodian 

  const accordionItem = document.querySelectorAll(".accordion-item");

    accordionItem.forEach((el) =>
        el.addEventListener("click", () => {
            if (el.classList.contains("active")) {
                el.classList.remove("active");
            } else {
                accordionItem.forEach((el2) => el2.classList.remove("active"));
                el.classList.add("active");
            }
        })
    );
