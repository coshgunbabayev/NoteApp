async function accommodateNotes(tag, notes) {
    function owner(note) {
        return note.isOwner ?
            `
            <div class="d-flex justify-content-between align-items-center">
                <h6 class="card-subtitle text-muted">${note.date}</h6>
                <button type="button" class="btn btn-danger btn-sm" onclick="deleteNote('${note._id}')">Delete</button>
            </div>
            ` :
            `
            <div class="d-flex justify-content-between align-items-center">
                <h6 class="card-subtitle text-muted">${note.date}</h6>
            </div>`;
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

                    ${owner(note)}

                </div>
            </div>  
        `;
    };
};