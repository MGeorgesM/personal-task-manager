import './index.css';

const Button = ({ text, clickHandler, color, size, type = 'button' }) => {

    return (
        <button
            className={`flex center border-radius-m bold ${color} ${size}`}
            onClick={(e) => clickHandler && clickHandler(e)}
            type={type}
        >
            {text}
        </button>
    );
};

export default Button;
