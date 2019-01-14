/// Endpoints for the Philippine Stock Exchange (PSE)
///
/// http://www.pseapi.com/
export class ModuleUrl {
    public static base_url = 'http://pseapi.com/api';

    public static api_get_stock_quote = ModuleUrl.base_url + ' /Stock/{symbol}/{date}';
    public static api_get_stock_quote_range = ModuleUrl.base_url + ' /Stock/{symbol}/{From-Date}/{To-Date}';
    public static api_get_stock_quote_month = ModuleUrl.base_url + ' /Stock/{symbol}';
    public static api_get_stock_prices_range = ModuleUrl.base_url + '/Stock/{symbol}/prices/{From-Date}/{To-Date}';

    public static api_get_market_eod = ModuleUrl.base_url + '/Market/{date}';
    public static api_get_market_range = ModuleUrl.base_url + '/Market/{From-Date}/{To-Date}';

    public static api_get_sector_summary = ModuleUrl.base_url + '/Sector/{date}';
    public static api_get_sector_range = ModuleUrl.base_url + '/Sector/{From-Date}/{To-Date}';
}
