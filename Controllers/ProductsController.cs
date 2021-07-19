﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CoreAn.Repository;

namespace CoreAn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly NorthwindContext _context;

        public ProductsController(NorthwindContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {

            var products = await _context.Products.ToListAsync();


            var qry = from p in products
                      join c in _context.Categories on p.CategoryId equals c.CategoryId into pc
                      join s in _context.Suppliers on p.SupplierId equals s.SupplierId into ps
                      from c in pc.DefaultIfEmpty()
                      from s in ps.DefaultIfEmpty()
                      select new
                      {
                          p,
                          c,
                          s
                      };

            var pQry = qry.Select(grp =>
            {
                if (grp.c != null)
                {
                    grp.p.Category = new Category
                    {
                        CategoryId = grp.c.CategoryId,
                        CategoryName = grp.c.CategoryName
                    };
                }

                if (grp.s != null)
                {

                    grp.p.Supplier = new Supplier
                    {
                        SupplierId = grp.s.SupplierId,
                        CompanyName = grp.s.CompanyName
                    };
                }

                return grp.p;
            });


            return pQry.ToList();
            //return await _context.Products.Include(x => x.Category).Include(x => x.Supplier).ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.ProductId)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.ProductId }, product);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.ProductId == id);
        }
    }
}
