"use client";

import { Trash } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Size } from "prisma/prisma-client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import DeleteStoreModal from "@/components/ui/modals/delete-store-modal";
import { useDeleteStoreModal } from "@/hooks/use-delete-modal";

interface SizeFormProps {
  initialData: Size | null;
}

const sizeFormSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

const SizeForm: React.FC<SizeFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const deleteStoreModal = useDeleteStoreModal();
  const params = useParams();
  const route = useRouter();

  const title = initialData ? "Update size" : "Add new size";
  const description = initialData
    ? "Update your size."
    : "Add your store size.";
  const action = initialData ? "Save changes" : "Add";
  const toastMessage = initialData ? "Update successful" : "Added successfully";

  const form = useForm<z.infer<typeof sizeFormSchema>>({
    resolver: zodResolver(sizeFormSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/sizes/${params.sizeId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/sizes`, data);
      }
      route.refresh();
      toast.success(toastMessage);
      window.location.assign(`/${params.storeId}/sizes`);
    } catch (error) {
      toast.error("Error");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
      toast.success("Deleted successful");
      window.location.assign(`/${params.storeId}/sizes`);
    } catch (error) {
      console.log(error);
      toast.error("Make sure you removed all size using this sizes first.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DeleteStoreModal onDelete={onDelete} />
      <div className="flex justify-between items-center">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant="destructive"
            size="icon"
            onClick={() => deleteStoreModal.onOpen()}
          >
            <Trash />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[280px]"
                      placeholder="size name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[280px]"
                      placeholder="size value"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={loading} type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SizeForm;
