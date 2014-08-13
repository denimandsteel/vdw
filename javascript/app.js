$(function() {

// Background fading.
var sectionSetter = function(whichWay) {
  return function(direction) {
    if (direction === whichWay) {
      $('body').attr('class', $(this).attr('id'));
    }
  }
}
$('section').waypoint(sectionSetter('down'), { offset: '25%' }); // When the top hits a quarter of the screen.
$('section').waypoint(sectionSetter('up'), {
  offset: function() {
    return -$(this).height() + $(window).height()/4; // When the bottom hits a quarter of the screen.
  }
});

// Newsletter form.
$('header a.highlight').click(function() {
  $('header').addClass('form-active');
  // Wait to trigger focus, otherwise page jumps up.
  setTimeout(function() {
    $('header input[type="email"]').focus();
  }, 250);
  return false;
});
$('header input.highlight').click(function() {
  $('header').removeClass('form-active');
  return true;
});
$('header input[type="email"]').keyup(function(e) {
  // Escape key.
  if (e.keyCode === 27) {
    $('header').removeClass('form-active');
  }
});

// Background crop.
var resizeBackground = function() {
  var bottomOfPage = $('#contact').height() + $('#contact').offset().top + 150; // Top of page margin (#hero) + margin at bottom (#team).
  var cropHeight = bottomOfPage * (334.469/$(window).width());
  // alert(cropHeight)
  $('svg').attr('height', cropHeight + 'px');
  $('svg').get(0).setAttribute("viewBox", '0 0 334.469 ' + cropHeight);
  $('svg').attr('enable-background', 'new 0 0 334.469 ' + cropHeight);
};
setTimeout(resizeBackground, 500); // Wait long after DOM has finished.
$(window).resize(resizeBackground);

// Sponsor shuffling and masonry.
// $.shuffle('.sponsors div img');
var $container = $('.sponsors div');
$container.imagesLoaded( function() {
  $container.masonry({
    itemSelector: 'img'
  });
});

});
