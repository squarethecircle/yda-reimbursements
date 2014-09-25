class DashboardController < ApplicationController
  http_basic_authenticate_with :name => ENV['YDA_USERNAME'], :password => ENV['YDA_PASSWORD']

  def table
  	userid=session[:user_id]
  	if userid != nil
  		@user=User.find(userid)
  		@reimbursements=@user.reimbursements.order(date_submitted: :desc)
  	end
  end

  def create
	expense_type=params[:inputExpenseType]
  	if (expense_type=="Other")
  		expense_type=params[:inputOtherExpenseType]
  	end
  	Reimbursement.create(params[:uglyfile], session[:user_id], params[:inputTournament], expense_type, params[:inputDetails], params[:inputAmount])

  	redirect_to '/dashboard'
  end

  def delete
  	Reimbursement.user_delete(session[:user_id],params[:to_delete_id])
  	redirect_to '/dashboard'
  end


end
