import RegisterForm from '../components/RegisterForm';

function RegisterPage() {
  return (
    <div className='
      flex
      flex-col
      justify-center
      min-h-screen
      bg-neutral-100
      sm:items-center
    '>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
