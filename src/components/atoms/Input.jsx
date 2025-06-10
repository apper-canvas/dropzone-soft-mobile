import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Input = forwardRef(({ type, accept, multiple, onChange, className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      accept={accept}
      multiple={multiple}
      onChange={onChange}
      className={`hidden ${className}`}
      {...props}
    />
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  type: PropTypes.string,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  multiple: false,
  onChange: () => {},
  className: '',
};

export default Input;