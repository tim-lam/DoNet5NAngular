using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InventoryApp.Repository;
using Microsoft.AspNetCore.Mvc;

namespace InventoryApp.Controllers
{
    //[Route("api/[controller]")] //if overwrite generic controller's default route
    public class ProductsController : GenericController<Product>
    {
        private NorthwindContext _context => this.Context as NorthwindContext;
        public ProductsController(NorthwindContext context) :base(context)
        {
        }

        // GET: api/Products
        [HttpGet]
        public override async Task<ActionResult<IEnumerable<Product>>> Get()
        {
            var products = (await base.Get()).Value;

            var qry = products
                .GroupJoin(_context.Categories, p => p.CategoryId, c => c.CategoryId, (p, c) =>
                {
                    var category = c.SingleOrDefault();
                    if (category != null)
                    {
                        p.Category = new Category
                        {
                            CategoryId = category.CategoryId,
                            CategoryName = category.CategoryName
                        };
                    }

                    return p;
                })
                .GroupJoin(_context.Suppliers, p => p.SupplierId, s => s.SupplierId, (p, s) =>
                {
                    var supplier = s.SingleOrDefault();
                    if (supplier != null)
                    {
                        p.Supplier = new Supplier
                        {
                            SupplierId = supplier.SupplierId,
                            CompanyName = supplier.CompanyName
                        };
                    }

                    return p;
                });

                return qry.ToList(); // await Context.Set<Product>().Include(x => x.Category).Include(x => x.Supplier).ToListAsync();
        }

        [HttpGet("{id}")]
        public override async Task<ActionResult<Product>> Get(int id)
        {
            var product = (await base.Get(id)).Value;
            product.Category = Context.Set<Category>().Find(product.CategoryId);
            product.Supplier = Context.Set<Supplier>().Find(product.SupplierId);
            return product;
        }
    }
}
