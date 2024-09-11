import prisma from "@/lib/prismadb";
import CategoryForm from "./components/category-form";

interface CategoryPageParams {
  params: {
    categoryId: string;
    storeId: string;
  };
}

const CategoryPage: React.FC<CategoryPageParams> = async ({ params }) => {
  const categoryData = await prisma.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboardData = await prisma.billBoard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 justify-between space-y-4 p-8 pt-6">
        <CategoryForm initialData={categoryData} billboards={billboardData} />
      </div>
    </div>
  );
};

export default CategoryPage;
