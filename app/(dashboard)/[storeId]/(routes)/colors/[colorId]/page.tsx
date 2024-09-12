import prisma from "@/lib/prismadb";
import CategoryForm from "./components/color-form";

interface ColorPageParams {
  params: {
    colorId: string;
    storeId: string;
  };
}

const ColorPage: React.FC<ColorPageParams> = async ({ params }) => {
  const colorData = await prisma.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 justify-between space-y-4 p-8 pt-6">
        <CategoryForm initialData={colorData} />
      </div>
    </div>
  );
};

export default ColorPage;
