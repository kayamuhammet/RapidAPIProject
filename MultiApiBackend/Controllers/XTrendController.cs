using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class XTrendController : ControllerBase
{
    private readonly XTrendService _xTrendService;

    public XTrendController(XTrendService xTrendService)
    {
        _xTrendService = xTrendService;
    }

    [HttpGet]
    public async Task<IActionResult> GetXTrend()
    {
        var result = await _xTrendService.GetXTrendAsync();
        return Ok(result);
    }
}