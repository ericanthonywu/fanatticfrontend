import React from "react";
import {connect} from "react-redux";
import {toast} from "react-toastify";
import Axios from "axios";
import {api_url} from "../global";

class Login extends React.Component {
    state = {
        username: "",
        password: ""
    }

    login = e => {
        e.preventDefault() // prevent form to submitted manually (requires action attribute and for MVC only)
        const {username, password} = this.state

        // if (username && password) {
        //     // Axios.post(`${api_url}login`,{
        //     //
        //     // }).then()
        //
        // }else{
        //     toast.error("input not filled yet")
        // }

        this.props.history.push("/dashboard")
    }

    inputHandler = e => {
        const {name, value} = e.target
        // validate input base on input's name

        if (this.validate(e.target)) {
            this.setState({
                [name]: value
            })
        }
    }

    validate = ({name, value}) => {

        // switch (name) {
        //     case "username":
        //         // do some custom validation
        //         break;
        //     case "password":
        //         // do some custom validation
        //         break;
        // }
        // if(value === ""){
        //     return false
        // }
        // return true

        return value !== ""; //for now just validate if the value isn't empty

    }

    render() {
        return (
            <div>
                {
                    /*
                        use onSubmit to make sure user really want to login,
                        they can just press enter in input or press submit button or etc
                        all is detected on onSubmit's event
                     */
                }
                <form style={{margin: "auto", width: "10%", height: "100%"}} onSubmit={this.login}>
                    <input type="text" name={"username"} onChange={this.inputHandler}/>
                    <input type="password" name={"password"} onChange={this.inputHandler}/>
                    <input type="submit" value={"Login"}/>
                </form>
            </div>
        );
    }

}

export default connect()(Login)
