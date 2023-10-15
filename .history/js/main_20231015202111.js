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

    button.addEventListener('click', function() {
      let parentPopup = this.closest('.popup'); // 가장 가까운 .popup 부모 요소를 찾습니다.
      if(parentPopup) {
          parentPopup.style.display = 'none'; // 팝업을 숨깁니다.
      }
  });
});
