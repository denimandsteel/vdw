$(document).ready(function() {


// Events open/close.
$('.day-header').on('click', function() {
  $(this).parents('.day-events').toggleClass('active');
  $.waypoints('refresh');
  //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
  // $content.slideToggle(500, function () {
    //execute this after slideToggle is done
    //change text of header based on visibility of content div
  // });
  return false;
});

// Event current day and past days.
$('#event-' + (new Date).getDate() + ' .day-header').addClass('current');
$('#event-' + (new Date).getDate() + '').prevAll('.day-events').find('.day-header').addClass('done');

$('.mobile-toggle').click(function() {
  $('header').toggleClass('active');
});
$('header nav a').click(function() {
  $('header').removeClass('active');
});

// Let's make a bunch of maps!
if (typeof vdwEvents !== 'undefined') {

for (var date in vdwEvents) {
  if (vdwEvents.hasOwnProperty(date)) {
    var map = new L.Map(date, {
      center: new L.LatLng(49.28214015975995, -123.13854217529297),
      zoom: 12,
      scrollWheelZoom: false,
      attributionControl: false,
      layers: new L.StamenTileLayer('toner-lite', { detectRetina: true }),
      // layers: new L.tileLayer('https://{s}.tiles.mapbox.com/v4/carlingborne.ijk72kc4/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2FybGluZ2Jvcm5lIiwiYSI6Ii1YdFRDUEUifQ.IoeTgzoXnKhH-Z-QP10c9A', { detectRetina: true }),
    });
    
    var oms = new OverlappingMarkerSpiderfier(map, {nearbyDistance: 1});
    var popup = new L.Popup();
    
    oms.addListener('spiderfy', function(markers) {
      // console.log(markers);
      markers.forEach(function(marker, i) {
        marker.setIcon( L.divIcon({ className: 'marker', iconSize: 28, html: '<span>' + marker.options.alt + '</span>' }) );
      });
    });
    oms.addListener('unspiderfy', function(markers) {
      markers.forEach(function(marker, i) {
        marker.setIcon( L.divIcon({ className: 'marker', iconSize: 28, html: '<span>+</span>' }) );
      });
    });
    
    vdwEvents[date].forEach(function(event1, i) {
      vdwEvents[date].forEach(function(event2, j) {
        if (i != j && event1.lat === event2.lat && event1.long === event2.long) {
          event1['overlapping'] = 'yes';
          event2['overlapping'] = 'yes';
        };
      });
    });

    // Event markers.
    var events = new L.featureGroup();
    vdwEvents[date].forEach(function(event, i) {
      var event = vdwEvents[date][i];
      var marker;
      if (event.overlapping === 'yes') {
        marker = L.marker([event.lat, event.long], { alt: event.priority,  icon: L.divIcon({ className: 'marker', iconSize: 28, html: '<span>+</span>' }) });
      } else {
        marker = L.marker([event.lat, event.long], { alt: event.priority,  icon: L.divIcon({ className: 'marker', iconSize: 28, html: '<span>' + event.priority + '</span>' }) });
      };
      marker.addTo(events);
      oms.addMarker(marker);
    });
    events.addTo(map);
    // map.fitBounds(events.getBounds());
    // map.setZoom(13);

    // Info station markers.
    // var infoStations = new L.featureGroup();
    // L.marker([49.2558024, -123.112944], { icon: L.divIcon({ className: 'marker info', iconSize: 28 }) }).addTo(infoStations);
    // infoStations.addTo(map);
  }
}

}

// Navigation color switcher

var $nav = $('.c-navigation');
var switch1 = $('#successes').offset().top;
var switch2 = $('#about').offset().top;
var switch3 = $('#get-involved').offset().top;

$(window).on('scroll', function() {
  if(switch1 <= $(window).scrollTop() && $(window).scrollTop() <= switch1 + $('#hero').height() ) {
    console.log("Fire 1!");
    $nav.css({
      'background-color': '#28e9dc',
    });
    $('.c-navigation--link').css({
      color: '#fff'
    });
  } else if(switch2 <= $(window).scrollTop() && $(window).scrollTop() <= switch2 + $('#about').height() ) {
    console.log("Fire 2!");
    $nav.css({
      'background-color': '#466eff',
    });
    $('.c-navigation--link').css({
      color: '#fff'
    });
  } else if(switch3 <= $(window).scrollTop() && $(window).scrollTop() <= switch3+ $('#get-involved').height() ) {
    console.log("Fire 3!");
    $nav.css({
      'background-color': '#ffe6e6',
    });
    $('.c-navigation--link').css({
      color: '#000'
    });
  } else {
    console.log("Hold!");
    $nav.css({
      'background-color': '#fff',
    });
    $('.c-navigation--link').css({
      color: '#000'
    });
  }
});

// Nav mobile toggle
// ---
$('.js-nav-mobile-toggle').bind('click', function() {
  $('.c-navigation--links').slideToggle('fast');
  var text = $(this).find('.js-menu-sign').text();
  $(this).find('.js-menu-sign').text(
    text == "-" ? "+" : "-"
    );
})

// Sponsor masonry.
var $container = $('.support');
$container.imagesLoaded( function() {
  $container.masonry({
    itemSelector: 'img'
  });
});

});

