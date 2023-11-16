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
  autoplaySpeed: 4000,
  fade: true,
  infinite: true,
  prevArrow: '<div class="arrow slick-prev"></div>',
  nextArrow: '<div class="arrow slick-next"></div>',
  customPaging: function(slider, i) {
      var titles = ['01', '02', '03'];
      var mobileTitles = ['01', '02', '03'];

      // 화면의 너비에 따라 해당 텍스트 배열 선택
      var chosenTitles = window.innerWidth <= 1400 ? mobileTitles : titles;
      
      return '<button>' + chosenTitles[i] + '</button>';
  }
});





// 2. about acodian 
const accordionItem = document.querySelectorAll(".accordion-item");
const acodianCircleImg = document.querySelector(".acodian_circle img");

accordionItem.forEach((el, index) => {
    el.addEventListener("click", () => {
        toggleAcodianItem(el, index);
    });

    // Add hover event
    el.addEventListener("mouseenter", () => {
        el.querySelector(".acodian_icon img").src = `./image/about_ico${index + 1}_w.png`;
    });

    // Add hover out event
    el.addEventListener("mouseleave", () => {
        if (!el.classList.contains("active")) {
            el.querySelector(".acodian_icon img").src = `./image/about_ico${index + 1}.png`;
        }
    });
});

function toggleAcodianItem(el, index) {
    if (el.classList.contains("active")) {
        el.classList.remove("active");
        acodianCircleImg.src = "./image/acodian.png";
        el.querySelector(".acodian_icon img").src = `./image/about_ico${index + 1}.png`;
    } else {
        const activeItem = document.querySelector(".accordion-item.active");
        if (activeItem) {
            const activeIndex = Array.from(accordionItem).indexOf(activeItem);
            activeItem.querySelector(".acodian_icon img").src = `./image/about_ico${activeIndex + 1}.png`;
        }

        accordionItem.forEach((el2) => el2.classList.remove("active"));
        el.classList.add("active");
        acodianCircleImg.src = `./image/acodian0${index + 1}.png`;
        el.querySelector(".acodian_icon img").src = `./image/about_ico${index + 1}_w.png`;
    }
}

  
//3.kbn

document.addEventListener('DOMContentLoaded', function() {
    let buttons = document.querySelectorAll('.location');
    let closeButtons = document.querySelectorAll('.close-popup');
  
    buttons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            let popupId = e.target.getAttribute('data-location') + '-popup';
            let popup = document.getElementById(popupId);
            
            // 모든 팝업을 숨기고, 모든 버튼의 active 클래스를 제거합니다.
            document.querySelectorAll('.popup').forEach(function(p) {
                p.style.display = 'none';
            });
            document.querySelectorAll('.location').forEach(function(b) {
                b.classList.remove('active');
            });
            
            if(popup) {
                if(window.innerWidth <= 768) { // 모바일 환경
                    popup.style.left = '50%';
                    popup.style.top = '80%';
                    popup.style.transform = 'translate(-50%, -50%)';
                } else { // 웹 환경
                    popup.style.left = e.target.offsetLeft + 'px';
                    popup.style.top = e.target.offsetTop + e.target.offsetHeight + 'px';
                    popup.style.transform = '';
                }
                
                // 팝업을 표시하고, 버튼에 active 클래스를 추가합니다.
                popup.style.display = 'block';
                e.target.classList.add('active');
            }
        });
    });
  
    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            let parentPopup = this.closest('.popup');
            if(parentPopup) {
                parentPopup.style.display = 'none'; // 팝업을 숨깁니다.
                
                // 모든 버튼의 active 클래스를 제거합니다.
                document.querySelectorAll('.location').forEach(function(b) {
                    b.classList.remove('active');
                });
            }
        });
    });
  });
  
  




// 4. Distribution slide
let startPercentage = 0;
let progressPercentage;
let progressInterval;

function isMobile() {
  return window.innerWidth <= 768;
}

const mobileDevice = isMobile();
progressPercentage = mobileDevice ? 100 : 30;

function startProgressBar() {
  clearInterval(progressInterval);

  let totalWidth = parseInt($('.progress-container').css('width'));
  let startWidth = (totalWidth * startPercentage) / 100;
  $('.progress-bar').css('width', startWidth + 'px');

  let maxProgressWidth = (totalWidth * progressPercentage) / 100;

  const intervalDuration = 10;
  const totalIntervals = 5000 / intervalDuration;
  let increment = (maxProgressWidth - startWidth) / totalIntervals;

  progressInterval = setInterval(function() {
    let currentWidth = parseInt($('.progress-bar').css('width'));

    if (currentWidth < maxProgressWidth) {
      $('.progress-bar').css('width', currentWidth + increment + 'px');
    } else {
      clearInterval(progressInterval);
      $('.text-list').slick('slickNext');
    }
  }, intervalDuration);
}

let slideConfig = {
  slidesToShow: mobileDevice ? 1 : 3,
  slidesToScroll: 1,
  dots: false,
  autoplay: false,
  infinite: true,
  prevArrow: '<div class="slide_arrow_wrapper"><div class="arrow slick-prev"></div><ul class="slick-dots"><li><button>01</button></li><li><button>02</button></li><li><button>03</button></li><li><button>04</button></li><li><button>05</button></li></ul><div class="arrow slick-next"></div></div>',
  nextArrow: '',
};

