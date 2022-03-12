import { render, screen } from '@testing-library/react';
import Footer from '../footer';

test("Must have renanrolo's github account on footer", () => {
    render(<Footer />);

    expect(screen.getByText('https://github.com/renanrolo')).toBeInTheDocument();
});

