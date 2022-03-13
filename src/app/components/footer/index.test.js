import { render, screen } from "@testing-library/react";
import Footer from "./";

describe("Footer component", () => {

    beforeEach(() => {
        render(<Footer />);
    });

    it("must have content", () => {
        expect(screen.getByText("https://github.com/renanrolo")).toBeInTheDocument();
        expect(screen.getByText("© Renan Rolo")).toBeInTheDocument();
    });


    it("must have link to renanrolo's github", () => {
        const link = screen.getByText("https://github.com/renanrolo");

        expect(link.getAttribute("href")).toBe("https://github.com/renanrolo");
    });
})
