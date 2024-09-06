const Button = ({ label, onClick }) => {
  return (
    <div style={{ margin: '10px' }}>
      <button onClick={onClick}>{label}</button>
    </div>
  );
};

export default Button;
