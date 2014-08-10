class DashboardController < ApplicationController
  def table
  	userid=session[:user_id]
  	if userid != nil
  		@user=User.find(userid)
  		@reimbursements=@user.reimbursements.order(date_submitted: :desc)
  	end
  end

  def create
  	@reimbursement = Reimbursement.new
  	@reimbursement.user_id=session[:user_id]
  	@reimbursement.tournament=params[:inputTournament]
  	expense_type=params[:inputExpenseType]
  	if (expense_type=="Other")
  		expense_type=params[:inputOtherExpenseType]
  	end
  	@reimbursement.expense_type=expense_type
  	@reimbursement.details=params[:inputDetails]
  	@reimbursement.status=0
  	ext=""
  	if params[:uglyfile].headers.include? "Content-Type: image/jpeg"
  		ext=".jpg"
  	elsif params[:uglyfile].headers.include? "Content-Type: image/jpeg"
     	ext=".gif"
  	elsif params[:uglyfile].headers.include? "Content-Type: image/pjpeg"
  		ext=".jpg"
  	elsif params[:uglyfile].headers.include? "Content-Type: image/png"
  		ext=".png"
  	end	
  	newname=SecureRandom.uuid+ext
  	s3 = AWS::S3.new
  	img=s3.buckets['ydareimbursements'].objects[newname].write(params[:uglyfile].tempfile.read)
  	@reimbursement.receipt=img.public_url.to_s
  	@reimbursement.date_submitted=Time.new
  	dollars=/\$?([0-9]+)\.?/.match(params[:inputAmount])[1].to_i
  	cents=/\.([0-9]+)/.match(params[:inputAmount])[1].to_i
  	@reimbursement.amount=dollars*100+cents
  	@reimbursement.save
  	redirect_to '/dashboard'
  end


end
