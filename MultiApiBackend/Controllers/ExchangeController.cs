using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ExchangeController : ControllerBase
{
    private readonly ExchangeService _exchangeService;

    public ExchangeController(ExchangeService exchangeService)
    {
        _exchangeService = exchangeService;
    }

    [HttpGet("{baseCurrency}")]
    public async Task<IActionResult> GetExchange(string baseCurrency)
    {
        var result = await _exchangeService.GetExchangeRatesAsync(baseCurrency.ToUpper());
        return Ok(result);
    }
}