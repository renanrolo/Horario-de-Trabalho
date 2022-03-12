import { render, screen } from "@testing-library/react";
import Footer from "../footer";

test("Must have content on footer", () => {
    render(<Footer />);

    expect(screen.getByText("https://github.com/renanrolo")).toBeInTheDocument();
    expect(screen.getByText("© Renan Rolo")).toBeInTheDocument();
});


test("Must have link to renanrolo's github", () => {
    render(<Footer />);

    const link = screen.getByText("https://github.com/renanrolo");

    expect(link.getAttribute("href")).toBe("https://github.com/renanrolo");
});