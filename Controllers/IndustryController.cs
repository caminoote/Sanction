using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Comp
{
    [Route("api/[controller]")]
    [ApiController]
    public class IndustryController : ControllerBase
    {
        private readonly CompContext _context;

        public IndustryController(CompContext context)
        {
            _context = context;
            if (_context.Industries.Count() == 0)
            {
                _context.Industries.Add(new Industry { Type = "Onime" });
                _context.SaveChanges();
            }
        }


        #region GET
        [HttpGet]
        public IEnumerable<Industry> GetAll()
        {
            return _context.Industries.Include(p => p.Sanctions);
        }
        #endregion


        #region GET по id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetIndustry([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var industry = await _context.Industries.SingleOrDefaultAsync(m => m.IdIndustry == id);

            if (industry == null)
            {
                return NotFound();
            }

            return Ok(industry);
        }
        #endregion


        #region POST
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Industry industry)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Industries.Add(industry);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetIndustry", new { id = industry.IdIndustry }, industry);
        }
        #endregion


        #region PUT
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] Industry industry)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Industries.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            item.Type = industry.Type;
            _context.Industries.Update(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        #endregion


        #region DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Industries.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            _context.Industries.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        #endregion
    }
}
