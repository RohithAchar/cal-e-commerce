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
    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Unauthorized", { status: 400 });
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

    const billboard = await prisma.billBoard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboard, { status: 200 });
  } catch (error) {
    console.log("[BILLBOARDS_POST]" + error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const billboards = await prisma.billBoard.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboards, { status: 200 });
  } catch (error) {
    console.log("[BILLBOARDS_GET]" + error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
