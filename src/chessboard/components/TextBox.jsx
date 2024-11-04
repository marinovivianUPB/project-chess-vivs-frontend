import PropTypes from 'prop-types';

export default function TextBox({ content, style }) {
  return (
    <div style={{ ...style }}>
      <div className="relative mt-2 rounded-md shadow-sm">
        {content.split('\n').map((line, index) => (
          <p key={index} className='mb-2'>
            {line}
          </p>))
        }
      </div>
    </div>
  );
}

TextBox.propTypes = {
  content: PropTypes.string.isRequired,
  style: PropTypes.object,
};
