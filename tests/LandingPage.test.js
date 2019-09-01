import React from 'react';
import renderer from 'react-test-renderer';

import LandingPage from '../src/component/LandingPage.js';

describe('<LandingPage />', () => {
    it('should match the snapshot', () => {
      const component = renderer.create(<LandingPage />).toJSON();
      expect(component).toMatchSnapshot();
    });
  });