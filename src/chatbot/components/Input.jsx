import PropTypes from 'prop-types';

export default function Input({ value, onChange, onSubmit, msg, send }) {
  return (
    <form onSubmit={onSubmit} className="mt-6 flex gap-x-4">
      <input
        id="input"
        name="input"
        type="text"
        placeholder={msg}
        autoComplete="off"
        className="min-w-0 flex-auto rounded-md border-0 bg-white px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm/6"
        value={value}
        onChange={onChange}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        {send}
      </button>
    </form>
  );
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};