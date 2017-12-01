class CreateSellingRules < ActiveRecord::Migration[5.1]
  def change
    create_table :selling_rules do |t|
      t.string :name
      t.references :user, foreign_key: true
      t.hstore :conditions

      t.timestamps
    end
  end
end
