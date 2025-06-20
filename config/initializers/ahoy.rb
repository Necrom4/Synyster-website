class Ahoy::Store < Ahoy::DatabaseStore
end

# set to true for JavaScript tracking
Ahoy.api = false

# set to true for geocoding (and add the geocoder gem to your Gemfile)
# we recommend configuring local geocoding as well
# see https://github.com/ankane/ahoy#geocoding
Ahoy.geocode = false

Ahoy.exclude_method = lambda do |controller, request|
  user_agent = request.user_agent.to_s.downcase
  browser = Browser.new(user_agent)

  browser.bot? ||
  user_agent.include?("cron-job.org") ||
  user_agent.include?("headless") ||  # covers HeadlessChrome, etc.
  request.remote_ip == "::1"          # localhost
end

Ahoy.track_bots = false  # optional: uses browser gem to detect bots
