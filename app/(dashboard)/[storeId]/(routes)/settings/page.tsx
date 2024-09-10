import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import SettingsForm from "./components/settings-form";
import prisma from "@/lib/prismadb";

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const { userId } = auth();
  const { storeId } = params;

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prisma.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm name={store.name} />
      </div>
    </div>
  );
};

export default SettingsPage;
