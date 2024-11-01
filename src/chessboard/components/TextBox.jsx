import PropTypes from 'prop-types';

export default function TextBox({ content, style }) {
  return (
    <div style={{ ...style }}>
      <label htmlFor="chat" className="block text-sm font-medium text-gray-900">
        Response
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          id="chat"
          name="chat"
          type="text"
          value={content}  
          readOnly         
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
        />
      </div>
    </div>
  );
}

TextBox.propTypes = {
  content: PropTypes.string.isRequired, 
  style: PropTypes.object,
};
