class CreateKiwoomEquations < ActiveRecord::Migration[5.1]
  def change
    create_table :kiwoom_equations do |t|
      t.string :name
      t.string :index
      t.references :user, foreign_key: true
      t.integer :buying_rule_id

      t.timestamps
    end
  end
end
