import prismadb from "@/lib/prismadb";
import { AnimalClient } from "./components/client";
import { format } from "date-fns";

export type AnimalCategoriesColumn = {
  id: string;
  name: string;
  createdAt: string;
  // updatedAt: string
};

export type AnimalColumn = {
  id: string;
  name: string;
  createdAt: string;
  // updatedAt: string
  animal_categories: AnimalCategoriesColumn[];
};

const AnimalsPage = async ({ params }: { params: { storeId: string } }) => {
  const animals = await prismadb.animal.findMany({
    include: {
      animal_categories: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const formattedAnimals: AnimalColumn[] = animals.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "dd/MM/yyyy"),
    animal_categories: item.animal_categories.map((category) => ({
      id: category.id,
      name: category.name,
      createdAt: format(category.createdAt, "dd/MM/yyyy"),
    })),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AnimalClient data={formattedAnimals} />
      </div>
    </div>
  );
};

export default AnimalsPage;
