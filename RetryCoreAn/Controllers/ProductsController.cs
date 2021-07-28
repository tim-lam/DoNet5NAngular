using RetryCoreAn.Repository;

namespace RetryCoreAn.Controllers
{
    //[Route("api/[controller]")] //if overwrite generic controller's default route
    public class ProductsController : GenericController<Product>
    {
        public ProductsController(NorthwindContext context) :base(context)
        {
        }
    }
}
