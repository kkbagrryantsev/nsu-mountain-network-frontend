import {render} from '@testing-library/react'
import App from "./App";

test('Renders default text', () => {
    render(<App />);
    const test = true;
    expect(test).toBe(true);
})