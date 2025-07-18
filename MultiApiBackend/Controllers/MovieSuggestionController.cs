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
    public async Task<IActionResult> GetMovieSuggestion(string genre)
    {
        var result = await _movieSuggestionService.GetMovieSugesstionsAsync(genre);
        return Ok(result);
    }
}