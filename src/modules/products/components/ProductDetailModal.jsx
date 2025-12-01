import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../shared/components/Modal";
import Button from "../../shared/components/Button";
import Input from "../../shared/components/Input";
import { getProductById } from "../services/getProductById";
import { updateProduct } from "../services/update";

function ProductDetailModal({ isOpen, onClose, productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fetchProduct = async () => {
    if (isOpen && productId) {
      setLoading(true);
      setError(null);
      const { data, error } = await getProductById(productId);

      if (error) {
        setError(error);
      } else {
        setProduct(data);
        reset({
          ...data,
          isActive: data.isActive?.toString(),
        }); // Reset form with fetched data
      }

      setLoading(false);
    } else {
      setProduct(null);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [isOpen, productId, reset]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset({
      ...product,
      isActive: product.isActive?.toString(),
    }); // Revert changes
  };

  const onValid = async (formData) => {
    try {
      setLoading(true);
      const updatedProduct = {
        ...product,
        ...formData,
        isActive: formData.isActive === "true",
      };
      const { data, error } = await updateProduct(updatedProduct);

      if (error) throw error;

      setProduct(data); // Update local state with response
      setIsEditing(false);
      alert("Producto actualizado exitosamente");
      await fetchProduct(); // Refresh data to be sure
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error al actualizar el producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Detalle de Producto #${productId || ""}`}
      maxWidth="max-w-6xl !important"
    >
      {loading && (
        <p className="text-gray-500 text-center">Cargando detalles...</p>
      )}

      {error && (
        <p className="text-red-500 text-center">
          Error al cargar el producto: {error.message || "Error desconocido"}
        </p>
      )}

      {!loading && !error && product && (
        <div className="space-y-6 text-lg">
          {isEditing ? (
            <form onSubmit={handleSubmit(onValid)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Nombre"
                  error={errors.name?.message}
                  {...register("name", { required: "Nombre es requerido" })}
                />
                <Input
                  label="SKU"
                  error={errors.sku?.message}
                  {...register("sku", { required: "SKU es requerido" })}
                />
                <Input label="Código Interno" {...register("internalCode")} />
                <Input
                  label="Precio"
                  type="number"
                  error={errors.currentUnitPrice?.message}
                  {...register("currentUnitPrice", {
                    required: "Precio es requerido",
                    min: { value: 0, message: "No puede ser negativo" },
                  })}
                />
                <Input
                  label="Stock"
                  type="number"
                  error={errors.stockQuantity?.message}
                  {...register("stockQuantity", {
                    required: "Stock es requerido",
                    min: { value: 0, message: "No puede ser negativo" },
                  })}
                />
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Estado
                  </label>
                  <select
                    {...register("isActive")}
                    className="border border-gray-300 rounded-md px-3 py-2"
                    defaultValue={product.isActive?.toString()}
                  >
                    <option value="true">Habilitado</option>
                    <option value="false">Deshabilitado</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <Input
                    label="Descripción"
                    error={errors.description?.message}
                    {...register("description", {
                      required: "Descripción es requerida",
                    })}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="secondary"
                  onClick={handleCancel}
                  type="button"
                >
                  Cancelar
                </Button>
                <Button type="submit">Guardar</Button>
              </div>
            </form>
          ) : (
            <>
              <div className=" text-semibold grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-700">Nombre:</p>
                  <p className="text-gray-900">{product.name}</p>
                </div>
                <div>
                  <p className="text-semibold text-gray-700">SKU:</p>
                  <p className="text-gray-900">{product.sku}</p>
                </div>
                <div>
                  <p className="text-semibold text-gray-700">Código Interno:</p>
                  <p className="text-gray-900">
                    {product.internalCode || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Precio:</p>
                  <p className="text-gray-900">${product.currentUnitPrice}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Stock:</p>
                  <p className="text-gray-900">{product.stockQuantity}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Estado:</p>
                  <span
                    className={`inline-block px-2 py-1 text-sm font-semibold rounded-full ${
                      product.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.isActive ? "Habilitado" : "Deshabilitado"}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <p className="font-semibold text-gray-700">Descripción:</p>
                  <p className="text-gray-600">
                    {product.description || "Sin descripción"}
                  </p>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button onClick={handleEdit}>Editar</Button>
              </div>
            </>
          )}
        </div>
      )}
    </Modal>
  );
}

export default ProductDetailModal;
