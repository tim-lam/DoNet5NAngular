using InventoryApp.Repository;

namespace InventoryApp.Controllers
{
    public class CategoriesController : GenericController<Category>
    {
        public CategoriesController(NorthwindContext context) : base(context)
        {
        }
    }
}
