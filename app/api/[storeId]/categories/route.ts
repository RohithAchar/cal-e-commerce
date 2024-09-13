import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: {
      storeId: string;
    };
  }
) {
  try {
    const { userId }: { userId: string | null } = auth();
    const body = await req.json();
    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const storeByUser = prisma.store.findFirst({
      where: {
        id: params.storeId,
        userId: userId,
      },
    });

    if (!storeByUser) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const category = await prisma.category.create({
      data: {
        name,
        billboardId: billboardId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log("[CATEGORIES_POST]" + error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const categories = await prisma.category.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.log("[CATEGORIES_GET]" + error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
