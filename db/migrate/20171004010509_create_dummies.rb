class CreateDummies < ActiveRecord::Migration[5.1]
  def change
    create_table :dummies do |t|
      t.string :name

      t.timestamps
    end
  end
end
