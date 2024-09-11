import prisma from "@/lib/prismadb";
import BillboardForm from "./components/billboard-form";

interface BillboardsPageParams {
  params: {
    billboardId: string;
  };
}

const BillboardsPage: React.FC<BillboardsPageParams> = async ({ params }) => {
  const billboardData = await prisma.billBoard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 justify-between space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboardData} />
      </div>
    </div>
  );
};

export default BillboardsPage;
