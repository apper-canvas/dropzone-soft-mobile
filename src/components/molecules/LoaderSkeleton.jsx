import PropTypes from 'prop-types';

const LoaderSkeleton = ({ className }) => {
  return (
    <div className={`min-h-screen flex items-center justify-center ${className}`}>
      <div className="animate-pulse space-y-4 w-full max-w-4xl mx-auto p-6">
        <div className="h-8 bg-surface-700 rounded w-1/3 mx-auto"></div>
        <div className="h-64 bg-surface-700 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-24 bg-surface-700 rounded"></div>
          <div className="h-24 bg-surface-700 rounded"></div>
          <div className="h-24 bg-surface-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};

LoaderSkeleton.propTypes = {
  className: PropTypes.string,
};

LoaderSkeleton.defaultProps = {
  className: '',
};

export default LoaderSkeleton;