import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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

    const animal = await prismadb.animal.create({
      data: {
        id: name.replaceAll(" ", "-").toLowerCase(),
        name,
      },
    });

    return NextResponse.json(animal);
  } catch (error) {
    console.log("[ANIMALS_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const animals = await prismadb.animal.findMany({
      include: {
        animal_categories: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(animals);
  } catch (error) {
    console.log("[ANIMALS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
