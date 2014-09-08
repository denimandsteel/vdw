---
title: Events
id: events
---

<!DOCTYPE html>
<html>
<head></head>
<body>

{% for priority in (1..50) %}
  {% for post in site.categories.event %}
    {% if post.priority == priority and post.published == true %}
      <section class="event">
        <div class="summary">
          <h3><a href="{{ post.url }}">{{ post.title }}</a></span></h3>
          <p>{{ post.description }}</p>
          <p>{{ post.time }}</p>
          <p>{{ post.type }}</p>
          <p>{{ post.address }}</p>
        </div>
      </section>
    {% endif %}
  {% endfor %}
{% endfor %}

</body>
</html>


