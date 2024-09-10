import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { UserButton } from "@clerk/nextjs";
import ComboStore from "@/components/combo-store";
import prisma from "@/lib/prismadb";
import MainNavigation from "./main-nav";

export default async function NavBar() {
  const user = auth();

  const stores = await prisma.store.findMany({
    where: {
      userId: user.userId as string,
    },
  });

  if (!stores) {
    redirect("/");
  }

  const alteredStores = stores.map((store) => {
    return {
      name: store.name,
      id: store.id,
    };
  });

  return (
    <div className="h-16 flex items-center px-4 gap-4 border-b">
      <ComboStore stores={alteredStores} />
      <MainNavigation />
      <div className="ml-auto">
        <UserButton />
      </div>
    </div>
  );
}
