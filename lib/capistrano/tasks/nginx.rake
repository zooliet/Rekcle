namespace :nginx do
  %w[start stop restart reload].each do |command|
    desc "#{command} nginx"
    task command do
      on roles(:web) do |host|
        # sudo "service nginx #{command}"
        sudo "systemctl #{command} nginx "
      end
    end
  end
end

desc 'Server setup tasks'
task :setup do
  invoke "puma:nginx_config"
end

after 'puma:nginx_config', 'nginx:restart'
