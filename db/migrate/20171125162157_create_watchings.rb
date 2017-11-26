class CreateWatchings < ActiveRecord::Migration[5.1]
  def change
    create_table :watchings do |t|
      t.references :user, foreign_key: true
      t.references :stock_symbol, foreign_key: true

      t.timestamps
    end
  end
end
