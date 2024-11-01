import PropTypes from 'prop-types';

const Button = ({ onClick, children, style }) => {
    return (
        <button 
            onClick={onClick} 
            style={{ ...style }} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node,
    style: PropTypes.object, 
};

export default Button;
