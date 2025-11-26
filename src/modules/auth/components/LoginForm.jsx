import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";
import useAuth from "../hook/useAuth";
import { frontendErrorMessage } from "../helpers/backendError";

function LoginForm({ onSuccess, onSwitchToRegister }) {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { username: "", password: "" } });

  const navigate = useNavigate();
  const { singin } = useAuth();

  const onValid = async (formData) => {
    try {
      const { error } = await singin(formData.username, formData.password);

      if (error) {
        setErrorMessage(error.frontendErrorMessage);
        return;
      }

      // --- MODIFICACIÓN 1: Lógica flexible ---
      if (onSuccess) {
        // Si estamos en un modal, simplemente lo cerramos
        onSuccess();
      } else {
        // Si estamos en la página de login, navegamos según el rol
        if (localStorage.getItem("role") === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      if (error?.response?.data?.code) {
        setErrorMessage(frontendErrorMessage[error?.response?.data?.code]);
      } else {
        setErrorMessage("Llame a soporte");
      }
    }
  };

  // --- MODIFICACIÓN 2: Estilos dinámicos ---
  // Si hay onSuccess (Modal), usamos estilos limpios.
  // Si no (Página), usamos estilos de tarjeta (shadow, bg-white, etc).
  const formClasses = onSuccess
    ? "flex flex-col gap-4" // Estilo para Modal (Simple)
    : "flex flex-col gap-6 sm:gap-4 bg-white p-6 sm:p-8 sm:w-md sm:rounded-lg sm:shadow-lg"; // Estilo para Página (Tarjeta)

  return (
    <form className={formClasses} onSubmit={handleSubmit(onValid)}>
      <Input
        label="Usuario"
        {...register("username", {
          required: "Usuario es obligatorio",
        })}
        error={errors.username?.message}
      />
      <Input
        label="Contraseña"
        {...register("password", {
          required: "Contraseña es obligatorio",
        })}
        type="password"
        error={errors.password?.message}
      />

      <Button type="submit">Iniciar Sesión</Button>

      {/* --- MODIFICACIÓN 3: Navegación en registro --- */}
      <Button
        variant="secondary"
        onClick={() => {
          if (onSuccess) onSuccess(); // Cierra el modal si está abierto
          navigate("/register");
        }}
      >
        Registrar Usuario
      </Button>

      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </form>
  );
}

export default LoginForm;
