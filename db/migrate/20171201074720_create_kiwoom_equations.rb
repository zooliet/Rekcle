class CreateKiwoomEquations < ActiveRecord::Migration[5.1]
  def change
    create_table :kiwoom_equations do |t|
      t.string :name
      t.references :user, foreign_key: true
      t.references :buying_rule, foreign_key: true

      t.timestamps
    end
  end
end
