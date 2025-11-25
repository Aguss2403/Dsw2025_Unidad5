import Modal from '../../shared/components/Modal'; // Asegúrate de haber creado este archivo en el Paso 1
import LoginForm from './LoginForm';

function LoginModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Iniciar Sesión">
      {/* Pasamos onClose a la prop onSuccess.
        Así, cuando el login sea correcto, el formulario ejecutará onClose() 
        y el modal se cerrará automáticamente.
      */}
      <LoginForm onSuccess={onClose} />
    </Modal>
  );
}

export default LoginModal;