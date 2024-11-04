import PropTypes from 'prop-types';

export default function Input({ value, onChange, onSubmit }) {
    return (
        <form onSubmit={onSubmit} className="mt-6 flex max-w-md gap-x-4">
            <input
                id="input"
                name="input"
                type="text"
                required
                placeholder="Message"
                autoComplete="off"
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
                value={value}
                onChange={onChange}
            />
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
                Enviar
            </button>
        </form>
    );
}

Input.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};