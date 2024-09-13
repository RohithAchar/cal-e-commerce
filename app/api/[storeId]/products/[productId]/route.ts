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
      productId: string;
    };
  }
) {
  try {
    const { userId }: { userId: string | null } = auth();
    const body = await req.json();
    const {
      name,
      price,
      images,
      categoryId,
      sizeId,
      colorId,
      isArchived,
      isFeatured,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Image is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category Id is required", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("Size Id is required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Color Id is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse("Product id required", { status: 400 });
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

    await prisma.product.update({
      where: {
        id: params.productId,
        storeId: params.storeId,
      },
      data: {
        name,
        price,
        colorId,
        sizeId,
        categoryId,
        isArchived,
        isFeatured,
        images: {
          deleteMany: {},
        },
      },
    });

    const product = await prisma.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("[PRODUCT_PATCH]" + error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      storeId: string;
      productId: string;
    };
  }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse("Product id required", { status: 400 });
    }

    const product = await prisma.product.findFirst({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        size: true,
        color: true,
        category: true,
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("[PRODUCT_GET]" + error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      storeId: string;
      productId: string;
    };
  }
) {
  try {
    const { userId }: { userId: string | null } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse("Product id required", { status: 400 });
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

    const product = await prisma.product.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("[PRODUCT _DELETE]" + error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
