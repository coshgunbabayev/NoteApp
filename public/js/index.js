const notes = document.getElementById("notes");

async function getNotes() {
    let res = await fetch("/api/note", {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    })

    res = await res.json();

    if (res.success) {
        if (res.notes.length) {
            res.notes.reverse();
            notes.innerHTML = ""
            for (note of res.notes) {
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
}; getNotes();

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