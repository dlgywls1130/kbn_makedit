// main banner

$('.slide_wrap').slick({
    slidesToShow: 1,
    arrows: true,
    dots:true,
    autoplay: true,
  autoplaySpeed: 2000,
  infinite: true,
  prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
  customPaging: function(slider, i) {
    var titles = ['Biobank', 'Support Center', 'On-line Searching'];
    return '<button>' + titles[i] + '</button>';
}
  });