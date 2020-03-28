const globalstate = {
    token: "",
    username: "",
    id: 0,
    role: ""
};

export default (state = globalstate, action) => {
    switch (action.type) {
        case "login":
            return {
                ...globalstate,
                token: action.payload.token,
                username: action.payload.username,
                id: action.payload.id,
                role: action.payload.role
            };
        case "logout":
            return {...globalstate, token: "", username: "", id: 0, role: ''};
        default:
            return globalstate
    }
};
