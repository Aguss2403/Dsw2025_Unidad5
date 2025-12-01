import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../shared/components/Button";
import Card from "../../shared/components/Card";
import Input from "../../shared/components/Input";
import { createProduct } from "../services/create";
import { useState } from "react";
import { frontendErrorMessage } from "../helpers/backendError";
import { Link } from "react-router-dom";

function CreateProductForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      sku: "",
      cui: "",
      name: "",
      description: "",
      price: 0,
      stock: 0,
    },
  });

  const [errorBackendMessage, setErrorBackendMessage] = useState("");
  const navigate = useNavigate();

  const onValid = async (formData) => {
    try {
      await createProduct(formData);
      alert("Producto creado exitosamente");
      navigate("/admin/products");
    } catch (error) {
      if (error.response?.data?.detail) {
        const errorMessage = frontendErrorMessage[error.response.data.code];

        setErrorBackendMessage(errorMessage);
      } else {
        setErrorBackendMessage("Contactar a Soporte");
      }
    }
  };

  return (
    <Card>
      <form
        className="
          flex
          flex-col
          gap-20
          p-8

          sm:gap-4
        "
        onSubmit={handleSubmit(onValid)}
      >
        <Input
          label="SKU"
          error={errors.sku?.message}
          {...register("sku", {
            required: "SKU es requerido",
          })}
        />
        <Input
          label="Código Único"
          error={errors.cui?.message}
          {...register("cui", {
            required: "Código Único es requerido",
          })}
        />
        <Input
          label="Nombre"
          error={errors.name?.message}
          {...register("name", {
            required: "Nombre es requerido",
          })}
        />
        <Input label="Descripción" {...register("description")} />
        <Input
          label="Precio"
          error={errors.price?.message}
          type="number"
          {...register("price", {
            min: {
              value: 0,
              message: "No puede tener un precio negativo",
            },
          })}
        />
        <Input
          label="Stock"
          error={errors.stock?.message}
          {...register("stock", {
            min: {
              value: 0,
              message: "No puede tener un stock negativo",
            },
          })}
        />
        <div className="flex justify-between sm:text-end">
          <Button variant="secondary ">
            <Link to="/admin/products">Cancelar</Link>
          </Button>
          <Button type="submit" className="w-fit sm:w-auto">
            Crear Producto
          </Button>
        </div>
        {errorBackendMessage && (
          <span className="text-red-500">{errorBackendMessage}</span>
        )}
      </form>
    </Card>
  );
}

export default CreateProductForm;
