"use client";

import { PlusIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

import { OrderColumn, columns } from "./columns";

interface OrdersClientProps {
  data: OrderColumn[];
}

const OrdersClient: React.FC<OrdersClientProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Orders(${data.length})`}
          description="Manage orders for your store"
        />
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  );
};

export default OrdersClient;
