import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ProductType, useProductStore } from "../../store/product";
import { toast } from "sonner";
import { Card } from "@/components/card";
export const CreatePage = () => {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    image: "",
  });

  const handleAddProduct = async () => {
    console.log(product);
    console.log("products:", products);
    const { success, message } = await addProduct(product);
    console.log({ success, message });
    if (!success) {
      toast.error("Error", {
        description: message,
      });
    }

    toast.success("Success", {
      description: message,
    });
  };

  const { products, addProduct } = useProductStore();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <Label>Name: </Label>
        <Input
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={(e) =>
            setProduct((prev) => {
              return { ...prev, name: e.target.value };
            })
          }
        />
      </div>
      <div className="flex gap-4 items-center">
        <Label>Price: </Label>
        <Input
          name="price"
          placeholder="Price"
          type="number"
          value={product.price}
          onChange={(e) =>
            setProduct((prev) => {
              return { ...prev, price: Number(e.target.value || 0) };
            })
          }
        />
      </div>
      <div className="flex gap-4 items-center">
        <Label>Image: </Label>
        <Input
          name="Image"
          placeholder="Image URL"
          value={product.image}
          onChange={(e) =>
            setProduct((prev) => {
              return { ...prev, image: e.target.value };
            })
          }
        />
      </div>
      <Button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
        variant={"secondary"}
        onClick={handleAddProduct}
      >
        Add Product
      </Button>
      {products.map((product: ProductType, i: number) => (
        <Card key={i} product={product} />
      ))}
    </div>
  );
};
