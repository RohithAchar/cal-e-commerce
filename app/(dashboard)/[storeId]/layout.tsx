import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import prisma from "@/lib/prismadb";
import NavBar from "@/components/nav-bar";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prisma.store.findFirst({
    where: {
      userId: userId,
      id: params.storeId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <NavBar />
      <div className="p-8 pt-6">{children}</div>
    </>
  );
}
