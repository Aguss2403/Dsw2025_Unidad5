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
      // Obtenemos la respuesta de error del backend
      const serverError = error.response?.data; 

      console.log("---- DEBUG ERROR ----");
      console.log("Objeto error completo:", error);
      console.log("Respuesta del servidor (data):", serverError);
      console.log("Código recibido:", serverError?.code);
      console.log("Tipo de dato del código:", typeof serverError?.code);
      
      const mappedMessage = frontendErrorMessage[serverError?.code];

      if (mappedMessage) {
        setErrorBackendMessage(mappedMessage);
      } 
      else if (serverError?.message) {
        setErrorBackendMessage(serverError.message);
      }
      else {
        setErrorBackendMessage("Ocurrió un error inesperado. Contactar a soporte.");
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
            required: "El precio es requerido",
            validate: (value) => parseFloat(value) > 0 || "El precio debe ser mayor a 0" 
          })}
        />
        
        <Input
          label="Stock"
          error={errors.stock?.message}
          type="number"
          {...register("stock", {
            required: "El stock es requerido",
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
