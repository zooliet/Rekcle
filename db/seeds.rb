# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.find_or_create_by(name: '신준현',  login: 'hl1sqi', account: '12345678')


user.watchlists.destroy_all()

symbols = ['079550', '012450', '047810', '099320', '211270']
symbols.each do |symbol|
  stock = StockSymbol.find_by(symbol: symbol)
  watched = user.watchlists.create(stock: stock, watching: rand(2) == 0 ? false : true)
end

user.kiwoom_equations.destroy_all()
kiwoom_equations = [
  {index: '001', name: '조건식1'},
  {index: '002', name: '조건식2'},
  {index: '003', name: '조건식3'},
  {index: '004', name: '조건식4'},
  {index: '005', name: '조건식5'},
]

kiwoom_equations.each do |eq|
  user.kiwoom_equations.create(name: eq[:name], index: eq[:index])
end
