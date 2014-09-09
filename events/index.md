---
title: Events
id: events
---
<html>
<head>
  <title>Events</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <script type="text/javascript" src="http://leaflet.cloudmade.com/dist/leaflet.js"></script>
  <link rel="stylesheet" href="http://leaflet.cloudmade.com/dist/leaflet.css" />
  <!--[if lte IE 8]><link rel="stylesheet" href="http://leaflet.cloudmade.com/dist/leaflet.ie.css" /><![endif]-->
  <script type="text/javascript" src="http://maps.stamen.com/js/tile.stamen.js?v1.3.0"></script>
  <style type="text/css">
  .map {
      width: 100%;
      height: 320px;
      margin: 0 0 1em 0;
      /*padding-right: 100px;*/
      /*box-sizing: border-box;*/
  }
  </style>
</head>
<body>

<!--
  <div class="event" style="position: absolute; left: 0px; top: 0px;">
      <h2>MONDAY 15</h2>
      <div class="content">
           <h3>VANCOUVER URBAN DESIGN AWARDS</h3>
          <p>This inaugural event recognizes and celebrates excellence in architecture and urban design in Vancouver.</p>
           </div>
      <a target="_blank" href="http://vancouver.ca/home-property-development/urban-design-awards.aspx" class="highlight">MORE INFO →</a>
        
              <div class="content">
           <h3>SALA EXHIBIT - CONCEPTUALIZING THE TECHNICAL</h3>
          <p>Studio work produced in a collaboration between the School of Architecture and Landscape Architecture and the UBC First Nations House of Learning. Projects explore the concept of “Research Centre” development in one of four institutional variants: centre, museum, archive, or memorial. Runs to September 19.</p>
           </div>
      <a target="_blank" href="http://www.aibc.ca/membersite/celebrating-architecture/aibc-gallery/" class="highlight">MORE INFO →</a>

    </div>
-->

<div id="map" class="map"></div>
<script type="text/javascript">
  var map = new L.Map('map', {
    center: new L.LatLng(37.8, -122.4),
    zoom: 10,
    scrollWheelZoom: false,
  });
  // map.addLayer(new L.StamenTileLayer('toner-lite', {
  map.addLayer(new L.StamenTileLayer('toner', {
    detectRetina: true
  }));
  var group = new L.featureGroup();
</script>

{% for priority in (1..50) %}
  {% for post in site.categories.event %}
    {% if post.priority == priority and post.published == true %}
      {% capture currentdate %}{{post.date | date: "%A, %B %d, %Y"}}{% endcapture %}
      {% if currentdate != thedate %}
        <h2>{{ post.day }}</h2>
        {% capture thedate %}{{currentdate}}{% endcapture %} 
      {% endif %}
      <div class="content">
        <h3>{{ post.title }}</h3>
        <p>{{ post.description }}</p>
      </div>
      <a target="_blank" href="{{ post.eventUrl }}" class="highlight">MORE INFO &rarr;</a>
      <script type="text/javascript">
      L.marker([{{ post.latitude }}, {{ post.longitude }}]).addTo(group);
      </script>
    {% endif %}
  {% endfor %}
{% endfor %}

<script type="text/javascript">
map.fitBounds(group.getBounds());
group.addTo(map);
</script>
</body>

</html>


