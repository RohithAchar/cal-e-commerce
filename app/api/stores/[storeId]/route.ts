import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

interface ParamsType {
  params: {
    storeId: string;
  };
}

export async function PATCH(req: NextRequest, { params }: ParamsType) {
  console.log(params.storeId);
  try {
    const { userId } = auth();
    const data = await req.json();
    const { name } = data;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 500 });
    }

    const store = await prisma.store.updateMany({
      where: {
        id: params.storeId,
      },
      data: {
        name,
      },
    });

    if (!store) {
      return new NextResponse("Store not found", { status: 500 });
    }

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_PATCH]" + error);
    return new NextResponse("Something went wrong", { status: 401 });
  }
}

export async function DELETE(req: NextRequest, { params }: ParamsType) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 500 });
    }

    const store = await prisma.store.deleteMany({
      where: {
        id: params?.storeId,
      },
    });

    if (!store) {
      return new NextResponse("Store not found", { status: 500 });
    }

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_DELETE]" + error);
    return new NextResponse("Something went wrong", { status: 401 });
  }
}
