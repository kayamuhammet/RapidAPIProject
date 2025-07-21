using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class MovieSuggestionController : ControllerBase
{
    private readonly MovieSuggestionService _movieSuggestionService;

    public MovieSuggestionController(MovieSuggestionService movieSuggestionService)
    {
        _movieSuggestionService = movieSuggestionService;
    }

    [HttpGet("{genre}")]
    public async Task<IActionResult> GetMovieSuggestion(string genre, [FromQuery] string? cursor = null)
    {
        var result = await _movieSuggestionService.GetMovieSuggestionsAsync(genre, cursor);
        return Ok(result);
    }
}