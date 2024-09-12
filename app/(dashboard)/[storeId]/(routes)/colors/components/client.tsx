"use client";

import { PlusIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

import { ColorColumn, columns } from "./columns";

interface ColorProps {
  data: ColorColumn[];
}

const ColorsClient: React.FC<ColorProps> = ({ data }) => {
  const params = useParams();
  const route = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors(${data.length})`}
          description="Manage color for your store"
        />
        <Button onClick={() => route.push(`/${params.storeId}/colors/new`)}>
          <PlusIcon className="w-4 h-4" />
          Add new color
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="Api lists." />
      <Separator />
      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  );
};

export default ColorsClient;
