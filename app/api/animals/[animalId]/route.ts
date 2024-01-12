import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { animalId: string } }
) {
  try {
    if (!params.animalId) {
      return new NextResponse("Animal ID is required", { status: 400 });
    }
    const animal = await prismadb.animal.findUnique({
      where: {
        id: params.animalId,
      },
    });
    return NextResponse.json(animal);
  } catch (error) {
    console.log("[ANIMAL_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { animalId: string } }
) {
  try {
    const body = await req.json();

    const { name, secret } = body;

    if (!secret) {
      return new NextResponse("Secret is required", { status: 400 });
    }

    if (secret !== process.env.HAIWAN_SECRET_KEY) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const animal = await prismadb.animal.update({
      where: {
        id: params.animalId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(animal);
  } catch (error) {
    console.log("[ANIMAL_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
