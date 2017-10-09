# namespace :deploy do
#   desc "Install basic packages"
#   task :install do
#     on roles(:all), in: :groups, limit: 3, wait: 10 do |host|
#       # packages = %w(
#       #   build-essential openssl libreadline6 libreadline6-dev
#       #   wget zlib1g zlib1g-dev libssl-dev libyaml-dev libsqlite3-0
#       #   libsqlite3-dev sqlite3 libxml2-dev libxslt-dev autoconf libc6-dev
#       #   ncurses-dev automake libtool bison python-software-properties
#       # )
#       # packages.push("imagemagick", "logrotate")
#       # sudo "apt-get -y update"
#       # packages.each do |package|
#       #   sudo "apt-get -y install #{package}"
#       # end
#       # execute! :sudo, :'apt-get', '-y update'
#     end
#   end
# end
