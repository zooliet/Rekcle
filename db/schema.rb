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

ActiveRecord::Schema.define(version: 20171110083808) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "dummies", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "stock_symbols", force: :cascade do |t|
    t.string "company"
    t.string "symbol"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company"], name: "index_stock_symbols_on_company"
    t.index ["symbol"], name: "index_stock_symbols_on_symbol"
  end

  create_table "user_stocks", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "stock_symbol_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["stock_symbol_id"], name: "index_user_stocks_on_stock_symbol_id"
    t.index ["user_id"], name: "index_user_stocks_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "account_no"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_no"], name: "index_users_on_account_no"
  end

  add_foreign_key "user_stocks", "stock_symbols"
  add_foreign_key "user_stocks", "users"
end
