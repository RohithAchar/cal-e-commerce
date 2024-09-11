import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      storeId: string;
      sizeId: string;
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

    const size = await prisma.size.update({
      where: {
        id: params.sizeId,
        storeId: params.storeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(size, { status: 200 });
  } catch (error) {
    console.log("[SIZE_PATCH]" + error);
    return new NextResponse("Something went wrong", { status: 401 });
  }
}

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      storeId: string;
      sizeId: string;
    };
  }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const billboard = await prisma.billBoard.findFirst({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(billboard, { status: 200 });
  } catch (error) {
    console.log("[SIZE_GET]" + error);
    return new NextResponse("Something went wrong", { status: 401 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      storeId: string;
      sizeId: string;
    };
  }
) {
  try {
    console.log(params.sizeId);
    const { userId }: { userId: string | null } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
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

    const billboard = await prisma.size.delete({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(billboard, { status: 200 });
  } catch (error) {
    console.log("[SIZE_DELETE]" + error);
    return new NextResponse("Something went wrong", { status: 401 });
  }
}
