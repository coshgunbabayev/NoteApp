async function accommodateNotes(tag, notes) {
    tag.innerHTML = ""
    for (note of notes) {
        notes.innerHTML += `
            <div class="card">
                <div class="card-body">

                    <h4 class="card-title">${note.title}</h4>

                    <p class="card-text">${note.content}</p>

                    <div class="d-flex justify-content-between align-items-center">
                    <h6 class="card-subtitle text-muted">${note.date}</h6>

                    <button type="button" class="btn btn-danger btn-sm" onclick="deleteNote('${note._id}')">Delete</button>
                    </div>

                </div>
            </div>  
        `;
    };
};