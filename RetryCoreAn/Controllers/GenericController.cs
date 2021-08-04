using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace RetryCoreAn.Controllers
{
 
    [ApiController]
    [Route("api/[controller]")]
    public class GenericController<T> : ControllerBase where T : class
    {
        protected readonly DbContext Context;

        public GenericController (DbContext context)
        {
           Context = context;
        }

        // GET: api/Products
        [HttpGet]
        public virtual async Task<ActionResult<IEnumerable<T>>> Get() 
        {
            return await Context.Set<T>().ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public virtual async Task<ActionResult<T>> Get(int id)
        {
            var product = await Context.Set<T>().FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public virtual async Task<ActionResult<T>> Put(int id, T model)
        {
            if (Context.Entry(model).IsKeySet)
            {
                return BadRequest();
            }

            Context.Entry(model).State = EntityState.Modified;

            try
            {
                await Context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await ModelExists(id))
                {
                    return NotFound();
                }

                throw;
            }

            return CreatedAtAction("Get", new {id}, model);
        }

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public virtual async Task<ActionResult<T>> PostProduct(T model)
        {
            try
            {
                Context.Set<T>().Add(model);

                await Context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return BadRequest(ex.InnerException);
            }
            catch (Exception ex)
            {
                return UnprocessableEntity(ex);
            }
            
            var keyProperty = Context.Model.FindEntityType(typeof(T)).FindPrimaryKey().Properties.Single();

            var id = (int) keyProperty.PropertyInfo.GetValue(model);

            return CreatedAtAction("Get", new {id}, model);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> Delete(int id)
        {
            var model = await Context.Set<T>().FindAsync(id);
            if (model == null)
            {
                return NotFound();
            }
            Context.Set<T>().Remove(model);
            await Context.SaveChangesAsync();

            return NoContent();
        }

        private async Task<bool> ModelExists(int id)
        {
            return  await Context.Set<T>().FindAsync(id) != null;
        }
    }
}
