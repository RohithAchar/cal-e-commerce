"use client";

import { Trash } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BillBoard } from "prisma/prisma-client";

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
import ImageUpload from "@/components/ui/image-upload";

interface BillboardFormProps {
  initialData: BillBoard | null;
}

const settingsFormSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

const BillboardForm: React.FC<BillboardFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const deleteStoreModal = useDeleteStoreModal();
  const params = useParams();
  const route = useRouter();

  const title = initialData ? "Update billboard" : "Add new billboard";
  const description = initialData
    ? "Update your billboard."
    : "Add your store billboard.";
  const action = initialData ? "Save changes" : "Add";
  const toastMessage = initialData ? "Update successful" : "Added successfully";

  const form = useForm<z.infer<typeof settingsFormSchema>>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, data);
      }
      route.refresh();
      toast.success(toastMessage);
      window.location.assign(`/${params.storeId}/billboards`);
    } catch (error) {
      toast.error("Error");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/billboards/${params.billboardId}`
      );
      toast.success("Deleted successful");
      window.location.assign(`/${params.storeId}/billboards`);
    } catch (error) {
      console.log(error);
      toast.error(
        "Make sure you removed all categories using this billboard first."
      );
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
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={(url) => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input
                    className="w-[280px]"
                    placeholder="billboard label"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default BillboardForm;
