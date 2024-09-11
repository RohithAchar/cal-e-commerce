import prisma from "@/lib/prismadb";
import CategoryForm from "./components/size-form";

interface SizePageParams {
  params: {
    sizeId: string;
    storeId: string;
  };
}

const SizePage: React.FC<SizePageParams> = async ({ params }) => {
  const sizeData = await prisma.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 justify-between space-y-4 p-8 pt-6">
        <CategoryForm initialData={sizeData} />
      </div>
    </div>
  );
};

export default SizePage;
