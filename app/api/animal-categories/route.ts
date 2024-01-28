import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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

    const animalCategory = await prismadb.animalCategory.create({
      data: {
        id: name.replaceAll(" ", "-").toLowerCase(),
        name,
        animalId,
      },
    });

    return NextResponse.json(animalCategory);
  } catch (error) {
    console.log("[ANIMAL_CATEGORY_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const categories = await prismadb.animalCategory.findMany();

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[ANIMAL_CATEGORY_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
