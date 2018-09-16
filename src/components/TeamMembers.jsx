import React from 'react';
import PropTypes from 'prop-types';

const TeamMembers = props => (
  <div className={'list-group list-group-flush'}>
    {props.members.map(member => (
      <div className={'list-group-item member-item'}>
        <div className={'profile'}>
          <img src={member.image} alt={member.name} />
          <small>{member.name}</small>
        </div>

        {props.children && props.children(member)}
      </div>
    ))}
  </div>
);

TeamMembers.propTypes = {
  children: PropTypes.func,
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
};

TeamMembers.defaultProps = {
  children: null,
};

export default TeamMembers;
