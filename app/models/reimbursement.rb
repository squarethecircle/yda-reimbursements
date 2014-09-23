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
		  	reimbursement.UUID=SecureRandom.uuid
		  	reimbursement.save
		end
	end

	def self.update(reimbursement_id,type, value)
		updating = Reimbursement.find_by(UUID: reimbursement_id)
		if updating == nil
			return
		end
		if type == 1
			dollars=0
		  	cents=0
		  	dollarsmatch=/\$?([0-9]+)\.?/.match(value)
		  	if dollarsmatch != nil
		  		dollars = dollarsmatch[1].to_i
		  	end
		  	centsmatch=/\.([0-9]+)/.match(value)
		  	if centsmatch != nil
		  		cents = centsmatch[1].to_i
		  	end
		  	updating.amount=dollars*100+cents
		elsif type == 2
			updating.details=value
		elsif type == 3
			updating.status=value.to_i
		end
		updating.save
	end
	def self.user_delete(user_id,reimbursement_id)
		to_delete=Reimbursement.find_by(UUID: reimbursement_id)
		if to_delete.status == 0 and to_delete.user_id == user_id
			to_delete.destroy
		end
	end

	def self.admin_delete(reimbursement_id)
		if Reimbursement.find_by(UUID: reimbursement_id) != nil
			Reimbursement.find_by(UUID: reimbursement_id).destroy
		end
	end



end
