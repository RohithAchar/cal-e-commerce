"use client";

import { CopyIcon, Edit, MoreHorizontal, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SizeColumn } from "./columns";
import { Button } from "@/components/ui/button";
import DeleteStoreModal from "@/components/ui/modals/delete-store-modal";
import { useDeleteStoreModal } from "@/hooks/use-delete-modal";

interface CellActionsProps {
  data: SizeColumn;
}

const CellActions: React.FC<CellActionsProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const deleteStoreModal = useDeleteStoreModal();
  const router = useRouter();
  const params = useParams();

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/sizes/${data.id}`);
      toast.success("Deleted successful");
      window.location.assign(`/${params.storeId}/sizes`);
    } catch (error) {
      console.log(error);
      toast.error("Make sure you removed all sizes using this sizes first.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DeleteStoreModal loading={loading} onDelete={onDelete} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(data.id);
              toast.success("Billboard id copied to clipboard.");
            }}
          >
            <CopyIcon className="w-4 h-4 mr-2" />
            Copy
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${params.storeId}/sizes/${data.id}`)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => deleteStoreModal.onOpen()}>
            <Trash className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellActions;
