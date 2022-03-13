import { render, screen } from "@testing-library/react";
import Navbar from "./";

describe("Navbar component", () => {
    it("must have content", () => {
        render(<Navbar />);

        expect(screen.getByText("Calculadora de Horário de Saída")).toBeInTheDocument();
    });
})
