import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Input from '../../shared/components/Input';
import Button from '../../shared/components/Button';
import { register as registerService } from '../services/register';

function RegisterForm({ onSuccess, onSwitchToLogin }) {
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ 
    defaultValues: { 
      username: '', 
      password: '', 
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: ''
    } 
  });

  const navigate = useNavigate();

  const onValid = async (formData) => {
    try {
      const { error } = await registerService(formData);

      if (error) {
        setErrorMessage('Error al registrar usuario');
        return;
      }

      alert('Usuario registrado con éxito');
      
      if (onSuccess) {
        onSuccess(); // Cierra el modal
      } else {
        navigate('/login'); // Comportamiento clásico
      }
      
    } catch (error) {
      setErrorMessage('Error al registrar usuario: ' + (error.response?.data?.message || 'Intente nuevamente'));
    }
  };

  const formClasses = onSuccess 
    ? "flex flex-col gap-4 h-[80vh] overflow-y-auto px-1" // Scroll si es modal
    : "flex flex-col gap-4 bg-white p-8 sm:w-md sm:rounded-lg sm:shadow-lg";

  return (
    <form className={formClasses} onSubmit={handleSubmit(onValid)}>
      {!onSuccess && <h2 className="text-2xl text-center mb-4">Registro</h2>}
      
      <Input
        label='Nombre'
        {...register('firstName', { required: 'Nombre es requerido' })}
        error={errors.firstName?.message}
      />
      <Input
        label='Apellido'
        {...register('lastName', { required: 'Apellido es requerido' })}
        error={errors.lastName?.message}
      />
      <Input
        label='Usuario'
        {...register('username', { required: 'Usuario es requerido' })}
        error={errors.username?.message}
      />
      <Input
        label='Email'
        {...register('email', {
          required: 'Email es requerido',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Email inválido"
          }
        })}
        error={errors.email?.message}
      />
      <Input
        label='Teléfono'
        {...register('phoneNumber', { required: 'Teléfono es requerido' })}
        error={errors.phoneNumber?.message}
      />
      <Input
        label='Dirección'
        {...register('address', { required: 'Dirección es requerida' })}
        error={errors.address?.message}
      />
      <Input
        label='Contraseña'
        type='password'
        {...register('password', {
          required: 'Contraseña es requerida',
          minLength: { value: 6, message: "Mínimo 6 caracteres" }
        })}
        error={errors.password?.message}
      />

      <div className="flex flex-col gap-3 mt-4">
        <Button type='submit'>Registrarse</Button>
        
        <Button 
          variant='secondary' 
          onClick={() => {
            if (onSwitchToLogin) onSwitchToLogin();
            else navigate('/login');
          }}
        >
          ¿Ya tienes cuenta? Iniciar Sesión
        </Button>
      </div>

      {errorMessage && <p className='text-red-500 text-center'>{errorMessage}</p>}
    </form>
  );
};

export default RegisterForm;