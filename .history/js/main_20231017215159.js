// 1. main banner

$('.slide_wrap').slick({
  slidesToShow: 1,
  arrows: true,
  dots: true,
  autoplay: true,
  autoplaySpeed: 2000,
  infinite: true,
  prevArrow: '<div class="arrow slick-prev"></div>',
  nextArrow: '<div class="arrow slick-next"></div>',
  customPaging: function(slider, i) {
      var titles = ['Biobank', 'Support Center', 'On-line Searching'];
      return '<button>' + titles[i] + '</button>';
  },
  // 슬라이드가 변하기 전에 애니메이션을 재시작합니다.
  beforeChange: function(event, slick, currentSlide, nextSlide) {
      // 모든 슬라이드 애니메이션을 초기화
      $('.slide_wrap .slide_list').css('animation', 'none');
      // 바로 다음 슬라이드에 애니메이션을 적용
      setTimeout(function() {
          $('.slide_wrap .slide_list').eq(nextSlide).css('animation', 'bgZoomOut 2s');
      });
  }
});




  // 2. about acodian 

  const accordionItem = document.querySelectorAll(".accordion-item");
  const acodianCircleImg = document.querySelector(".acodian_circle img");
  
  accordionItem.forEach((el, index) =>
      el.addEventListener("click", () => {
          if (el.classList.contains("active")) {
              el.classList.remove("active");
              // 원래의 원 모양의 이미지로 변경
              acodianCircleImg.src = "./image/acodian.png";
              // 아이콘 이미지 원래대로 변경
              el.querySelector(".acodian_icon img").src = `./image/about_ico${index + 1}.png`;
          } else {
              // 기존에 active된 아이템의 아이콘 이미지를 원래대로 변경
              const activeItem = document.querySelector(".accordion-item.active");
              if(activeItem) {
                  const activeIndex = Array.from(accordionItem).indexOf(activeItem);
                  activeItem.querySelector(".acodian_icon img").src = `./image/about_ico${activeIndex + 1}.png`;
              }
  
              // 모든 active 클래스 제거
              accordionItem.forEach((el2) => el2.classList.remove("active"));
              // 선택된 아이템에 active 클래스 추가
              el.classList.add("active");
              // 원 모양의 이미지 변경
              acodianCircleImg.src = `./image/acodian0${index + 1}.png`;
              // 선택된 아이템의 아이콘 이미지 변경
              el.querySelector(".acodian_icon img").src = `./image/about_ico${index + 1}_w.png`;
          }
      })
  );
  
  
//3.kbn

document.addEventListener('DOMContentLoaded', function() {
  let buttons = document.querySelectorAll('.location');
  let closeButtons = document.querySelectorAll('.close-popup');

  buttons.forEach(function(button) {
      button.addEventListener('click', function(e) {
          let popupId = e.target.getAttribute('data-location') + '-popup';
          let popup = document.getElementById(popupId);
          if(popup) {
              // 모든 팝업을 숨깁니다.
              document.querySelectorAll('.popup').forEach(function(p) {
                  p.style.display = 'none';
              });

              // 클릭한 버튼의 위치를 기반으로 팝업의 위치를 설정합니다.
              popup.style.left = e.target.offsetLeft + 'px';
              popup.style.top = e.target.offsetTop + e.target.offsetHeight + 'px';
              
              // 팝업을 표시합니다.
              popup.style.display = 'block';
          }
      });
  });

  closeButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        let parentPopup = this.closest('.popup'); // 가장 가까운 .popup 부모 요소를 찾습니다.
        if(parentPopup) {
            parentPopup.style.display = 'none'; // 팝업을 숨깁니다.
        }
    });
});
});


// 4. Distribution slide

let progressPercentage = 40;
let progressInterval;

function startProgressBar() {
  clearInterval(progressInterval);
  $('.progress-bar').css('width', '0%');
  
  let totalWidth = parseInt($('.progress-container').css('width'));
  let maxProgressWidth = (totalWidth * progressPercentage) / 100;
  
  let increment = (maxProgressWidth / 2) / 50;
  
  progressInterval = setInterval(function() {
    let currentWidth = parseInt($('.progress-bar').css('width'));
    
    if (currentWidth < maxProgressWidth) {
      $('.progress-bar').css('width', currentWidth + increment + 'px');
    } else {
      clearInterval(progressInterval);
      $('.text-list').slick('slickNext');
    }
  }, 20);
}

$('.text-list').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  dots: false,
  autoplay: false,
  infinite: true,
}).on('init', function(event, slick){
  // 초기화 후 첫 번째 슬라이드에 active-slide 클래스 추가
  $('.text-list .slick-slide:first-child').addClass('active-slide');
  startProgressBar();  // 초기화시 프로그레스바 시작
}).on('beforeChange', function(event, slick, currentSlide, nextSlide){
  // 모든 슬라이드의 활성화 상태를 제거합니다.
  $('.text-list .slick-slide').removeClass('active-slide');
  // 다음에 활성화될 슬라이드에 active-slide 클래스 추가
  $(`.text-list .slick-slide[data-slick-index="${nextSlide}"]`).addClass('active-slide');
}).on('afterChange', function(event, slick, currentSlide) {
  startProgressBar();
});

$(document).ready(function() {
  $('.text-list').slick('slickGoTo', 0);  // 첫 번째 슬라이드로 이동
});




// 5.biobank_Tab
$(document).ready(function() {
  $('ul.tabs li').click(function() {
      var tab_id = $(this).attr('data-tab');

      // 만약 현재 탭이 이미 활성화된 상태라면
      if ($(this).hasClass('current')) {
          $(this).removeClass('current');
          $("#" + tab_id).removeClass('current');
      } else {
          $('ul.tabs li').removeClass('current');
          $('.tab-content').removeClass('current');

          $(this).addClass('current');
          $("#" + tab_id).addClass('current');
      }
  });
});


// 6. rolling banner
$('.rolling_slide').slick({
  slidesToShow: 7,
  slidesToScroll: 1,
  arrows: false,
  dots:false,
  autoplay: true,
autoplaySpeed: 2000,
infinite: true,
});


//7.nav scroll
$(document).ready(function() {
  $('.nav_list a').click(function(e) {
      e.preventDefault(); // 기본 이벤트 동작을 막음

      var target = $(this).attr('href'); // 클릭한 링크의 href 값을 가져옴
      var targetPosition = $(target).offset().top; // 해당 섹션의 위치 값을 가져옴

      $('html, body').animate({
          scrollTop: targetPosition
      }, 1000); // 1초 동안 해당 위치로 스크롤
  });
});



