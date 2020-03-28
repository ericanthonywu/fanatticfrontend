import React from "react";
import {connect} from "react-redux";
import {toast} from "react-toastify";
import moment from "moment";

class Event extends React.Component {
    state = {
        active: 1,
        title: "",
        description: "",
        location: "",
        date: "",
        pricemin: 0,
        pricemax: 0,
    }

    render() {
        return (
            <div>
                <h1>Create Event</h1>
                <span style={this.state.active === 1 ? {border: "1px solid black"} : {}}>1</span>
                <span style={this.state.active === 2 ? {border: "1px solid black"} : {}}>2</span>
                <span style={this.state.active === 3 ? {border: "1px solid black"} : {}}>3</span>
                <span style={this.state.active === 4 ? {border: "1px solid black"} : {}}>4</span>
                {this.renderContent()}
            </div>
        );
    }

    handleChangeInput = e => {
        const {value, name} = e.target
        this.setState({
            [name]: value
        })
    }

    renderContent = () => {
        const {active} = this.state
        switch (active) {
            case 1:
                return (
                    <div>
                        Event Title: <input type="text" name={"title"} onChange={this.handleChangeInput}/> <br/>
                        Event Description: <textarea inputMode={"text"} lang={"en"} name={"description"} onChange={this.handleChangeInput}/>
                        <br/>
                        Event Location: <input type="text" name={"location"} onChange={this.handleChangeInput}/> <br/>
                        Event Date: <input type="date"  min={moment().format("YYYY-mm-DD")} name={"date"} onChange={this.handleChangeInput}/> <br/>
                        Ticket Price Change:
                        Rp<input type="number" name={"pricemin"} min={0} onChange={this.handleChangeInput}/>
                        -
                        Rp<input type="number" name={"pricemax"} min={this.state.pricemin}
                                 onChange={this.handleChangeInput}/>
                        <br/>
                        <button onClick={this.nextStep}>Next Step</button>
                    </div>
                )
            case 2:
                return (
                    <div>

                    </div>
                )
            case 3:
                return (
                    <div>

                    </div>
                )
            case 4:
                return (
                    <div>

                    </div>
                )
            default:
                return (
                    <div>
                        <p>something error happened</p>
                    </div>
                )
        }
    }

    nextStep = () => {
        const {active, date, description, location, pricemax, pricemin, title} = this.state

        switch (active) {
            case 1:
                // step 1 validation

                if (!date || !description || !location || !pricemax || !pricemin || !title) {
                    return toast.error("input not filled")
                }
                break;
            case 2:
                // step 2 validation

                break;
            case 3:
                // step 3 validation

                break;
            case 4:
                // step 4 validation

                break;
            default:
                return toast.error("Something error happened")
        }

        this.setState({
            active: active + 1
        })

    }
}

export default connect()(Event)
