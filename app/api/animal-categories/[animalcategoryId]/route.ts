import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { animalcategoryId: string } }
) {
  try {
    if (!params.animalcategoryId) {
      return new NextResponse("Animal Category ID is required", {
        status: 400,
      });
    }
    const animalCategory = await prismadb.animalCategory.findUnique({
      where: {
        id: params.animalcategoryId,
      },
    });
    return NextResponse.json(animalCategory);
  } catch (error) {
    console.log("[ANIMAL_CATEGORY_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { animalcategoryId: string } }
) {
  try {
    const body = await req.json();

    const { name, animalId, secret } = body;

    if (!secret) {
      return new NextResponse("Secret is required", { status: 400 });
    }

    if (secret !== process.env.HAIWAN_SECRET_KEY) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!animalId) {
      return new NextResponse("Animal ID is required", { status: 400 });
    }

    const animalCategory = await prismadb.animalCategory.update({
      where: {
        id: params.animalcategoryId,
      },
      data: {
        name,
        animalId,
      },
    });

    return NextResponse.json(animalCategory);
  } catch (error) {
    console.log("[ANIMAL_CATEGORY_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { animalcategoryId: string } }
) {
  try {
    const body = await req.json();

    const { secret } = body;

    if (!secret) {
      return new NextResponse("Secret is required", { status: 400 });
    }

    if (secret !== process.env.HAIWAN_SECRET_KEY) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const animalCategory = await prismadb.animalCategory.delete({
      where: {
        id: params.animalcategoryId,
      },
    });

    return NextResponse.json(animalCategory);
  } catch (error) {
    console.log("[ANIMAL_CATEGORY_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
