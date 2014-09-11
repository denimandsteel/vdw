---
title: Events
id: events
---
<html>
<head>
  <title>Events</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <link href='http://fonts.googleapis.com/css?family=Lekton:400,700,400italic' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="http://leaflet.cloudmade.com/dist/leaflet.css" />
  <!--[if lte IE 8]><link rel="stylesheet" href="http://leaflet.cloudmade.com/dist/leaflet.ie.css" /><![endif]-->
  <link rel="stylesheet" type="text/css" href="../stylesheets/style.css?1">
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

<section>
{% for dayNumber in (15..28) %}
  {% assign eventDayCategory = "event-" | append: dayNumber %}
  {% if site.categories[eventDayCategory].size > 0 %}
    <div class="day-events" id="{{ eventDayCategory }}">
      <div class="day-header">
        <h2 class="dayname">{{ site.categories[eventDayCategory][0].day }}</h2>
        <p class="event-count">{{site.categories[eventDayCategory].size}} Events [<span class="indicator plus">+</span><span class="indicator minus">-</span>]</p>
      </div>
      <div class="events-list">
        <div id="map-{{eventDayCategory}}" class="map"></div>
        {% for priority in (1..50) %}
          {% for post in site.categories[eventDayCategory] %}
            {% if post.priority == priority and post.published == true %}
              <div class="event">
                <div class="eventheader">
                  <div class="left">
                    <h3 class="title">{{ post.title }}</h3>
                    
                    {% if post.endTime %}
                      <p class="time">{{ post.startTime }} - {{ post.endTime }}</p>
                    {% else %}
                      <p class="time">{{ post.startTime }}</p>
                    {% endif %}
                    <p class="addresslabel">at {{ post.addressLabel }}</p>
                  </div>
                  <div class="right">
                    <p class="price">{{ post.price }}</p>
                    <a target="_blank" href="{{ post.eventUrl }}" class="highlight">{{ post.eventUrlLabel }}</a>
                  </div>
                </div>

                <div class="eventcontent">
                  <p class="description">{{ post.description }}</p>
                </div>
              </div>
              <script type="text/javascript">
              <!-- mapObjects[day][] = {lat , lon, priority, event}; -->
              </script>
            {% endif %}
          {% endfor %}
        {% endfor %}
      </div>
    </div>
  {% endif %}
{% endfor %}
</section>

<script type="text/javascript" src="../javascript/third-party.js?1"></script>
<script type="text/javascript" src="http://leaflet.cloudmade.com/dist/leaflet.js"></script>
<script type="text/javascript" src="http://maps.stamen.com/js/tile.stamen.js?v1.3.0"></script>
<script type="text/javascript" src="../javascript/app.js?1"></script>
</body>

</html>


