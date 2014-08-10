class StaticPagesController < ApplicationController
  def home
  	userid=session[:user_id]
  	if userid != nil
  		@user=User.find(userid)
  	end
  end
end
