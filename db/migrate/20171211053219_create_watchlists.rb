class CreateWatchlists < ActiveRecord::Migration[5.1]
  def change
    create_table :watchlists do |t|
      t.references :user, foreign_key: true
      t.belongs_to :stock_symbol, foreign_key: true
      t.boolean :watching, default: false

      t.timestamps
    end
  end
end
