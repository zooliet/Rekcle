class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :account_no

      t.timestamps
    end
    add_index :users, :account_no
  end
end
