"use client";

import { PlusIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

import { ProductColumn, columns } from "./columns";

interface ProductClientProps {
  data: ProductColumn[];
}

const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
  const params = useParams();
  const route = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products(${data.length})`}
          description="Manage products for your store"
        />
        <Button onClick={() => route.push(`/${params.storeId}/products/new`)}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Add new product
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="Api lists." />
      <Separator />
      <ApiList entityName="products" entityIdName="productsId" />
    </>
  );
};

export default ProductClient;
