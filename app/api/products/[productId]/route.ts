import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product ID is required", { status: 400 });
    }
    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        animal: true,
        animalCategory: true,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log(`[PRODUCT_GET]`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
