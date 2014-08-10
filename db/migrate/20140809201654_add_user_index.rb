class AddUserIndex < ActiveRecord::Migration
  def change
	add_index :reimbursements, [:user_id, :date_submitted]
  end
end