$('.text-list').slick(slideConfig).on('init', function(event, slick) {
    $('.text-list .slick-slide:first-child').addClass('active-slide');
    startProgressBar();
  }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    // 현재 활성화된 슬라이드에서 active-slide 클래스 제거
    $('.text-list .slick-slide').removeClass('active-slide');
  }).on('afterChange', function(event, slick, currentSlide) {
    // 변경된 슬라이드에 active-slide 클래스 추가
    $(`.text-list .slick-slide[data-slick-index="${currentSlide}"]`).addClass('active-slide');
    startProgressBar();
  })

// Add event listener for dot click
$('.slick-dots li button').on('click', function() {
  let dotIndex = $(this).parent().index();
  $('.text-list').slick('slickGoTo', dotIndex);
});

$(document).ready(function() {
  $('.text-list').slick('slickGoTo', 0);
});




// 6. rolling banner
$('.rolling_slide').slick({
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    speed: 4000,
    infinite: true,
    pauseOnHover: false,
    swipe: false,
    responsive: [
      {
        breakpoint: 768, // 768px 이하의 화면 크기에서 적용될 설정
        settings: {
          slidesToShow: 2, // 모바일에서 보여질 슬라이드 수
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 0,
          cssEase: 'linear',
          speed: 4000,
          pauseOnHover: false,
          swipe: false,
        }
      }
    ]
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
  
  
  // 10. menu responsive
  
  const openSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
  </svg>`;
  
  const closeSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
  </svg>`;
  
  const navbarMenu = document.querySelector('.nav_list');
  const navbarToggle = document.querySelector('.mobile_menu');
  const headerElement = document.querySelector('header');
  
  navbarToggle.addEventListener('click', () => {
      navbarMenu.classList.toggle('open');
    
      // 아이콘 변경 및 배경색 변경
      if (navbarMenu.classList.contains('open')) {
          navbarToggle.innerHTML = closeSVG;
          headerElement.style.backgroundColor = '#E8E9F1';
      } else {
          navbarToggle.innerHTML = openSVG;
          headerElement.style.backgroundColor = '';  // 초기 배경색으로 변경
      }
  });
  
  // Navbar 메뉴 클릭시 메뉴를 자동으로 닫아줌
  navbarMenu.addEventListener('click', () => {
      navbarMenu.classList.remove('open');
      navbarToggle.innerHTML = openSVG; // 아이콘을 초기 상태로 변경
      headerElement.style.backgroundColor = ''; // 초기 배경색으로 변경
  });

  
  

// 5.biobank_Tab
$(document).ready(function() {

    function initializeSlick() {
        if ($(window).width() <= 1000) {
            if (!$('.tab-content .tab-biobank').hasClass('slick-initialized')) {
                $('.tab-content .tab-biobank').slick({
                    dots: false,
                    arrows: false,
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: '0',
                });
            }
        } else {
            if ($('.tab-content .tab-biobank').hasClass('slick-initialized')) {
                $('.tab-content .tab-biobank').slick('unslick');
            }
        }
    }
  
    function updateSlideNumber() {
      $('.tab-content .tab-biobank').each(function() {
          if ($(this).hasClass('slick-initialized')) {
              var currentSlide = $(this).slick('slickCurrentSlide') + 1;
              var totalSlides = $(this).slick('getSlick').slideCount;
              var slideInfo = currentSlide + '/' + totalSlides;
              $(this).siblings('#slide-number').text(slideInfo);
          }
      });
  }
  
    $('.tab-content .tab-biobank').on('afterChange', function() {
        updateSlideNumber();
    });
  
    $('ul.tabs li').click(function() {
        var tab_id = $(this).attr('data-tab');
        var $tabContent = $("#" + tab_id);
  
        if ($(this).hasClass('current')) {
            $(this).removeClass('current');
            $tabContent.removeClass('current').hide();
            $('.biobank_top').hide();
            $('#slide-number').hide();
        } else {
            $('ul.tabs li').removeClass('current');
            $('.tab-content').removeClass('current').hide();
  
            $(this).addClass('current');
            $tabContent.addClass('current').show();
            $('.biobank_top').show();
  
            // Scroll to the tab content
            $('html, body').animate({
                scrollTop: $tabContent.offset().top
            }, 500);
  
            setTimeout(function() {
                if ($('.tab-content .tab-biobank').hasClass('slick-initialized')) {
                    $('.tab-content .tab-biobank').slick('refresh');
                } else {
                    initializeSlick();
                }
                updateSlideNumber();
            }, 100);
  
            $('#slide-number').show();
        }
    });
  
    $('.biobank_top').click(function() {
        $('html, body').animate({
            scrollTop: $('.biobank_wrap').offset().top
        }, 500);
    });
  
    initializeSlick();
  
    function debounce(func, wait) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
  
    $(window).resize(debounce(function() {
        initializeSlick();
    }, 250));
  
    var $biobankTop = $('.biobank_top');
    $(window).scroll(function() {
        var contentTop = $('.tab-content.current').offset();
        var contentBottom = contentTop.top + $('.tab-content.current').height();
    
        if (contentTop && $(window).scrollTop() + $(window).height() >= contentTop.top && $(window).scrollTop() <= contentBottom) {
            $biobankTop.fadeIn();
        } else {
            $biobankTop.fadeOut();
        }
    });
  });
  