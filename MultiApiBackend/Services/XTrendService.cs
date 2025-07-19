public class XTrendService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public XTrendService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
    }

    public async Task<string> GetXTrendAsync()
    {
        var request = new HttpRequestMessage
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri($"https://twitter-api45.p.rapidapi.com/trends.php?country=Turkey"),
        };

        request.Headers.Add("X-RapidAPI-Key", _configuration["RapidApi:Key"]);
        request.Headers.Add("X-RapidAPI-Host", "twitter-api45.p.rapidapi.com");

        var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();
        var body = await response.Content.ReadAsStringAsync();
        return body;
    }
}