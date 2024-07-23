async function accommodateNotes(tag, notes) {
    function pp(profilePicture) {
        return profilePicture ?
            `<div class="small-pp" style="background-image: url('${profilePicture}');"></div>` :
            `<div class="small-pp" style="background-image: url('/image/default-profile-picture.png');"></div>`
    };

    function like(likes) {
        if (likes === null) return "no likes";
        return `${likes.length} like${likes.length > 1 ? 's' : ''}`
    };

    async function likeBtn(note) {
        let res = await fetch(`/api/note/${note._id}/islike`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        });

        res = await res.json();

        if (res.success) {
            return res.isLiked ?
                `
                <button type="button" class="btn btn-secondary btn-sm" onclick="event.preventDefault(); unlikeNote('${note._id}')">Unlike</button>
                ` :
                `
                <button type="button" class="btn btn-primary btn-sm" onclick="event.preventDefault(); likeNote('${note._id}')">Like</button>
                `;
        } else if (res.message) {
            alert(res.message);
            return;
        };
    };

    function owner(note) {
        return note.isOwner ?
            `
            <button type="button" class="btn btn-danger btn-sm" onclick="event.preventDefault(); deleteNote('${note._id}')">Delete</button>
            ` :
            '';
    };

    tag.innerHTML = ""
    for (let note of notes) {
        tag.innerHTML += `
            <div class="card">
                <a href="/note/${note._id}">
                    <div class="card-body">

                        ${pp(note.user.profilePicture)}

                        <h4 class="card-subtitle text-muted"
                        style="display: inline-block;"
                        onclick="event.preventDefault(); window.location.href = '/user/${note.user.username}'">
                        from ${note.user.username}
                        </h4>

                        <div class="note-text">
                            <h4 class="card-title">${note.title}</h4>
    
                            <p class="card-text">${note.content}</p>
                        </div>

                        <span style="display: block;">
                            <h6 class="card-text"
                            onclick="event.preventDefault(); window.location.href = '/note/${note._id}/likes'"
                            style="display: inline-block;">
                                ${like(note.likes)}
                            </h6>
                        </span>

                        <div id="likebtns-${note._id}" style="display: inline-block;">
                            ${await likeBtn(note)}
                        </div>

                        ${owner(note)}

                        <h6 class="card-subtitle text-muted text-end">${note.date}</h6>

                    </div>
                </a>
            </div>  
        `;
    };
};

async function likeNote(id) {
    let res = await fetch(`/api/note/${id}/like`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
    });

    res = await res.json();

    if (res.success) {
        document.getElementById(`likebtns-${id}`).innerHTML = `
            <button type="button" class="btn btn-secondary btn-sm" onclick="event.preventDefault(); unlikeNote('${id}')">Unlike</button>
        `;
    } else if (res.message) {
        alert(res.message);
    };
};

async function unlikeNote(id) {
    let res = await fetch(`/api/note/${id}/unlike`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
    });

    res = await res.json();

    if (res.success) {
        document.getElementById(`likebtns-${id}`).innerHTML = `
            <button type="button" class="btn btn-primary btn-sm" onclick="event.preventDefault(); likeNote('${id}')">Like</button>
        `;
    } else if (res.message) {
        alert(res.message);
    };
};

async function deleteNote(id) {
    let res = await fetch(`/api/note/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
    })

    res = await res.json();

    if (res.success) {
        window.location.reload();
    } else if (res.message) {
        alert(res.message);
    };
};