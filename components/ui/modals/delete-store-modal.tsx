"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { useDeleteStoreModal } from "@/hooks/use-delete-modal";
import { Button } from "@/components/ui/button";

const DeleteStoreModal = ({
  onDelete,
  loading,
}: {
  onDelete: () => void;
  loading?: boolean;
}) => {
  const [isMount, setIsMount] = useState(false);
  const deleteModal = useDeleteStoreModal();

  useEffect(() => {
    setIsMount(true);
  }, []);

  if (!isMount) {
    return null;
  }

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
        <Button disabled={loading} onClick={onDelete}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteStoreModal;
