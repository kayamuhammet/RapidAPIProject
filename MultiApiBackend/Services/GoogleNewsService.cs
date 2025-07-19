public class GoogleNewsService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public GoogleNewsService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
    }

    public async Task<string> GetGoogleNews()
    {
        
        var request = new HttpRequestMessage
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri($"https://google-news22.p.rapidapi.com/v1/top-headlines?country=tr&language=tr"),
        };

        request.Headers.Add("X-RapidAPI-Key", _configuration["RapidApi:Key"]);
        request.Headers.Add("X-RapidAPI-Host", "google-news22.p.rapidapi.com");

        var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();
        var body = await response.Content.ReadAsStringAsync();
        return body;
    }
}