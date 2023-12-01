import PropTypes from 'prop-types';

export default function ErrorMessageInput({ message }) {
  return <p className="text-red-600 text-sm mt-1">{message}</p>;
}

ErrorMessageInput.propTypes = {
  message: PropTypes.string,
};
