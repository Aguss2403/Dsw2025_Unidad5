import Modal from "../../shared/components/Modal";
import LoginForm from "./LoginForm";

function LoginModal({ isOpen, onClose, onSwitchToRegister }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Iniciar Sesión">
      <LoginForm onSuccess={onClose} onSwitchToRegister={onSwitchToRegister} />
    </Modal>
  );
}

export default LoginModal;
