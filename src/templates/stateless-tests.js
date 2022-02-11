import React from 'react';
import renderer from 'react-test-renderer';

/**
 * this file needs updating, it is a sample only
 */
test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <Link page="http://www.facebook.com">Facebook</Link>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});