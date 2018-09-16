import React from 'react';
import AsyncComponent from '../components/AsyncComponent';

/**
 * Lazy loads a component
 * @param  {Function} getComponent Returns a dynamic import of the component
 * @param  {Object}   props
 * @return {ReactElement}
 */
export function lazyLoadComponent(getComponent, props = {}) {
  return React.createElement(AsyncComponent, { ...props, render: getComponent });
}
