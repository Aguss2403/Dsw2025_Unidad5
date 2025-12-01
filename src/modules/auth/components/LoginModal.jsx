import Modal from '../../shared/components/Modal'; // Asegúrate de haber creado este archivo en el Paso 1
import LoginForm from './LoginForm';

// src/modules/auth/components/LoginModal.jsx
function LoginModal({ isOpen, onClose, onSwitchToRegister }) { // <--- Recibe la prop
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Iniciar Sesión">
      <LoginForm onSuccess={onClose} onSwitchToRegister={onSwitchToRegister} /> {/* <--- Pasa la prop */}
    </Modal>
  );
}

export default LoginModal;