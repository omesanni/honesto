import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Scale extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      isHovering: false,
      hoverValue: 0,
      scaleList: this.getScaleList(),
    };

    this.handleClick = this.handleClick.bind(this);
    this.getScaleList = this.getScaleList.bind(this);
    this.isOptionSelected = this.isOptionSelected.bind(this);
    this.handleMouseState = this.handleMouseState.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;
    const { value: prevValue } = prevProps;

    if (value !== prevValue) {
      this.setValue(value);
    }
  }

  /**
   * Set value in state
   * @param {Number} value
   */
  setValue(value) {
    this.setState(() => ({ value }));
  }

  /**
   * Creates a list for scale rendering
   * @return {Array}
   */
  getScaleList() {
    const list = [];

    for (let i = 1; i <= this.props.max; i += 1) {
      list.push(i);
    }

    return list;
  }

  /**
   * Checks if option is selected
   * @param  {Number}  num
   * @return {Boolean}
   */
  isOptionSelected(num) {
    const { isHovering, value, hoverValue } = this.state;

    if (!isHovering) {
      return num <= value;
    }

    return num <= hoverValue;
  }

  /**
   * Handle scale selection
   * @param  {Number} num
   */
  handleClick(num) {
    this.setState(() => ({ value: num }));
    this.props.onSelect(`${num} / 10`);
  }

  handleMouseState(isHovering, num) {
    this.setState(() => ({
      hoverValue: num,
      isHovering,
    }));
  }

  render() {
    const { value, scaleList } = this.state;
    const { readOnly } = this.props;

    return (
      <div className={'scale'}>
        <div className={'scale__options'}>
          {scaleList.map(n => (
            readOnly ? (
              <div
                style={this.props.style}
                className={classnames(
                  'scale__options__option scale__options__option--no-hover', {
                  'scale__options__option--selected': this.isOptionSelected(n),
                })}
              />
            ) : (
              <div
                key={n}
                onClick={() => this.handleClick(n)}
                onFocus={() => this.handleMouseState(true, n)}
                onBlur={() => this.handleMouseState(false, 0)}
                onMouseOver={() => this.handleMouseState(true, n)}
                onMouseOut={() => this.handleMouseState(false, 0)}
                className={classnames('scale__options__option', {
                  'scale__options__option--selected': this.isOptionSelected(n),
                })}
              />
            )
          ))}
        </div>

        {this.props.showLegend && (
          <div className={'ml-auto mt-2'}>
            <span>
              {`${value} / ${this.props.max}`}
            </span>
          </div>
        )}
      </div>
    );
  }
}

Scale.propTypes = {
  max: PropTypes.number,
  value: PropTypes.number,
  readOnly: PropTypes.bool,
  showLegend: PropTypes.bool,
  onSelect: PropTypes.func,
  style: PropTypes.objectOf(PropTypes.any),
};

Scale.defaultProps = {
  max: 10,
  value: 0,
  readOnly: false,
  showLegend: true,
  onSelect: () => undefined,
  style: undefined,
};

export default Scale;
