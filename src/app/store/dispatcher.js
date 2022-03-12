
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as HoraAction from "./horaAction";

const mapStateToProps = state => (state)
const mapDispatchToProps = dispatch => bindActionCreators(HoraAction, dispatch)

export default function dispatcher(component) {
    return connect(mapStateToProps, mapDispatchToProps)(component);
}