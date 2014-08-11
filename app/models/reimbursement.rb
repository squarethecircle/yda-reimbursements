class Reimbursement < ActiveRecord::Base
	belongs_to :user
	validates :user_id, presence: true
	def self.create(file, user_id, tournament, expense_type, details, amount)
		if file!=nil
		  	reimbursement = Reimbursement.new
		  	reimbursement.user_id=user_id
		  	reimbursement.tournament=tournament
		
		  	reimbursement.expense_type=expense_type
		  	reimbursement.details=details
		  	reimbursement.status=0
		  	ext=""
		  	if file.headers.include? "Content-Type: image/jpeg"
		  		ext=".jpg"
		  	elsif file.headers.include? "Content-Type: image/jpeg"
		     	ext=".gif"
		  	elsif file.headers.include? "Content-Type: image/pjpeg"
		  		ext=".jpg"
		  	elsif file.headers.include? "Content-Type: image/png"
		  		ext=".png"
		  	end	
		  	newname=SecureRandom.uuid+ext
		  	s3 = AWS::S3.new
		  	img=s3.buckets['ydareimbursements'].objects[newname].write(file.tempfile.read)
		  	reimbursement.receipt=img.public_url.to_s
		  	reimbursement.date_submitted=Time.new
		  	dollars=0
		  	cents=0
		  	dollarsmatch=/\$?([0-9]+)\.?/.match(amount)
		  	if dollarsmatch != nil
		  		dollars = dollarsmatch[1].to_i
		  	end
		  	centsmatch=/\.([0-9]+)/.match(amount)
		  	if centsmatch != nil
		  		cents = centsmatch[1].to_i
		  	end
		  	reimbursement.amount=dollars*100+cents
		  	reimbursement.save
		end
	end

	def self.user_delete(user_id,reimbursement_index)
		to_delete=User.find(user_id).reimbursements[reimbursement_index]
		if to_delete.status != 1
			to_delete.destroy
		end
	end

	def self.admin_delete(reimbursement_id)
		Reimbursement.find(reimbursement_id).destroy
	end



end
