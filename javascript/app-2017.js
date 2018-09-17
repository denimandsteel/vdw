$(document).ready(function() {

window.addEventListener('touchstart', function onFirstTouch() {
  $('body').removeClass('support-hover');
  $('body').addClass('support-touch');
  window.removeEventListener('touchstart', onFirstTouch, false);
}, false);

// Events open/close.
$('.day-header').on('click', function() {
  var $day = $(this).parents('.day-events');
  if ($day.hasClass('active')) {
    if ($day.hasClass('sticky')) {
      window.scrollTo(0, $day.offset().top - $('.c-navigation').height());
    }
    $day.removeClass('sticky bottom');
    $day.find('.map-container').css({
      top: 0,
      height: 'inherit',
      width: 'auto',
    });
  }
  $day.toggleClass('active');
  window.map_options['map-' + $day.attr('id')].map.invalidateSize();
  $.waypoints('refresh');

  //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
  // $content.slideToggle(500, function () {
    //execute this after slideToggle is done
    //change text of header based on visibility of content div
  // });
  return false;
});

$('.hide-map').on('click', function() {
  var $day = $(this).parents('.day-events');
  $('body').toggleClass('hide-sticky-map');
  $('.hide-map span').html( $('body').hasClass('hide-sticky-map') ? 'Show Map' : 'Hide Map');
  $day.find('.map-container').css({
    height: 'auto',
  });
  $day.find('.map-container').css({
    height: $(this).find('.map-container').height(),
  });
  return false;
});

$(window).on('scroll', function() {
  $('.day-events.active').each(function() {
    var $scrollBottomedOut = window.scrollY > $(this).find('.events-list .event-item').last().offset().top - $(this).find('.map-container').height() - $('.c-navigation').height();
    if ( !$scrollBottomedOut && window.scrollY > $(this).offset().top - $('.c-navigation').height() ) {
      $(this).addClass('sticky');
      $(this).removeClass('bottom');
      $(this).find('.map-container').css({
        top: $('.c-navigation').height(),
        height: $(this).find('.map-container').height(),
        width: $(this).find('.events-list').width(),
      });
    }
    else if ( $scrollBottomedOut ) {
      $(this).addClass('sticky bottom');
      $(this).find('.map-container').css({
        top: $(this).find('.events-list').height() - $(this).find('.events-list .event-item').last().height() - 47 + ($('body').hasClass('hide-sticky-map') ? 200 : 0), // - 47 + $(this).find('.day-header').height()
      });
    }
    else {
      $(this).removeClass('sticky bottom');
      $(this).find('.map-container').css({
        top: 0,
        height: 'inherit',
        width: 'auto',
      });
    }
  });
});

$(window).on('resize', function() {
  $('.day-events.sticky').each(function() {
    $(this).find('.map-container').css({
      top: $('.c-navigation').height(),
      height: $(this).find('.map-container').height(),
      width: $(this).find('.events-list').width(),
    });
  });
});

// Event current day and past days.
// $('#event-2018-' + (new Date).getDate() + ' .day-header').click();
// $('#event-2018-' + (new Date).getDate() ).prevAll('.day-events').find('.day-header').addClass('done');

$('.mobile-toggle').click(function() {
  $('header').toggleClass('active');
});
$('header nav a').click(function() {
  $('header').removeClass('active');
});

// Let's make a bunch of maps!
if (typeof vdwEvents !== 'undefined') {


// for (var i in map_options) {
//   if (typeof map_options[i].map !== 'undefined') {
//     window.map_options[i].map.on('moveend', function() {
//       console.log(
//         "center: new L.LatLng(" + window.map_options[i].map.getCenter().lat + ", " + window.map_options[i].map.getCenter().lng + "),\nzoom: " + window.map_options[i].map.getZoom() + ","
//       );
//     });
//   }
// }
window.map_options = {
  'map-your-list': {
    center: new L.LatLng(49.29781496184064, -123.08326721191406),
    zoom: 10,
  },
  'map-event-2018-7': {
    center: new L.LatLng(49.27362889433306, -123.1512451171875),
    zoom: 11,
  },
  'map-event-2018-8': {
    center: new L.LatLng(49.279452550408074, -123.10729980468749),
    zoom: 11,
  },
  'map-event-2018-9': {
    center: new L.LatLng(49.24629332459796, -123.07983398437499),
    zoom: 10,
  },
  'map-event-2018-10': {
    center: new L.LatLng(49.27609283274329, -123.10214996337889),
    zoom: 12,
  },
  'map-event-2018-11': {
    center: new L.LatLng(49.27362889433306, -123.08601379394531),
    zoom: 12,
  },
  'map-event-2018-12': {
    center: new L.LatLng(49.29781496184064, -123.08326721191406),
    zoom: 11,
  },
  'map-event-2018-13': {
    center: new L.LatLng(49.26534019822459, -123.09579849243164),
    zoom: 13,
  },
};

window.mobi_stations = {
  'map-event-2018-11': [
    [49.282214, -123.114101],
    [49.265004, -123.081263],
  ],
  'map-event-2018-12': [
    [49.267859, -123.145782],
    [49.272827, -123.147744],
    [49.274497, -123.121788],
    [49.277665, -123.096683],
    [49.278004, -123.105664],
    [49.279342, -123.101822],
    [49.279764, -123.110154],
    [49.280620, -123.124820],
    [49.282214, -123.114101],
    [49.282266, -123.102165],
    [49.282759, -123.106955],
    [49.284157, -123.099917],
    [49.284605, -123.108662],
    [49.286020, -123.116624],
    [49.287214, -123.112870],
  ],
  'map-event-2018-13': [
    [49.261533, -123.089364],
    [49.262329, -123.093064],
    [49.262598, -123.138921],
    [49.263635, -123.099236],
    [49.265300, -123.138110],
    [49.266673, -123.112511],
    [49.267120, -123.109370],
    [49.267635, -123.127702],
    [49.267859, -123.145782],
    [49.268298, -123.102539],
    [49.269361, -123.137820],
    [49.270062, -123.100211],
  ],
}

var setupMap = function(date) {

  var map = new L.Map(date, {
    center: map_options[date].center,
    zoom: map_options[date].zoom,
    scrollWheelZoom: false,
    // dragging: 'ontouchstart' in window ? false : true,
    attributionControl: false,
    layers: new L.StamenTileLayer('toner-lite', { detectRetina: true }),
    // layers: new L.tileLayer('https://{s}.tiles.mapbox.com/v4/carlingborne.ijk72kc4/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2FybGluZ2Jvcm5lIiwiYSI6Ii1YdFRDUEUifQ.IoeTgzoXnKhH-Z-QP10c9A', { detectRetina: true }),
  });
  window.map_options[date].map = map;
  
  var oms = new OverlappingMarkerSpiderfier(map, { nearbyDistance: 1 });
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
  var index = 1;
  window.map_options[date].events = new L.featureGroup();

  vdwEvents[date].forEach(function(event, i) {
    var event = vdwEvents[date][i];
    var marker;
    if (event.overlapping === 'yes') {
      marker = L.marker([event.lat, event.long], { alt: index,  icon: L.divIcon({ className: 'marker', iconSize: 28, html: '<span>+</span>' }) });
    } else {
      marker = L.marker([event.lat, event.long], { alt: index,  icon: L.divIcon({ className: 'marker', iconSize: 28, html: '<span>' + index + '</span>' }) });
    };
    marker.addTo(window.map_options[date].events);
    oms.addMarker(marker);
    $('#' + date.replace('map-', '') + ' .event-' + event.id + ' .js-marker-index').text(index + '. ');
    index += 1;
  });
  window.map_options[date].events.addTo(map);
  // window.map_options[date].events.bringToFront();

  if (typeof mobi_stations[date] !== 'undefined') {
    window.mobi = new L.featureGroup();
    mobi_stations[date].forEach(function(station) {
      var mobiMarker = L.marker(station, { icon: L.divIcon({ className: 'marker mobi what', iconSize: 28, zIndexOffset: -1000 }) });
      mobiMarker.addTo(window.mobi);
      // oms.addMarker(mobiMarker);
    });
    window.mobi.addTo(map);
  }

};

for (var date in vdwEvents) {
  if (vdwEvents.hasOwnProperty(date)) {
    setupMap(date);
  }
}

}

$('.js-show-on-map').click(function() {
  map_options[$(this).data('day')].map.flyTo({ lat: $(this).data('lat'), lng: $(this).data('long') }, 15.5);
});

var listCount = 0;
var listMarkers = {};
var toggleOnList = function(eventId, adjustHeight) {
  var heightBefore = $('#your-list').height();

  if ( ! $( '.event-' + eventId + ' .js-add-to-list').hasClass('active') ) {
    $( '.event-' + eventId + ' .js-add-to-list').addClass('active');
    $( '.event-' + eventId + ' .js-add-to-list').html('Remove from List');
    var $clone = $( '.event-' + eventId ).first().clone(true);
    $clone.find('.js-show-on-map').data('day', 'map-your-list');
    $clone.appendTo('#your-list .events-list');
    listCount += 1;
    listMarkers[eventId] = L.marker([$( '.event-' + eventId ).data('lat'), $( '.event-' + eventId ).data('long')], { alt: listCount,  icon: L.divIcon({ className: 'marker', iconSize: 28, html: '<span>' + listCount + '</span>' }) });
    listMarkers[eventId].addTo(window.map_options['map-your-list'].events);
  }
  else {
    $( '#your-list .event-' + eventId ).remove();
    $( '.event-' + eventId + ' .js-add-to-list').removeClass('active');
    $( '.event-' + eventId + ' .js-add-to-list').html('Add to List');
    listCount -= 1;
    listMarkers[eventId].remove();
  }

  var eventCount = $('#your-list .event-item').length;
  if (eventCount > 0) {
    $('#your-list').addClass('has-events');
    window.map_options['map-your-list'].map.invalidateSize();
    $('.js-event-count').html(eventCount + ' events');

    var events = $('#your-list .event-item').map(function() { return $(this).attr('id'); }).toArray().join(',')
    var link = encodeURIComponent(window.location.origin + window.location.pathname + '?list=' + events);
    $('#your-list .share .email').attr('href', 'mailto:?subject=Event List for Vancouver Design Week&body=' + link);
    $('#your-list .share .twitter').attr('href', 'http://twitter.com/intent/tweet?text=' + link);
    $('#your-list .share .facebook').attr('href', 'http://www.facebook.com/sharer/sharer.php?u=' + link);
    Cookies.set('vdw-list', events, { expires: 30 });
  }
  else {
    $('#your-list').removeClass('has-events');
    $('.js-event-count').html('0 Events');
    Cookies.set('vdw-list', '', { expires: 30 });
  }

  var heightAfter = $('#your-list').height();
  if (false && adjustHeight) {
    window.scrollTo(0, scrollY + heightAfter - heightBefore)
  }
};

$('.js-add-to-list').click(function() {
  toggleOnList($(this).data('event'), $(this).parents('#your-list').length === 0 );
});

var urlEvents = [];
if (!!window.location.search.match('list')) {
  urlEvents = window.location.search.replace('?list=', '').split(',');
  $('#your-list').addClass('active');
  $('html, body').animate({
    scrollTop: $('#your-list').offset().top - $('.c-navigation').height() - 5,
  }, 1000);
}
else if (Cookies.get('vdw-list') && Cookies.get('vdw-list').length > 0) {
  urlEvents = Cookies.get('vdw-list').split(',');
}
$.each(urlEvents, function(i, eventId) {
  toggleOnList(eventId);
});

// Navigation color switcher

// var $nav = $('.c-navigation');
// if ($('#successes').is(":visible")) {
//   var switch1 = $('#successes').offset().top;
// }
// if ($('#about').is(":visible")) {
//   var switch2 = $('#about').offset().top;  
// }
// if($('#festival').is(":visible")) {
//   var switch3 = $('#festival').offset().top;
// }

// $(window).on('scroll', function() {
//   if(switch1 <= $(window).scrollTop() && $(window).scrollTop() <= switch1 + $('#hero').height() ) {
//     $nav.css({
//       'background-color': '#28e9dc',
//     });
//     $('.c-navigation--link').css({
//       color: '#fff'
//     });
//   } else if(switch2 <= $(window).scrollTop() && $(window).scrollTop() <= switch2 + $('#about').height() ) {
//     $nav.css({
//       'background-color': '#466eff',
//     });
//     $('.c-navigation--link').css({
//       color: '#fff'
//     });
//   } else if(switch3 <= $(window).scrollTop() && $(window).scrollTop() <= switch3+ $('#festival').height() ) {
//     $nav.css({
//       'background-color': '#ffe6e6',
//     });
//     $('.c-navigation--link').css({
//       color: '#000'
//     });
//   } else {
//     $nav.css({
//       'background-color': '#fff',
//     });
//     $('.c-navigation--link').css({
//       color: '#000'
//     });
//   }
// });

// Nav mobile toggle
// ---
$('.js-nav-mobile-toggle').bind('click', function() {
  $('.c-navigation--links').slideToggle('fast');
  var text = $(this).find('.js-menu-sign').text();
  $(this).find('.js-menu-sign').text(
    text == "-" ? "+" : "-"
    );
});

$('.c-navigation--links .c-navigation--link').click(function() {
  $('.c-navigation--links').slideToggle('fast');
});

// Sponsor masonry.
// var $container = $('.support');
// $container.imagesLoaded( function() {
//   $container.masonry({
//     itemSelector: 'img'
//   });
// });

});

