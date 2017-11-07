namespace :secrets do
 desc "upload secrets.upload.yml to shared_path/config/secrets.yml"
 task :setup do
    on roles(:all) do |host|
      # execute :mkdir, '-pv', shared_path.join('config')
      config_path = File.join shared_path, "config"
      upload! 'config/secrets.upload.yml', "#{config_path}/secrets.yml"
    end
  end
end

desc 'Server setup tasks'
task :setup do
  invoke "secrets:setup"
end
