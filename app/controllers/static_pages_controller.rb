class StaticPagesController < ApplicationController
  http_basic_authenticate_with :name => ENV['YDA_USERNAME'], :password => ENV['YDA_PASSWORD']

  def home
  	userid=session[:user_id]
  	if userid != nil
  		@user=User.find(userid)
  	end
  end
end
