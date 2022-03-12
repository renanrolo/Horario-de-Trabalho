import { render, screen } from "@testing-library/react";
import Footer from "../footer";

test("Must have content on footer", () => {
    render(<Footer />);

    expect(screen.getByText("https://github.com/renanrolo")).toBeInTheDocument();
    expect(screen.getByText("© Renan Rolo")).toBeInTheDocument();
});
