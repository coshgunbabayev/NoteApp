async function accommodateNotes(tag, notes) {
    async function like(note) {
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
                <button type="button" class="btn btn-secondary btn-sm" onclick="unlikeNote('${note._id}')">Unlike</button>
                ` :
                `
                <button type="button" class="btn btn-primary btn-sm" onclick="likeNote('${note._id}')">Like</button>
                `;
        } else if (res.message) {
            alert(res.message);
            return;
        };
    };

    function owner(note) {
        return note.isOwner ?
            `
            <button type="button" class="btn btn-danger btn-sm" onclick="deleteNote('${note._id}')">Delete</button>
            ` :
            '';
    };

    tag.innerHTML = ""
    for (note of notes) {
        tag.innerHTML += `
            <div class="card">
                <div class="card-body">

                    <h4 class="card-title" style="display: inline-block;">${note.title}</h4>

                    <a href="/user/${note.user.username}">
                        <h6 class="card-subtitle text-muted"
                        style="display: inline-block;">
                        by ${note.user.username}
                        </h6>
                    </a>

                    <p class="card-text">${note.content}</p>

                    ${await like(note)}
                    ${owner(note)}

                    <h6 class="card-subtitle text-muted text-end">${note.date}</h6>

                </div>
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
        getNotes();
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
        getNotes();
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
        getNotes();
    } else if (res.message) {
        alert(res.message);
    };
};