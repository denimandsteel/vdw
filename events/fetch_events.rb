require 'rubygems'
require 'open-uri'
require 'csv'
require 'fileutils'
require 'json'

def eventPostFromCSVLine(line, priority, latitude, longitude)
  #description
  eventDate = Date.strptime(line[0], "%m/%d/%Y")
  formattedDate = eventDate.strftime("%A %d")
  title =       line[1]
  description = line[2].tr("\n"," ")
  time =        line[3]
  type =        line[4]
  address =     line[5].tr("\n"," ")
  eventUrl =    line[6]
  published =   line[7]

  isPublished = (published == 'YES')  

  content =  
  "---
day: #{formattedDate}
title: #{title}
description: \"#{description}\"
time: #{time}
type: #{type}
address: #{address}
latitude: #{latitude}
longitude: #{longitude}
eventUrl: #{eventUrl}
published: #{isPublished}

category: event
priority: #{priority}
---
"

  formattedDate + "\n" + description
  return content
end

def readCSV(url)
  priority = 1
  CSV.new(open(url), :headers => :first_row).each do |line|
    
    if line[7] == 'YES'
      eventDate = Date.strptime(line[0], "%m/%d/%Y")
      formattedDate = eventDate.strftime("%Y-%m-%d")
      title = line[1]
      slug = formattedDate + "-" + title
      filename = ("_posts/#{slug}.md").gsub!(' ','-').downcase
      address = line[5].tr("\n"," ")
      google_api_key = "AIzaSyBQDsHDBRQtL2hZl9Jl7sg002VSokqvlZk"
      geocoder = JSON.parse(open("https://maps.googleapis.com/maps/api/geocode/json?address=#{URI::encode(address)}&key=#{google_api_key}").string)
      if geocoder && geocoder["results"].length > 0
        latitude = geocoder["results"][0]["geometry"]["location"]["lat"]
        longitude = geocoder["results"][0]["geometry"]["location"]["lng"]
      end
      content = eventPostFromCSVLine(line, priority, latitude, longitude)
      File.write(filename, content)  
      priority += 1
    end

  end

  puts "#{priority - 1} events posted."
end

csvURL = "https://docs.google.com/spreadsheets/d/1zlSwKyHZ3ui-hNivaKdZIKINvn45fX3td0xvI4Hu0CU/export?gid=0&format=csv"
FileUtils.rm_rf(Dir.glob('_posts/*'))
readCSV(csvURL)
