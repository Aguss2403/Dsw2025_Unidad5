import Modal from '../../shared/components/Modal';
import RegisterForm from './RegisterForm';

function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Crear Cuenta">
      <RegisterForm onSuccess={onClose} onSwitchToLogin={onSwitchToLogin} />
    </Modal>
  );
}

export default RegisterModal;