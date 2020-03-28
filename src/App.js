import React from "react";
import {toast, ToastContainer} from "react-toastify";
import {BrowserRouter, Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Axios from "axios";
import {backend_url} from "./global";
import {login, logout} from "./redux/actions";
import Error404 from "./screen/Error404";
import Login from "./screen/Login";
import Event from "./screen/Event";
import Dashboard from "./screen/Dashboard";
import Navbar from "./screen/component/Navbar";
import Analytics from "./screen/Analytics";
import Merchandise from "./screen/Merchandise";
import Moderator from "./screen/Moderator";
import Music from "./screen/Music";
import Setting from "./screen/Setting";
import SocialMedia from "./screen/SocialMedia";
import SocialMediaPost from "./screen/SocialMediaPost";
import Video from "./screen/Video";

class App extends React.Component {

    generateProtectedRoute = () =>
        <>
            <Navbar {...this.props}/>
            <BrowserRouter basename={"/"}>
                <Route path={'/dashboard'} exact component={Dashboard}/>
                <Route path={'/event'} exact component={Event}/>
                <Route path={'/analytics'} exact component={Analytics}/>
                <Route path={'/merchandise'} exact component={Merchandise}/>
                <Route path={'/moderator'} exact component={Moderator}/>
                <Route path={'/music'} exact component={Music}/>
                <Route path={'/setting'} exact component={Setting}/>
                <Route path={'/socialmedia'} exact component={SocialMedia}/>
                <Route path={'/socialmediapost'} exact component={SocialMediaPost}/>
                <Route path={'/video'} exact component={Video}/>
            </BrowserRouter>
        </>
    ;

    componentDidMount() {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        const id = localStorage.getItem("id");
        const role = localStorage.getItem("role");

        //global axios handler

        if (token) {
            Axios.defaults.headers.common['token'] = token; // for golang
        } else {
            delete Axios.defaults.headers.common['token'];
        }

        Axios.interceptors.response.use(res => res.data, err => {
            const {response} = err;
            if (!response) {
                toast.error("No Connection")
            } else {
                switch (response.status) {
                    case 419:
                        // session expire
                        this.props.logout();
                        this.props.history.push("/");
                        toast.error("Token Expire");
                        break;
                    case 500:
                        // error server like mongodb, etc
                        console.log(response.data); //TODO: Remove on Production
                        const {errmsg, code} = response.data
                        switch (code) {
                            case 11000:
                                Object.keys("keyValue").forEach(key => {
                                    toast.error(`Field ${key} duplicated`)
                                })
                                break;
                            default:
                                toast.error(`Something error with code ${code} \n Message : ${errmsg}`)
                                console.log(errmsg)
                        }
                        break;
                    case 401:
                        // unauthorized
                        toast.error("username / password salah");
                        break;
                    case 403:
                        // verified but has error (?)
                        toast.error("Email status not verified")
                        break;
                }
            }
            return Promise.reject(response);
        });
    }

    checkValidToken = (token, username, id, role) => {
        Axios.post(`${backend_url}checkValidToken`, {
            token: token
        }).then(async data => {
            // if (data.data.role !== role) {
            //     return null
            // }

            await this.props.login({
                token: token,
                username: username,
            });

        }).catch(err => {
            if (!err) {
                return this.checkValidToken(token, username, id, role)
            }
            this.props.history.push("/");
            this.props.logout()
        })
    };

    render() {
        return (
            <div>
                <ToastContainer enableMultiContainer position={toast.POSITION.TOP_RIGHT}/>
                <Switch>
                    <Route path={'/'} exact component={Login}/>
                    {this.generateProtectedRoute()}
                    <Route component={Error404}/>
                </Switch>
            </div>
        );
    }

}

export default withRouter(
    connect(state => state.user, {login, logout})(App)
)
