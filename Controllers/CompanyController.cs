using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Comp
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly CompContext _context;

        public CompanyController(CompContext context)
        {
            _context = context;
            if (_context.Companies.Count() == 0)
            {
                _context.Companies.Add(new Company { IdSanction = 1 });
                _context.SaveChanges();
            }
        }


        #region GET
        [HttpGet]
        public IEnumerable<Company> GetAll()
        {
            return _context.Companies.Include(p => p.IdSanctionNavigation);
        }
        #endregion


        #region GET по id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCompany([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

             var sess = await _context.Companies.Include(p => p.IdSanctionNavigation).SingleOrDefaultAsync(m => m.IdCompany == id);

            if (sess == null)
            {
                return NotFound();
            }

            return Ok(sess);
        }
        #endregion


        #region POST
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Company company)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Companies.Add(company);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCompany", new { id = company.IdCompany }, company);
        }
        #endregion


        #region PUT
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] Company company)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Companies.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            item.IdSanction = company.IdSanction;
            item.NameCompany = company.NameCompany;
            _context.Companies.Update(item);
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
            var item = _context.Companies.Find(id);

            if (item == null)
            {
                return NotFound();
            }

            _context.Companies.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        #endregion

    }
}
