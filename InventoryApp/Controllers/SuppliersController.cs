using InventoryApp.Repository;

namespace InventoryApp.Controllers
{
    public class SuppliersController : GenericController<Supplier>
    {
        public SuppliersController(NorthwindContext context): base(context)
        {
        }
    }
}
