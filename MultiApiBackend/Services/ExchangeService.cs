public class ExchangeService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public ExchangeService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
    }

    public async Task<string> GetExchangeRatesAsync(string baseCurrency)
    {
        var request = new HttpRequestMessage
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri($"https://exchangerate-api.p.rapidapi.com/rapid/latest/{baseCurrency}"),
        };

        request.Headers.Add("X-RapidAPI-Key", _configuration["RapidApi:Key"]);
        request.Headers.Add("X-RapidAPI-Host", "exchangerate-api.p.rapidapi.com");

        var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();
        var body = await response.Content.ReadAsStringAsync();
        return body;
    }
}