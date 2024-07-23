const username = document.getElementById("username").innerText.trim();
const userDetails = document.getElementById("userdetails");
const notes = document.getElementById("notes");

async function getUserDetails() {
    function pp(profilePicture) {
        return profilePicture ?
            `<div class="big-pp" style="background-image: url('${profilePicture}');"></div>` :
            `<div class="big-pp" style="background-image: url('/image/default-profile-picture.png');"></div>`
    };

    function setButtons(user) {
        if (user.isMatch) {
            return '';
        };

        function removeFollowerButton(user) {
            if (!user.isFollowing) {
                return '';
            };
            return `
                <button type="button" class="btn btn-primary btn-sm" onclick="remove('${user.username}')">Remove follower</button>
            `;
        };

        function followButtons(user) {
            if (user.isFollowers) {
                return `
                    <button type="button" class="btn btn-secondary btn-sm" onclick="unfollow('${user.username}')">Unfollow</button>
                `;
            };
            return `
                <button type="button" class="btn btn-primary btn-sm" onclick="follow('${user.username}')">Follow</button>
            `;
        };

        return `
            <div class="justify-content-between align-items-center">
                ${removeFollowerButton(user)}
                ${followButtons(user)}
            </div>
        `;
    };

    let res = await fetch(`/api/user/${username}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    })

    res = await res.json();

    if (res.success) {
        const user = res.user;

        userDetails.innerHTML = `
            <div class="card">
                <div class="card-body">

                    ${pp(user.profilePicture)}

                    <h4 class="card-title">
                        ${user.name} ${user.surname}
                    </h4>

                    <h6 class="card-subtitle text-muted">
                        @${user.username}
                    </h6>

                    <br>

                    <h6 class="card-text">
                        <a href="/user/${user.username}/following">
                            <span>${user.following.length} following</span>
                        </a>
                        
                        <a href="/user/${user.username}/followers">
                            <span>${user.followers.length} followers</span>
                        </a>
                    </h6>

                    ${setButtons(user)}
                
                </div>
            </div>
        `;

        getNotes();

    } else if (res.message) {
        userDetails.innerHTML = `
            <div class="card">
                <div class="card-body">

                    <h5 class="card-title">
                        ${res.message}
                    </h5>

                </div>
            </div>
        `;
    };

}; getUserDetails();

async function follow(username) {
    let res = await fetch(`/api/user/${username}/follow`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
    });

    res = await res.json();

    if (res.success) {
        getUserDetails();
    } else if (res.message) {
        alert(res.message);
    };
};

async function unfollow(username) {
    let res = await fetch(`/api/user/${username}/unfollow`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
    });

    res = await res.json();

    if (res.success) {
        getUserDetails();
    } else if (res.message) {
        alert(res.message);
    };
};

async function remove(username) {
    let res = await fetch(`/api/user/${username}/remove`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
    });

    res = await res.json();

    if (res.success) {
        getUserDetails();
    } else if (res.message) {
        alert(res.message);
    };
};

async function getNotes() {
    let res = await fetch(`/api/user/${username}/notes`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    })

    res = await res.json();

    if (res.success) {
        if (res.notes.length) {
            res.notes.reverse();
            accommodateNotes(notes, res.notes);
        } else {
            notes.innerHTML = `
                <div class="card">
                    <div class="card-body">

                        <p class="card-title">
                            Not found.
                        </p>

                    </div>
                </div>
            `;
        };
    };
};