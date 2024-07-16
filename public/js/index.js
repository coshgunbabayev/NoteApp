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