import { render } from '@testing-library/react';

import ReactAuthenticator from './react-authenticator';

describe('ReactAuthenticator', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactAuthenticator />);
    expect(baseElement).toBeTruthy();
  });
});
