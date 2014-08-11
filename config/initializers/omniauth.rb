OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV['YDA_FACEBOOK_APP_ID'], ENV['YDA_FACEBOOK_APP_SECRET']
end
