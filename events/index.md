---
title: Events
id: events
---

<html>
<head></head>
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
    {% endif %}
  {% endfor %}
{% endfor %}

</body>
</html>


