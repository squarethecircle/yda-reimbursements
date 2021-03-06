# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140824013159) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "reimbursements", force: true do |t|
    t.integer  "user_id"
    t.datetime "date_submitted"
    t.string   "tournament"
    t.string   "expense_type"
    t.string   "details"
    t.integer  "amount"
    t.integer  "status"
    t.string   "receipt"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "UUID"
  end

  add_index "reimbursements", ["UUID"], name: "index_reimbursements_on_UUID", using: :btree
  add_index "reimbursements", ["user_id", "date_submitted"], name: "index_reimbursements_on_user_id_and_date_submitted", using: :btree

  create_table "users", force: true do |t|
    t.string   "provider"
    t.string   "uid"
    t.string   "name"
    t.string   "image"
    t.string   "token"
    t.datetime "expires_at"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
