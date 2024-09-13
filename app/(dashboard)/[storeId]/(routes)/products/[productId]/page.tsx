import prisma from "@/lib/prismadb";
import ProductForm from "./components/product-form";

interface BillboardsPageParams {
  params: {
    productId: string;
    storeId: string;
  };
}

const ProductPage: React.FC<BillboardsPageParams> = async ({ params }) => {
  const productData = await prisma.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categoryData = await prisma.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizeData = await prisma.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colorData = await prisma.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 justify-between space-y-4 p-8 pt-6">
        <ProductForm
          initialData={productData}
          categories={categoryData}
          sizes={sizeData}
          colors={colorData}
        />
      </div>
    </div>
  );
};

export default ProductPage;
