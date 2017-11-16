class CreateWatchlists < ActiveRecord::Migration[5.1]
  def change
    create_table :watchlists do |t|
      t.references :user, foreign_key: true
      t.references :stock_symbol, foreign_key: true
      t.boolean :manual, default: false
      t.boolean :kiwoom, default: false
      t.boolean :rekcle, default: false

      t.timestamps
    end
  end
end
