import { ApiList } from "@/components/ui/api-list";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { AnimalColumn } from "../page";

interface AnimalClientProps {
  data: AnimalColumn[];
}

export const AnimalClient: React.FC<AnimalClientProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Animals" description="View and manage your animals" />
      </div>
      <Separator />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer h-[200px]"
          >
            <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
          </div>
        ))}
      </div>
      <ApiList entityName="animals" entityIdName="animalId" superAdmin />
    </>
  );
};
