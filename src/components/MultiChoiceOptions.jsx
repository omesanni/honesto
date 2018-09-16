import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class MultiChoiceOptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.isOptionSelected = this.isOptionSelected.bind(this);
  }

  /**
   * Checks if option is selected
   * @param  {Number}  id Option's id
   * @return {Boolean}
   */
  isOptionSelected(id) {
    return !!this.state.selected.find(s => s.id === id);
  }

  /**
   * Handle option selection
   * @param  {Object} option
   */
  handleClick(option) {
    const alreadySelected = this.isOptionSelected(option.id);
    let newSelectedOptions = [...this.state.selected];

    if (alreadySelected) {
      newSelectedOptions = newSelectedOptions.filter(f => f.id !== option.id);
    } else {
      newSelectedOptions.push(option);
    }

    this.setState(() => ({ selected: newSelectedOptions }));
    this.props.onSelect(newSelectedOptions);
  }

  render() {
    return (
      <div className={'multi-choice-options'}>
        {this.props.options.map(option => (
          <div
            key={option.id}
            onClick={() => this.handleClick(option)}
            className={classnames('multi-choice-options__option', {
              'multi-choice-options__option--selected': this.isOptionSelected(option.id),
            })}
          >
            {option.text}
          </div>
        ))}
      </div>
    );
  }
}

MultiChoiceOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func,
};

MultiChoiceOptions.defaultProps = {
  onSelect: () => undefined,
};

export default MultiChoiceOptions;
