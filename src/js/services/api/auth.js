import config from "./../../config.json";

export default {
    login: function (username, password) {
        return fetch(config.apiUrl + "/users/login/", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                if (data.success == 1) {
                    localStorage.setItem('accessToken', data.access_token.token)
                    localStorage.setItem('accessTokenExpireDate', data.access_token.valid_until)
                    localStorage.setItem('refreshToken', data.refresh_token.token)
                    localStorage.setItem('refreshTokenExpireDate', data.refresh_token.valid_until)
                }
                return data;
            })
    },
    register: function (username, name, email, password) {
        fetch(config.apiUrl + "/users/register/", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                email: email,
                name: name,
                password: password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                if (data.success == 1) {
                    localStorage.setItem('accessToken', data.access_token.token)
                    localStorage.setItem('refreshToken', data.refresh_token.token)
                }
                return data;
            })
    },
    getSelf: function () {
        return fetch(config.apiUrl + '/users/self/', {
            headers: {
                'Authorization': localStorage.getItem('accessToken')
            }
        }).then(res => {
            return res.json()
        })
    }
}
