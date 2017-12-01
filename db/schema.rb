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

ActiveRecord::Schema.define(version: 20171201075006) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "hstore"

  create_table "buying_rules", force: :cascade do |t|
    t.string "name"
    t.bigint "user_id"
    t.hstore "conditions"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_buying_rules_on_user_id"
  end

  create_table "buying_signals", force: :cascade do |t|
    t.string "name"
    t.bigint "user_id"
    t.bigint "watching_id"
    t.bigint "buying_rule_id"
    t.hstore "conditions"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["buying_rule_id"], name: "index_buying_signals_on_buying_rule_id"
    t.index ["user_id"], name: "index_buying_signals_on_user_id"
    t.index ["watching_id"], name: "index_buying_signals_on_watching_id"
  end

  create_table "dummies", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "kiwoom_equations", force: :cascade do |t|
    t.string "name"
    t.bigint "user_id"
    t.bigint "buying_rule_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["buying_rule_id"], name: "index_kiwoom_equations_on_buying_rule_id"
    t.index ["user_id"], name: "index_kiwoom_equations_on_user_id"
  end

  create_table "selling_rules", force: :cascade do |t|
    t.string "name"
    t.bigint "user_id"
    t.hstore "conditions"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_selling_rules_on_user_id"
  end

  create_table "selling_signals", force: :cascade do |t|
    t.string "name"
    t.bigint "user_id"
    t.bigint "watching_id"
    t.bigint "selling_rule_id"
    t.hstore "conditions"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["selling_rule_id"], name: "index_selling_signals_on_selling_rule_id"
    t.index ["user_id"], name: "index_selling_signals_on_user_id"
    t.index ["watching_id"], name: "index_selling_signals_on_watching_id"
  end

  create_table "stock_symbols", force: :cascade do |t|
    t.string "company"
    t.string "symbol"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "account"
    t.string "login"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "watchings", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "stock_symbol_id"
    t.bigint "kiwoom_equation_id"
    t.string "shares", default: "0"
    t.decimal "average_price", precision: 10, scale: 2, default: "0.0"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["kiwoom_equation_id"], name: "index_watchings_on_kiwoom_equation_id"
    t.index ["stock_symbol_id"], name: "index_watchings_on_stock_symbol_id"
    t.index ["user_id"], name: "index_watchings_on_user_id"
  end

  add_foreign_key "buying_rules", "users"
  add_foreign_key "buying_signals", "buying_rules"
  add_foreign_key "buying_signals", "users"
  add_foreign_key "buying_signals", "watchings"
  add_foreign_key "kiwoom_equations", "buying_rules"
  add_foreign_key "kiwoom_equations", "users"
  add_foreign_key "selling_rules", "users"
  add_foreign_key "selling_signals", "selling_rules"
  add_foreign_key "selling_signals", "users"
  add_foreign_key "selling_signals", "watchings"
  add_foreign_key "watchings", "kiwoom_equations"
  add_foreign_key "watchings", "stock_symbols"
  add_foreign_key "watchings", "users"
end
