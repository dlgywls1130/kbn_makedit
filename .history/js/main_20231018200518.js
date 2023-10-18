// 1. main banner

$('.slide_wrap').on('init', function(event, slick) {
  // 첫 로드 시 첫 번째 슬라이드에만 애니메이션 적용
  $(slick.$slides[0]).find('.slide_bg_img').css('animation', 'none');
  setTimeout(function() {
      $(slick.$slides[0]).find('.slide_bg_img').css('animation', 'zoomOut 2s forwards');
  }, 10);
}).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    // 모든 슬라이드의 애니메이션을 초기화합니다.
    $(slick.$slides).find('.slide_bg_img').css('animation', 'none');
}).on('afterChange', function(event, slick, currentSlide) {
    // 현재 슬라이드에만 애니메이션을 적용합니다.
    setTimeout(function() {
        $(slick.$slides[currentSlide]).find('.slide_bg_img').css('animation', 'zoomOut 2s forwards');
    }, 10);
}).slick({
  slidesToShow: 1,
  arrows: true,
  dots: true,
  autoplay: true,
  autoplaySpeed: 2000,
  fade: true,
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
    
  // 탭 클릭 시의 로직
  $('ul.tabs li').click(function() {
      var tab_id = $(this).attr('data-tab');
      var $tabContent = $("#" + tab_id);
      var $biobankWrapper = $('.biobank_tab_wrapper');

      if ($(this).hasClass('current')) {
          $(this).removeClass('current');
          $tabContent.removeClass('current');
      } else {
          $('ul.tabs li').removeClass('current');
          $('.tab-content').removeClass('current');

          $(this).addClass('current');
          $tabContent.addClass('current');
          
          // 스크롤 애니메이션
          $('html, body').animate({
              scrollTop: $biobankWrapper.offset().top
          }, 500);
          
          // biobank_top 버튼 보이기
          $('.biobank_top').fadeIn();
      }
  });
  
  // biobank_top 버튼 클릭 시의 로직
  $('.biobank_top').click(function() {
      $('html, body').animate({
          scrollTop: $('.biobank_wrap').offset().top
      }, 500);
  });
});




// 6. rolling banner
$('.rolling_slide').slick({
  slidesToShow: 7,
  slidesToScroll: 1,
  arrows: false,
  dots: false,
  autoplay: true,
  autoplaySpeed: 0, // 기본 속도를 0으로 설정
  cssEase: 'linear', // 선형 애니메이션 사용
  speed: 4000, // 이동 속도. 원하는 대로 조정하실 수 있습니다.
  infinite: true,
  pauseOnHover: false, // 마우스 오버시 멈춤 방지
  swipe: false, // 스와이프 기능 방지
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


//8. scroll fade

const spyEls = document.querySelectorAll('.scroll-spy')
// 요소들 반복 처리!
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({ // 감시할 장면(Scene)을 추가
      triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8 // 화면의 80% 지점에서 보여짐 여부 감시
    })
    .setClassToggle(spyEl, 'show') // 요소가 화면에 보이면 show 클래스 추가
    .addTo(new ScrollMagic.Controller()) // 컨트롤러에 장면을 할당(필수!)
})


//9.sample count animation

let hasAnimated = false; // 애니메이션이 한 번만 실행되게 하기 위한 플래그

const counters = document.querySelectorAll('.right_span p');
const sampleSection = document.querySelector('#sample');

const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !hasAnimated) {
        animateCounters();
        hasAnimated = true;
    }
}, {
    threshold: 0.1  // 적어도 10%의 타겟 요소가 뷰포트에 들어왔을 때 알림
});

observer.observe(sampleSection);

function animateCounters() {
    const animationDuration = 2000; // 2 seconds
    const updateFrequency = 50; // milliseconds

    counters.forEach(counter => {
        function updateCounter() {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace(/,/g, '');  // 콤마 제거
            const increment = (target / (animationDuration / updateFrequency));

            if (count < target) {
                counter.innerText = addCommas(Math.min(count + increment, target).toFixed(0));
                setTimeout(updateCounter, updateFrequency);
            } else {
                counter.innerText = addCommas(target.toFixed(0));
            }
        }

        function addCommas(nStr) {
            nStr += '';
            const x = nStr.split('.');
            let x1 = x[0];
            const x2 = x.length > 1 ? '.' + x[1] : '';
            const rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
        }

        const target = +counter.getAttribute('data-target');
        counter.innerText = '0';
        updateCounter();
    });
}


