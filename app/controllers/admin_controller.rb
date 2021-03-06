class AdminController < ApplicationController
  http_basic_authenticate_with :name => ENV['YDA_USERNAME'], :password => ENV['YDA_PASSWORD']

  def panel
  	userid=session[:user_id]
  	if User.find(userid).uid != ENV['YDA_TREASURER'] && User.find(userid).uid != ENV['YDA_TREASURER2']
  		raise ActionController::RoutingError.new('Not Found')
  	end
	@user=User.find(userid)
	@reimbursements=Reimbursement.all()

  end

  def delete
  	userid=session[:user_id]
    if User.find(userid).uid != ENV['YDA_TREASURER'] && User.find(userid).uid != ENV['YDA_TREASURER2']
  		raise ActionController::RoutingError.new('Not Authorized')
  	end
    Reimbursement.admin_delete(params[:to_delete_id])
    redirect_to '/admin/panel'
  end

  def update
    userid=session[:user_id]
    if User.find(userid).uid != ENV['YDA_TREASURER'] && User.find(userid).uid != ENV['YDA_TREASURER2']
      raise ActionController::RoutingError.new('Not Authorized')
    end
    Reimbursement.update(params[:to_update_id],params[:type].to_i,params[:value])
    redirect_to '/admin/panel'
  end

  	

end
