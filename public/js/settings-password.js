async function resetPasswordSbmt(event) {
    event.preventDefault();

    const keys = ['password', 'newPassword', 'repeatNewPassword'];

    keys.forEach(key => {
        document.getElementById(key).style.borderColor = "#ced4da";
        document.getElementById(`${key}error`).innerText = "";
    });

    const form = document.getElementById("resetpasswordform");

    let res = await fetch('/api/settings/password', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: form.password.value,
            newPassword: form.newPassword.value,
            repeatNewPassword: form.repeatNewPassword.value
        })
    });

    res = await res.json();

    if (res.success) {
        window.location.href = "/settings";
    } else {
        Object.keys(res.errors).forEach(key => {
            document.getElementById(`${key}error`).innerText = res.errors[key];
            document.getElementById(key).style.borderColor = "rgb(255, 0, 0)";
        });
    };
};