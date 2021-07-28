using RetryCoreAn.Repository;

namespace RetryCoreAn.Controllers
{
    public class SuppliersController : GenericController<Supplier>
    {
        public SuppliersController(NorthwindContext context): base(context)
        {
        }
    }
}
