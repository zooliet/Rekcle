class CreateWatchings < ActiveRecord::Migration[5.1]
  def change
    create_table :watchings do |t|
      t.references :user, foreign_key: true
      t.references :stock_symbol, foreign_key: true
      t.references :kiwoom_equation, foreign_key: true
      t.string :shares, default: 0
      t.decimal :average_price, precision: 10, scale: 2, default: 0.0

      t.timestamps
    end
  end
end
