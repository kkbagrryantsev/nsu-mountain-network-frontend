export async function signIn(credentials) {
    return fetch("https://nsumount-nocarend.amvera.io/api/auth/login", {
        method: "POST", headers: {
            "Content-Type": "application/json",
        }, body: JSON.stringify(credentials),
    }).then(res => res.json())
}

export async function signUp(credentials) {
    return fetch("https://nsumount-nocarend.amvera.io/api/auth/signup", {
        method: "POST", headers: {
            "Content-Type": "application/json",
        }, body: JSON.stringify(credentials),
    })
        .then((res) => res.status)
}

export async function getItems(token) {
    return fetch("https://nsumount-nocarend.amvera.io/api/models/items",
        {
            method: "GET", headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer " + token,
            }})
        .then((res) => res.json())
}

export async function bookItems(token, items) {
    return fetch("https://nsumount-nocarend.amvera.io/api/models/items/use/book",
        {
            method: "POST", headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer " + token,
            }, body: items})
        .then((res) => res.status)
}
