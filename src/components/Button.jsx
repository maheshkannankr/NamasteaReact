const Button = ({ label, onClick }) => {
  return (
    <div style={{ margin: '10px' }}>
      <button
        style={{ padding: '10px', borderRadius: '10px', border: 0 }}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
