import React from 'react';
import PropTypes from 'prop-types';

import TabBar from '../../components/TabBar';

function Main({ children, location }) {
  return (
    <div>
      <TabBar location={ location } childrens={ children } />
    </div>
  );
}

Main.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object.isRequired
};

export default Main;
