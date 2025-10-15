import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

const HelloWorld = () => <Text>Hello World</Text>;

// ran this and it passed. Mobile setup successfully
describe('Example Test', () => {
  it('should pass', () => {
    render(<HelloWorld />);
    expect(screen.getByText('Hello World')).toBeOnTheScreen();
  });
});