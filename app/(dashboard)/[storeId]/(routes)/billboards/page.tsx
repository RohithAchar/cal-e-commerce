import prisma from "@/lib/prismadb";
import { format } from "date-fns";

import BillboardsClient from "./components/client";
import { BillboardColumn } from "./components/columns";

const Billboards = async ({
  params,
}: {
  params: {
    storeId: string;
  };
}) => {
  const billboards = await prisma.billBoard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatedBillboard: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardsClient data={formatedBillboard} />
      </div>
    </div>
  );
};

export default Billboards;
