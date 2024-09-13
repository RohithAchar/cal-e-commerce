import prisma from "@/lib/prismadb";
import { format } from "date-fns";

import { formatter } from "@/lib/utils";

import OrdersClient from "./components/client";
import { OrderColumn } from "./components/columns";

const Orders = async ({
  params,
}: {
  params: {
    storeId: string;
  };
}) => {
  const orders = await prisma.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatedOrder: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    isPaid: item.isPaid,
    address: item.address,
    products: item.orderItems.map((item) => item.product.name).join(", "),
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return (total = total + Number(item.product.price));
      }, 0)
    ),
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrdersClient data={formatedOrder} />
      </div>
    </div>
  );
};

export default Orders;
