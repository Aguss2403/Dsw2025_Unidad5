function Button({ children, type = 'button', variant = 'default', size = 'md', ...restProps }) {
  if (!['button', 'reset', 'submit'].includes(type)) {
    console.warn('type prop not supported');
  }

  const variantStyle = {
    default: 'bg-purple-200 hover:bg-purple-300 transition',
    secondary: 'bg-gray-100 hover:bg-gray-200 transition',
  };

  const sizeStyle = {
    xs: 'px-2 py-1 text-xs rounded',
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-lg',
  };

  return (
    <button
      {...restProps}
      className={`${variantStyle[variant]} ${sizeStyle[size]} ${restProps.className || ''}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
