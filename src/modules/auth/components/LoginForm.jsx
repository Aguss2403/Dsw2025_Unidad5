import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";
import useAuth from "../hook/useAuth";
import { frontendErrorMessage } from "../helpers/backendError";

function LoginForm({ onSuccess }) {
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

      if (onSuccess) {
        onSuccess();
      } else {
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

  const formClasses = onSuccess
    ? "flex flex-col gap-4"
    : "flex flex-col gap-6 sm:gap-4 bg-white p-6 sm:p-8 sm:w-md sm:rounded-lg sm:shadow-lg";

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

      <Button
        variant="secondary"
        onClick={() => {
          if (onSuccess) onSuccess();

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
