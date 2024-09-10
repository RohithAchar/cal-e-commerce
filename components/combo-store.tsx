"use client";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import { Check, ChevronsUpDown, Store, CirclePlus } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useStoreModal } from "@/hooks/use-store-modal";

interface ComboStoreProps {
  id: string;
  name: string;
}
interface ComboStoreComponentProps {
  stores: ComboStoreProps[];
}

export default function ComboStore({ stores }: ComboStoreComponentProps) {
  const { storeId } = useParams();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(
    stores.find((store) => store.id == storeId)?.name
  );
  const storeModal = useStoreModal();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <Store className="h-5" />
          {value
            ? stores.find((store) => store.id == storeId)?.name
            : "Select store..."}
          <ChevronsUpDown className="ml-2 h-4 shring-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Serach store..." />
          <CommandList>
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup>
              {stores.map((store) => (
                <CommandItem
                  key={store.id}
                  value={store.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    window.location.assign(`/${store.id}`);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === store.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {store.name}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <Button
              variant="ghost"
              className="w-[200px] justify-start gap-2 items-center"
              onClick={() => storeModal.onOpen()}
            >
              <CirclePlus className="w-4 h-4" />
              Add new store
            </Button>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
