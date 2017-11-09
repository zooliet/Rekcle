# encoding: UTF-8

namespace :rekcle do
  desc 'Make stock symbol table'
  task make_symbol_table: :environment do |task, args|
    # StockSymbol.destroy_all

    puts("Make stock symbol table")
    stocks = SmarterCSV.process('lib/tasks/stock_symbols.csv')

    # results = stocks.map do |stock|
    #   {company: stock[:회사명], symbol: "%06d" % stock[:종목코드]}
    # end
    # puts(results)

    stocks.each do |stock|
      StockSymbol.create(company: stock[:회사명], symbol: "%06d" % stock[:종목코드])
    end

  end
end
