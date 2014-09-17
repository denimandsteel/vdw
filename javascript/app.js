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
  var $contact = $('#contact');
  if ($contact.length > 0) {
    var bottomOfPage = $contact.height() + $contact.offset().top; // Top of page margin (#hero) + margin at bottom (#team).
    var cropHeight = bottomOfPage * (334.469/$(window).width());
    // alert(cropHeight)
    $('svg').attr('height', cropHeight + 'px');
    $('svg').get(0).setAttribute("viewBox", '0 0 334.469 ' + cropHeight);
    $('svg').attr('enable-background', 'new 0 0 334.469 ' + cropHeight);
  }
};
setTimeout(resizeBackground, 5000); // Wait long after DOM has finished. This is a little gross, would setting all image width and height help?
$(window).resize(function() {
  setTimeout(resizeBackground, 500); // Wait for masonry to shuffle.
});

// More text widgets.
$('.more .toggle').click(function() {
  $(this).parent('.more').addClass('active');
  return false;
});

// Sponsor masonry.
var $container = $('.support div');
$container.imagesLoaded( function() {
  $container.masonry({
    itemSelector: 'img, .supporter'
  });
});

$('#event-sample > div').masonry({
  itemSelector: '.event'
});

// Lazy load a slideshow.
var interval = 6000;
setTimeout(function() {
  $('.slideshow').append('<div class="slide two"></div>');
}, interval*0.5);
setTimeout(function() {
  $('.slideshow .slide:last-child').prependTo('.slideshow');
}, interval);
setTimeout(function() {
  $('.slideshow').append('<div class="slide three"></div>');
}, interval*1.5);
setTimeout(function() {
  $('.slideshow .slide:last-child').prependTo('.slideshow');
  setInterval(function() {
    $('.slideshow .slide:last-child').prependTo('.slideshow');
  }, interval);
}, interval*2);


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

// Let's make a bunch of maps!
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

});
