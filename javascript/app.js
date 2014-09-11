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

// Events open/close.
$('.day-header').on('click', function() {
  $(this).parents('.day-events').toggleClass('active');
  //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
  // $content.slideToggle(500, function () {
    //execute this after slideToggle is done
    //change text of header based on visibility of content div
  // });
  return false;
});

// // Let's make a bunch of maps!
// // for (var date in vdwEvents) {
//   // console.log(date);
//   // if (vdwEvents.hasOwnProperty(date)) {
    
//     // var date = ;
//     // var events = new L.featureGroup();
//     // // for (var i = 0; i < vdwEvents[date].length; i++) {
//     //   var vdwEvent = vdwEvents[date][0];
//     //   var marker = new L.marker([vdwEvent.lat, vdwEvent.long], { icon: L.divIcon({ className: 'marker', iconSize: 28, html: '<span>' + vdwEvent.priority + '</span>' }) });
//     //   marker.addTo(events);
//     //   var vdwEvent = vdwEvents[date][1];
//     //   var marker = new L.marker([vdwEvent.lat, vdwEvent.long], { icon: L.divIcon({ className: 'marker', iconSize: 28, html: '<span>' + vdwEvent.priority + '</span>' }) });
//     //   marker.addTo(events);
//     // // }
    
//     var map = new L.Map('map-event-15', {
//       center: new L.LatLng(49.2, -123.1),
//       zoom: 10,
//       scrollWheelZoom: false,
//       attributionControl: false,
//       // layers: [
//         // new L.StamenTileLayer('toner-lite', { detectRetina: true }),
//         // infoStations,
//         // events,
//       // ],
//     });
//     map.addLayer(new L.StamenTileLayer('toner-lite', {
//       detectRetina: true,
//     }));
//     var infoStations = new L.featureGroup();
//     L.marker([49.2558024, -123.112944], { icon: L.divIcon({ className: 'marker info', iconSize: 28 }) }).addTo(infoStations);
//     L.marker([49.3558024, -123.112944], { icon: L.divIcon({ className: 'marker info', iconSize: 28 }) }).addTo(infoStations);
    
//     infoStations.addTo(map);
//     map.fitBounds(infoStations.getBounds());
//   // }
// // }

for (var date in vdwEvents) {
  if (vdwEvents.hasOwnProperty(date)) {
    // Let's make a map!
    var map = new L.Map(date, {
      // center: new L.LatLng(37.8, -122.4),
      // zoom: 10,
      scrollWheelZoom: false,
      attributionControl: false,
    });
    map.addLayer(new L.StamenTileLayer('toner-lite', {
      detectRetina: true,
    }));

    // Event markers.
    var group = new L.featureGroup();
    group.addTo(map);
    for (var i = 0; i < vdwEvents[date].length; i++) {
      var vdwEvent = vdwEvents[date][i];
      L.marker([vdwEvent.lat, vdwEvent.long], { icon: L.divIcon({ className: 'marker', iconSize: 28, html: '<span>' + vdwEvent.priority + '</span>' }) }).addTo(group);
    }
    map.fitBounds(group.getBounds());

    // Info station markers.
    // var infoStations = new L.featureGroup();
    // infoStations.addTo(map);
    // L.marker([49.2558024, -123.112944], { icon: L.divIcon({ className: 'marker info', iconSize: 28 }) }).addTo(infoStations);


  }
}



});
