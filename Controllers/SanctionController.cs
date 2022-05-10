using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Comp
{
    [Route("api/[controller]")]
    [ApiController]
    public class SanctionController : ControllerBase
    {
        private readonly CompContext _context;

        public SanctionController(CompContext context)
        {
            _context = context;
            if (_context.Sanctions.Count() == 0)
            {
                _context.Sanctions.Add(new Sanction
                {
                    SanctionText = "Тssdfasdfa ASDassssss",
                    IdIndustry = 1
                });
                _context.SaveChanges();
            }
        }


        #region GET
        [HttpGet]
        public IEnumerable<Sanction> GetAll()
        {
           return _context.Sanctions.Include(a => a.IdIndustryNavigation).Include(s => s.Companies);
        }
        #endregion


        #region GET по id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSanction([FromRoute] int id) 
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //string s = Convert.ToBase64String(evnt.Poster);

            var ev = await _context.Sanctions.Include(a => a.IdIndustryNavigation).Include(p => p.Companies).SingleOrDefaultAsync(m => m.IdSanction == id);



            if (ev == null)
            {
                return NotFound();
            }

            return Ok(ev);
            //return Ok(new { ev, s });
        }
        #endregion


        #region POST
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Sanction sanction)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Sanctions.Add(sanction);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSanction", new { id = sanction.IdSanction }, sanction);
        }
        #endregion


        #region PUT
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] Sanction sanction)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Sanctions.Find(id);
            if (item == null)
            {
                return NotFound();
            }

            //item.Title = evnt.Title;
            item.SanctionText = sanction.SanctionText;
            ////item.Site = evnt.Site;
            ////item.Poster = evnt.Poster;
            ////item.TypeId = evnt.TypeId;
            ////item.CategoryId = evnt.CategoryId;
            ////item.AgeId = evnt.AgeId;


            _context.Sanctions.Update(item);

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

            //var item4 = _context.UsersSessions.Where(p => p.SessionId == id).ToList();
            //var item3 = _context.Sessions.Where(p => p.EventsOrganizersId == id).ToList();
            var item2 = _context.Companies.Where(p => p.IdSanction == id).ToList();
            var item = _context.Sanctions.Find(id);

            if (item == null)
            {
                return NotFound();
            }




;
            _context.Sanctions.Remove(item);

            await _context.SaveChangesAsync();
            return NoContent();
        }
        #endregion
    }
}
