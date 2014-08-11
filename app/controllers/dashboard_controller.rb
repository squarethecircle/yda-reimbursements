class DashboardController < ApplicationController
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


end
