# To run this script:
#   1. cd ~/Desktop/vdw/
#   2. sh build.sh
# Then just check things out in your Git client, commit, and sync!

# cd events/ && ruby fetch_events.rb && git add _posts/ && git commit -m "Build events" && cd ../
cd events/ && ruby fetch_events.rb && git add _posts/ && cd ../
