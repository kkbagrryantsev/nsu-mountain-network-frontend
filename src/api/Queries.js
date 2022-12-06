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

