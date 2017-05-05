require 'rubygems'
require 'open-uri'
require 'fileutils'
require 'json'

VDWEvent = Struct.new( 
  :day,
  :title,
  :description,
  :start_time,
  :end_time,
  :ampm,
  :event_type,
  :address,
  :address_label,
  :event_url,
  :event_url_label,
  :twitter,
  :instagram,
  :website,
  :published,
  :address_lat,
  :address_long,
  :price,
  :priority
)

def markdownPostForEvent(event)
  escapedTitled = event.title.gsub('"', '\"');
  escapedDescription = event.description.gsub('"', '\"').gsub(/(?:\n\r?|\r\n?)/, '<br>');

  dayNumber = event.day.strftime("%d")
  dayOfWeek = event.day.strftime("%a")
  dayOfMonth = event.day.strftime("May %d")
  
  formattedTime = ""
  if event.start_time.to_s != ''
    formattedTime = event.start_time + (event.end_time.to_s == '' ? "" : " - " + event.end_time)
  end

  timestamp = event.day.strftime("%Y-%m-%d")
  cleanTitle = event.title.gsub(' ','_').gsub(/[^A-Za-z0-9_]/i, '').downcase
  slug = timestamp + "-" + cleanTitle

  "---
dayOfWeek: #{dayOfWeek}
dayOfMonth: #{dayOfMonth}
title: \"#{escapedTitled}\"
description: \"#{escapedDescription}\"
startTime: #{event.start_time}
endTime: #{event.end_time}
type: #{event.event_type}
address: \"#{event.address}, Vancouver, BC, Canada\"
addressLabel: \"#{event.address_label}\"
latitude: #{event.address_lat}
longitude: #{event.address_long}
eventUrl: #{event.event_url}
eventUrlLabel: #{event.event_url_label}
twitter: #{event.twitter}
instagram: #{event.instagram}
website: #{event.website}
published: #{event.published}
price: #{event.price}

category: event-#{dayNumber}-#{event.ampm}
priority: #{event.priority}
slug: #{slug}
---
"
end

def readEvents(url)
  totalEvents = 0;
  priority = 0

  events = JSON.parse(open(url).read)
  puts events.length

  typePlain = {
    'tastings' => 'Tastings',
    'open_call' => 'Open Call',
    'open_studios' => 'Open Studios',
    'open_buildings' => 'Open Buildings',
  }
  
  events.each do |eventJSON|
    event = VDWEvent.new

    dates = []

    if eventJSON['is_date_friday']
      dates << Date.strptime("05/12/2017", "%m/%d/%Y")
    end
    if eventJSON['is_date_saturday']
      dates << Date.strptime("05/13/2017", "%m/%d/%Y")
    end
    if eventJSON['is_date_sunday']
      dates << Date.strptime("05/14/2017", "%m/%d/%Y")
    end

    if eventJSON['is_time_am']
      event.ampm = 'am'
    elsif eventJSON['is_time_pm']
      event.ampm = 'pm'
    else
      event.ampm = ''
    end

    if eventJSON['id'] == 104 || eventJSON['id'] == 149 # Type Brigade and Glacier are on Thursday...
      dates << Date.strptime("05/11/2017", "%m/%d/%Y")
      event.ampm = 'pm'
    end

    if eventJSON['id'] == 130 # Debrief is on Tuesday...
      dates << Date.strptime("05/16/2017", "%m/%d/%Y")
      event.ampm = 'pm'
    end

    if eventJSON['public'] && dates.length > 0
      event.title = eventJSON['name'].tr("\n"," ")
      event.description = eventJSON['public_description'].tr("\n"," ")
      event.start_time = eventJSON['time']
      # event.end_time = eventJSON['End Time']
      event.event_type = typePlain[eventJSON['event_type']]
      event.address = eventJSON['address'].tr("\n"," ")
      event.address_label = eventJSON['address']
      event.event_url = eventJSON['public_url']
      event.event_url_label = eventJSON['public_url_label']
      event.twitter = eventJSON['twitter']
      event.instagram = eventJSON['instagram']
      event.website = eventJSON['website']
      event.published = eventJSON['public']
      event.address_lat = eventJSON['latitude']
      event.address_long = eventJSON['longitude']
      event.price = eventJSON['price']
      event.priority = eventJSON['position']
      # event.priority = priority
      # priority += 1


      dates.each do |date|
        event.day = date
        content = markdownPostForEvent(event)
        cleanTitle = event.title.gsub(' ','_').gsub(/[^A-Za-z0-9_]/i, '').downcase
        formattedDate = event.day.strftime("2016-%m-%d")
        slug = formattedDate + "-" + cleanTitle
        filename = ("_posts/#{slug}.md")
        File.write(filename, content)
        totalEvents += 1;
      end
    end
    
  end

  puts " #{totalEvents} events posted."
end

print "Fetching events: "

FileUtils.rm_rf(Dir.glob('_posts/2016-*')) # remove all previous markdown files:
readEvents("http://maps.vancouverdesignwk.com/locations.json")
