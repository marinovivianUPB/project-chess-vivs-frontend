import PropTypes from 'prop-types';

export default function TextBox({ content, style }) {
  return (
    <div style={{ ...style }}>
      <label htmlFor="chat" className="block text-sm font-medium text-gray-900">
        Response
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <p className=''>
          {content}
        </p>
      </div>
    </div>
  );
}

TextBox.propTypes = {
  content: PropTypes.string.isRequired, 
  style: PropTypes.object,
};
