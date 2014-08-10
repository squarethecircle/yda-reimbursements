class CreateReimbursements < ActiveRecord::Migration
  def change
    create_table :reimbursements do |t|
      t.integer :user_id
      t.datetime :date_submitted
      t.string :tournament
      t.string :expense_type
      t.string :details
      t.integer :amount
      t.integer :status
      t.string :receipt

      t.timestamps
    end
  end
end
