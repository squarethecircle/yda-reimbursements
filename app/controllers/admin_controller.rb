class AdminController < ApplicationController
  def panel
  	userid=session[:user_id]
  	if User.find(userid).uid != "10154443093455043"
  		raise ActionController::RoutingError.new('Not Found')
  	end
	@user=User.find(userid)
	@reimbursements=Reimbursement.all()

  end

  def delete
  	userid=session[:user_id]
  	if User.find(userid).uid != "10154443093455043"
  		raise ActionController::RoutingError.new('Not Authorized')
  	end
    Reimbursement.admin_delete(params[:to_delete_id])
    redirect_to '/admin/panel'
  end

  def update
    userid=session[:user_id]
    if User.find(userid).uid != "10154443093455043"
      raise ActionController::RoutingError.new('Not Authorized')
    end
    Reimbursement.update(params[:to_update_id],params[:type].to_i,params[:value])
    redirect_to '/admin/panel'
  end

  	

end
