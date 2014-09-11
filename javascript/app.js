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
$('header a.highlight, .newsletter-link').click(function() {
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
  console.log('cool');
  var bottomOfPage = $('#contact').height() + $('#contact').offset().top; // Top of page margin (#hero) + margin at bottom (#team).
  var cropHeight = bottomOfPage * (334.469/$(window).width());
  // alert(cropHeight)
  $('svg').attr('height', cropHeight + 'px');
  $('svg').get(0).setAttribute("viewBox", '0 0 334.469 ' + cropHeight);
  $('svg').attr('enable-background', 'new 0 0 334.469 ' + cropHeight);
};
setTimeout(resizeBackground, 500); // Wait long after DOM has finished.
$(window).resize(function() {
  setTimeout(resizeBackground, 500); // Wait for masonry to shuffle.
});

// Sponsor shuffling and masonry.
// $.shuffle('#event-sample > div .event');
var $container = $('.support div');
$container.imagesLoaded( function() {
  $container.masonry({
    itemSelector: 'img, .supporter'
  });
});

$('#event-sample > div').masonry({
  itemSelector: '.event'
});

// Let's make a map!
var map = new L.Map('map-event-15', {
  center: new L.LatLng(37.8, -122.4),
  zoom: 10,
  scrollWheelZoom: false,
  attributionControl: false,
});
map.addLayer(new L.StamenTileLayer('toner-lite', {
// map.addLayer(new L.StamenTileLayer('toner', {
  detectRetina: true,
}));
var group = new L.featureGroup();
group.addTo(map);

var infoStations = new L.featureGroup();
infoStations.addTo(map);

// var group2 = new L.featureGroup();
// group2.addTo(map);

// {% for post in site.categories.event-15 %}
  // L.marker([{{ post.latitude }}, {{ post.longitude }}]).addTo(group);
// {% endfor %}
L.marker([49.2608024, -123.113944], { icon: L.divIcon({ className: 'marker', iconSize: 28, html: '<span>1</span>' }) }).addTo(group);
// L.marker([49.2608024, -123.113944]).addTo(group2);
L.marker([49.2818012, -123.1097559], { icon: L.divIcon({ className: 'marker', iconSize: 28, html: '<span>2</span>' }) }).addTo(group);

L.marker([49.2558024, -123.112944], { icon: L.divIcon({ className: 'marker info', iconSize: 28 }) }).addTo(infoStations);

map.fitBounds(group.getBounds());

$('.day-header').on('click', function() {
  $(this).parents('.day-events').toggleClass('active');
  // $content = $(this).next();
  //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
  // $content.slideToggle(500, function () {
    //execute this after slideToggle is done
    //change text of header based on visibility of content div
  // });
  return false;
});

});
