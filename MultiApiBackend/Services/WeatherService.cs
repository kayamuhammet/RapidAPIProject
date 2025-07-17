public class WeatherService
{
    private readonly HttpClient _httpClient;

    private readonly IConfiguration _configuration;

    public WeatherService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
    }

    public async Task<string> GetWeatherAsync(string city)
    {
        var encodedCity = Uri.EscapeDataString(city); // Özel karakterleri kodlayarak geçerli URL oluşturur
        var request = new HttpRequestMessage
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri($"https://open-weather13.p.rapidapi.com/city?city={encodedCity}&lang=EN"),
        };

        request.Headers.Add("X-RapidAPI-Key", _configuration["RapidApi:Key"]);
        request.Headers.Add("X-RapidAPI-Host", "open-weather13.p.rapidapi.com");

        var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();
        var body = await response.Content.ReadAsStringAsync();
        return body;
    }
}