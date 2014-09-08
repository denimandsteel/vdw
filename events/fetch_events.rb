require 'rubygems'
require 'open-uri'
require 'csv'
require 'fileutils'

def eventPostFromCSVLine(line, priority)
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
      content = eventPostFromCSVLine(line, priority)
      File.write(filename, content)  
      priority += 1
    end

  end

  puts "#{priority - 1} events posted."
end

csvURL = "https://docs.google.com/spreadsheets/d/1zlSwKyHZ3ui-hNivaKdZIKINvn45fX3td0xvI4Hu0CU/export?gid=0&format=csv"
FileUtils.rm_rf(Dir.glob('_posts/*'))
readCSV(csvURL)