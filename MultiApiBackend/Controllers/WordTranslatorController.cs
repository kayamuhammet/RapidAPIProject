using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class WordTranslatorController : ControllerBase
{
    private readonly WordTranslatorService _wordTranslatorService;

    public WordTranslatorController(WordTranslatorService wordTranslatorService)
    {
        _wordTranslatorService = wordTranslatorService;
    }

    [HttpGet("{word}")]
    public async Task<IActionResult> GetWordTranslationAsync(string word)
    {
        var result = await _wordTranslatorService.TranslateWordAsync(word);
        return Ok(result);
    }
}