class CreateSellingSignals < ActiveRecord::Migration[5.1]
  def change
    create_table :selling_signals do |t|
      t.string :name
      t.references :user, foreign_key: true
      t.references :watching, foreign_key: true
      t.references :selling_rule, foreign_key: true
      t.hstore :conditions

      t.timestamps
    end
  end
end
