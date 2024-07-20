const id = document.getElementById('id').innerText.trim();
const noteDetails = document.getElementById('note');
const notes = document.getElementById('notes');

async function getNote() {
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

    let res = await fetch(`/api/note/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    });

    res = await res.json();

    if (res.success) {
        let note = res.note;

        noteDetails.innerHTML = `
        <div class="card">
            <div class="card-body">
        
                <h3 class="card-title" style="display: inline-block;">${note.title}</h3>
        
                <a href="/user/${note.user.username}">
                    <h5 class="card-subtitle text-muted" style="display: inline-block;">
                    by ${note.user.username}
                    </h5>
                </a>
        
                <p class="card-text">${note.content}</p>
        
                <h6 class="card-text">
                    <a href="/note/${note._id}/likes">
                        ${like(note.likes)}
                    </a>
                </h6>
        
                <div id="likebtns-${note._id}" style="display: inline-block;">
                    ${await likeBtn(note)}
                </div>
        
                ${owner(note)}
        
                <h6 class="card-subtitle text-muted text-end">${note.date}</h6>
        
            </div>
        </div>  
        `;
    } else {
        noteDetails.innerHTML = `
        <div class="card">
            <div class="card-body">

                <h5 class="card-title">
                    ${res.message}
                </h5>

            </div>
        </div>
        `;
    };
}; getNote();

async function getOtherNotes() {
    let res = await fetch("/api/note", {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    })

    res = await res.json();

    if (res.success) {
        res.notes = res.notes.filter(note => note._id !== id);

        if (res.notes.length) {
            res.notes.reverse();
            accommodateNotes(notes, res.notes);
        } else {
            notes.innerHTML = `
                <div class="card">
                    <div class="card-body">

                        <p class="card-title">
                            Not found. Be the first to note!
                        </p>

                    </div>
                </div>
            `;
        }
    };
}; getOtherNotes();