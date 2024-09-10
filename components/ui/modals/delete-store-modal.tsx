"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams } from "next/navigation";

import { Modal } from "@/components/ui/modal";
import { useDeleteStoreModal } from "@/hooks/use-delete-modal";
import { Button } from "@/components/ui/button";

const DeleteStoreModal = () => {
  const [isMount, setIsMount] = useState(false);
  const deleteModal = useDeleteStoreModal();
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    setIsMount(true);
  }, []);

  if (!isMount) {
    return null;
  }

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      toast.success("Deleted successful");
      window.location.assign("/");
    } catch (error) {
      console.log(error);
      toast.error("Make sure you removed all products and categories from the store.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Confirm Deletion"
      description="Are you sure you want to delete this item? This action cannot be undone."
      isOpen={deleteModal.isOpen}
      onClose={deleteModal.onClose}
    >
      <div className="flex justify-end space-x-4">
        <Button
          disabled={loading}
          variant="outline"
          onClick={deleteModal.onClose}
        >
          Cancel
        </Button>
        <Button disabled={loading} onClick={handleConfirm}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteStoreModal;
