"use client";

import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

const BillboardsClient = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Billboards(0)"
          description="Manage billboards for your store"
        />
        <Button>
          <PlusIcon className="w-4 h-4" />
          Add new billboard
        </Button>
      </div>
      <Separator />
    </>
  );
};

export default BillboardsClient;
