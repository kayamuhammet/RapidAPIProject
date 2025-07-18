
public class MovieSuggestionService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public MovieSuggestionService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
    }

    public async Task<string> GetMovieSugesstionsAsync(string genre)
    {
        var request = new HttpRequestMessage
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri($"https://imdb236.p.rapidapi.com/api/imdb/search?type=movie&genre={genre}&rows=25&sortOrder=ASC&sortField=id"),
        };

        request.Headers.Add("X-RapidAPI-Key", _configuration["RapidApi:Key"]);
        request.Headers.Add("X-RapidAPI-Host", "imdb236.p.rapidapi.com");

        var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();
        var body = await response.Content.ReadAsStringAsync();
        return body;
    }
}