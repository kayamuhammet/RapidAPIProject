
public class MovieSuggestionService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public MovieSuggestionService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
    }

    public async Task<string> GetMovieSuggestionsAsync(string genre, string? cursor = null)
    {
        var requestUri = $"https://imdb236.p.rapidapi.com/api/imdb/search?type=movie&genre={genre}&rows=25&sortOrder=ASC&sortField=id";
        if (!string.IsNullOrEmpty(cursor))
        {
            requestUri += $"&cursorMark={cursor}";
        }

        var request = new HttpRequestMessage
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri(requestUri),
        };

        request.Headers.Add("X-RapidAPI-Key", _configuration["RapidApi:Key"]);
        request.Headers.Add("X-RapidAPI-Host", "imdb236.p.rapidapi.com");

        var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();
        var body = await response.Content.ReadAsStringAsync();
        return body;
    }
}