import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/product-form";

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const animals = await prismadb.animal.findMany();

  const animalCategories = await prismadb.animalCategory.findMany();

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          animals={animals}
          animalCategories={animalCategories}
          categories={categories}
          initialData={product}
        />
      </div>
    </div>
  );
};

export default ProductPage;
