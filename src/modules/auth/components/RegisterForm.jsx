import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Input from '../../shared/components/Input';
import Button from '../../shared/components/Button';
import { register as registerService } from '../services/register';

function RegisterForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { username: '', email: '', password: '' } });

  const navigate = useNavigate();

  const onValid = async (formData) => {
    try {
      const { error } = await registerService(formData.username, formData.email, formData.password);

      if (error) {
        setErrorMessage('Error al registrar usuario');
        return;
      }

      alert('Usuario registrado con éxito');
      navigate('/login');
    } catch (error) {
      setErrorMessage('Error al registrar usuario');
    }
  };

  return (
    <form className='
        flex
        flex-col
        gap-20
        bg-white
        p-8
        sm:w-md
        sm:gap-4
        sm:rounded-lg
        sm:shadow-lg
      '
      onSubmit={handleSubmit(onValid)}
    >
      <h2 className="text-2xl font-bold text-center mb-4">Registro</h2>
      <Input
        label='Usuario'
        {...register('username', {
          required: 'Usuario es obligatorio',
        })}
        error={errors.username?.message}
      />
      <Input
        label='Email'
        {...register('email', {
          required: 'Email es obligatorio',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Email inválido"
          }
        })}
        error={errors.email?.message}
      />
      <Input
        label='Contraseña'
        {...register('password', {
          required: 'Contraseña es obligatorio',
          minLength: {
            value: 6,
            message: "La contraseña debe tener al menos 6 caracteres"
          }
        })}
        type='password'
        error={errors.password?.message}
      />

      <Button type='submit'>Registrarse</Button>
      <Button variant='secondary' onClick={() => navigate('/login')}>Volver al Login</Button>
      {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
    </form>
  );
};

export default RegisterForm;
