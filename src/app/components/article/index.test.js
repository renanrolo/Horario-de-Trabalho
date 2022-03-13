import { render, screen, fireEvent } from "@testing-library/react";
import Article from "./";
import configureStore from "redux-mock-store";
import { Provider } from 'react-redux';

const mockStore = configureStore([]);
describe("Article component", () => {

    let store;

    it("must have content", () => {
        renderArticleComponent();

        const quadro = screen.getByText("Quadro");
        const shifts = screen.queryAllByTestId("input-shift-date");

        expect(shifts.length).toBe(0);
        expect(quadro).toBeInTheDocument();
    });

    it("must render fist shift", () => {
        renderArticleComponent({
            Turnos: [{
                ini: "08:00",
                fim: "11:30"
            }],
        });

        const shifts = screen.queryAllByTestId("input-shift-date");

        expect(shifts.length).toBe(2);
        expect(shifts[0]).toHaveValue("08:00");
        expect(shifts[1]).toHaveValue("11:30");
    });

    it("fist shift must have remove button disabled", () => {
        renderArticleComponent({
            Turnos: [{
                ini: "08:00",
                fim: "11:30"
            }],
        });

        const btn = screen.getByTestId("button-remove-shift");

        expect(btn).toBeDisabled();
    });

    it("must render second shift", () => {
        renderArticleComponent({
            Turnos: [{
                ini: "08:00",
                fim: "11:30"
            },
            {
                ini: "12:00",
                fim: "13:00"

            }],
        });

        const shifts = screen.queryAllByTestId("input-shift-date");

        expect(shifts.length).toBe(4);
        expect(shifts[0]).toHaveValue("08:00");
        expect(shifts[1]).toHaveValue("11:30");
        expect(shifts[2]).toHaveValue("12:00");
        expect(shifts[3]).toHaveValue("13:00");
    });

    it("second shift must have remove button enabled", () => {
        renderArticleComponent({
            Turnos: [{
                ini: "08:00",
                fim: "11:30"
            },
            {
                ini: "12:00",
                fim: "13:00"

            }],
        });

        const btns = screen.queryAllByTestId("button-remove-shift");

        expect(btns.length).toBe(2);
        expect(btns[0]).toBeDisabled();
        expect(btns[1]).toBeEnabled();
    });

    it("add button should call ADD_TURNO dispatch", () => {
        renderArticleComponent({
            Turnos: [{
                ini: "08:00",
                fim: "11:30"
            },
            {
                ini: "12:00",
                fim: "13:00"

            }],
        });

        const addShiftBtn = screen.getByText("Adicionar Turno");

        fireEvent.click(addShiftBtn);

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith({ "type": "ADD_TURNO" });
    });

    const renderArticleComponent = (_store) => {
        const defaultStore = {
            Turnos: [],
        }

        store = mockStore({ ...defaultStore, ..._store });

        store.dispatch = jest.fn();

        render(<Provider store={store}>
            <Article />
        </Provider>);
    }

})
