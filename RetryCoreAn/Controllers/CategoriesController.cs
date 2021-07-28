using RetryCoreAn.Repository;

namespace RetryCoreAn.Controllers
{
    public class CategoriesController : GenericController<Category>
    {
        public CategoriesController(NorthwindContext context) : base(context)
        {
        }
    }
}
