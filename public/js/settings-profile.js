async function getUserInfo() {
    let res = await fetch('/api/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    res = await res.json();

    if (res.success) {
        const user = res.user;
        document.getElementById('name').value = user.name;
        document.getElementById('surname').value = user.surname;
        document.getElementById('username').value = user.username;
        document.getElementById('email').value = user.email;

        if (res.user.profilePicture) { currentprofilepicture
            document.getElementById('currentprofilepicture').style.backgroundImage = `url('${user.profilePicture}')`;
            document.getElementById('currentprofilepictureDiv').style.display= 'block';
        } else {
            document.getElementById('currentprofilepicture').style.backgroundImage = '/images/default-profile-picture.jpg';
        };

        document.getElementById('bio').value = user.bio;
    } else {
        alert(res.message);
    };
};
getUserInfo();

const keys = ['userdetails', 'profilepicture', 'bio', 'links'];

function change(selected) {
    if (document.getElementById(`${selected}Div`).style.display === 'none') {
        keys.forEach(key => {
            if (key === selected) {
                document.getElementById(`${key}Div`).style.display = 'flex';
            } else {
                document.getElementById(`${key}Div`).style.display = 'none';
            };
        });
    } else {
        document.getElementById(`${selected}Div`).style.display = 'none';
    };
};

async function userDetailsSbmt(event) {
    event.preventDefault();

    const keys = ['name', 'surname', 'username', 'email'];

    keys.forEach(key => {
        document.getElementById(key).style.borderColor = '#ced4da';
        document.getElementById(`${key}error`).innerText = '';
    });

    const form = document.getElementById("userdetailsform");

    let res = await fetch('/api/settings/userdetails', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: form.name.value,
            surname: form.surname.value,
            username: form.username.value,
            email: form.email.value,
        })
    });

    res = await res.json();

    if (res.success) {
        window.location.reload();
    } else {
        Object.keys(res.errors).forEach(key => {
            document.getElementById(`${key}error`).innerText = res.errors[key];
            document.getElementById(key).style.borderColor = "rgb(255, 0, 0)";
        });
    };
};

async function profilePictureDelete() {
    let res = await fetch('/api/settings/profilepicture', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    res = await res.json();

    if (res.success) {
        window.location.reload();
    } else {
        alert(res.message);
    };
};

async function profilePictureSbmt(event) {
    event.preventDefault();

    const keys = ['profilepicture'];

    keys.forEach(key => {
        document.getElementById(key).style.borderColor = "#ced4da";
        document.getElementById(`${key}error`).innerText = "";
    });

    const form = document.getElementById("profilepictureform");
    const formData = new FormData(form);

    let res = await fetch('/api/settings/profilepicture', {
        method: 'PUT',
        body: formData
    });

    res = await res.json();

    if (res.success) {
        window.location.reload();
    } else {
        Object.keys(res.errors).forEach(key => {
            document.getElementById(`${key}error`).innerText = res.errors[key];
            document.getElementById(key).style.borderColor = "rgb(255, 0, 0)";
        });
    };
};

async function bioSbmt(event) {
    event.preventDefault();

    const keys = ['bio'];

    keys.forEach(key => {
        document.getElementById(key).style.borderColor = "#ced4da";
        document.getElementById(`${key}error`).innerText = "";
    });

    const form = document.getElementById("bioform");

    let res = await fetch('/api/settings/bio', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            bio: form.bio.value,
        })
    });

    res = await res.json();

    if (res.success) {
        window.location.reload();
    } else {
        Object.keys(res.errors).forEach(key => {
            document.getElementById(`${key}error`).innerText = res.errors[key];
            document.getElementById(key).style.borderColor = "rgb(255, 0, 0)";
        });
    };
};