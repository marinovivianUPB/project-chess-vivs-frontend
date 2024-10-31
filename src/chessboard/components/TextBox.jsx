import PropTypes from 'prop-types';

export default function TextBox({ bestMove }) {
  return (
    <div>
      <label htmlFor="chat" className="block text-sm font-medium text-gray-900">
        Chat
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          id="chat"
          name="chat"
          type="text"
          value={bestMove} 
          readOnly 
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
        />
      </div>
    </div>
  );
}

TextBox.propTypes = {
  bestMove: PropTypes.string.isRequired, 
};
