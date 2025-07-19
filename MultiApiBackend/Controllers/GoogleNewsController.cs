using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class GoogleNewsController : ControllerBase
{
    private readonly GoogleNewsService _googleNewsService;

    public GoogleNewsController(GoogleNewsService googleNewsService)
    {
        _googleNewsService = googleNewsService;
    }

    [HttpGet]
    public async Task<IActionResult> GetGoogleNewsAsync()
    {
        var result = await _googleNewsService.GetGoogleNews();
        return Ok(result);
    }
}