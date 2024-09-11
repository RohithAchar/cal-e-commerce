"use client";

import { Trash } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import DeleteStoreModal from "@/components/ui/modals/delete-store-modal";
import { useDeleteStoreModal } from "@/hooks/use-delete-modal";
import ApiAlert from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";

const settingsFormSchema = z.object({
  name: z.string().min(1),
});

type SettingsFormProps = z.infer<typeof settingsFormSchema>;

const SettingsForm: React.FC<SettingsFormProps> = ({ name }) => {
  const [loading, setLoading] = useState(false);
  const deleteStoreModal = useDeleteStoreModal();
  const params = useParams();
  const route = useRouter();
  const origin = useOrigin();

  const form = useForm<z.infer<typeof settingsFormSchema>>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      name: name,
    },
  });

  const onSubmit = async (values: z.infer<typeof settingsFormSchema>) => {
    try {
      setLoading(true);
      const res = await axios.patch(`/api/stores/${params.storeId}`, {
        name: values.name,
      });
      route.refresh();
      toast.success("Update successful");
    } catch (error) {
      toast.error("Error");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      toast.success("Deleted successful");
      window.location.assign("/");
    } catch (error) {
      console.log(error);
      toast.error("Make sure you removed all products and categories first.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DeleteStoreModal onDelete={onDelete} loading={loading} />
      <div className="flex justify-between items-center">
        <Heading title="Settings" description="Manage store preferences" />
        <Button
          variant="destructive"
          size="icon"
          onClick={() => deleteStoreModal.onOpen()}
        >
          <Trash />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="store name" {...field} />
                </FormControl>
                <FormDescription>
                  This will update your store name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} type="submit">
            Save changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        varient="public"
      />
    </>
  );
};

export default SettingsForm;
