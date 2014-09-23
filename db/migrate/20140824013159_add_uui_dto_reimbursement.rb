class AddUuiDtoReimbursement < ActiveRecord::Migration
  def change
  	add_column :reimbursements, :UUID, :string
  	add_index :reimbursements, :UUID
  end
end
