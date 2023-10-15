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
  const acodianCircleImg = document.querySelector(".acodian_circle img");
  
  accordionItem.forEach((el, index) =>
      el.addEventListener("click", () => {
          // 아이콘 이미지 변경
          accordionItem.forEach((el2, idx) => {
              const iconImg = el2.querySelector(".acodian_icon img");
              if(iconImg) {
                  iconImg.src = `./image/about_ico${idx + 1}${el2.classList.contains("active") ? "" : "_w"}.png`;
              }
          });
  
          if (el.classList.contains("active")) {
              el.classList.remove("active");
              // 원래의 원 모양의 이미지로 변경
              acodianCircleImg.src = "./image/acodian.png";
          } else {
              accordionItem.forEach((el2) => el2.classList.remove("active"));
              el.classList.add("active");
              // 아코디언이 열리면 원 모양의 이미지 변경
              acodianCircleImg.src = `./image/acodian0${index + 1}.png`;
  
              // 아이콘 이미지 변경 (선택된 아이템)
              const selectedIconImg = el.querySelector(".acodian_icon img");
              if(selectedIconImg) {
                  selectedIconImg.src = `./image/about_ico${index + 1}_w.png`;
              }
          }
      })
  );
  
