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
    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 401 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const storeByUser = prisma.store.findFirst({
      where: {
        id: params.storeId,
        userId: userId,
      },
    });

    if (!storeByUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const size = await prisma.size.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(size, { status: 200 });
  } catch (error) {
    console.log("[SIZES_POST]" + error);
    return new NextResponse("Something went wrong", { status: 401 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const sizes = await prisma.size.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(sizes, { status: 200 });
  } catch (error) {
    console.log("[SIZES_GET]" + error);
    return new NextResponse("Something went wrong", { status: 401 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId }: { userId: string | null } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const storeByUser = prisma.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const sizes = await prisma.size.deleteMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(sizes, { status: 200 });
  } catch (error) {
    console.log("[SIZES_GET]" + error);
    return new NextResponse("Something went wrong", { status: 401 });
  }
}
