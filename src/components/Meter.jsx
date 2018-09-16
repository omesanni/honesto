import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Meter = (props) => {
  function getWidth() {
    const percentage = 100 - ((props.value / props.max) * 100);

    return !Number.isNaN(percentage) ? percentage : 100;
  }

  return (
    <div className={classnames('meter', props.className)}>
      <div
        className={'meter__gauge'}
        style={{ width: `${getWidth()}%` }}
      />
    </div>
  );
};

Meter.propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  max: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

Meter.defaultProps = {
  className: '',
  value: 0,
  max: 0,
};

export default Meter;
