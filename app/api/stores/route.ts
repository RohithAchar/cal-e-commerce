import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId }: { userId: string | null } = auth();
    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 401 });
    }

    const store = await prisma.store.create({
      data: {
        name: name,
        userId: userId,
      },
    });

    return NextResponse.json(store, { status: 200 });
  } catch (error) {
    console.log("[STORES_POST]" + error);
    return new NextResponse("Something went wrong", { status: 401 });
  }
}
