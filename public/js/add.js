async function addSbmt() {
    const keys = ['title', 'content'];

    keys.forEach(key => {
        document.getElementById(key).style.borderColor = "#ced4da";
        document.getElementById(`${key}error`).innerText = "";
    });

    const form = document.getElementById("noteform");
    const formData = new FormData(form);

    let res = await fetch('/api/note', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: formData.get('title'),
            content: formData.get('content')
        })
    });

    res = await res.json()

    if (res.success) {
        window.location.reload();
    } else {
        Object.keys(res.errors).forEach(key => {
            document.getElementById(`${key}`).style.borderColor = "rgb(255, 0, 0)";
            document.getElementById(`${key}error`).innerText = res.errors[key];
        });
    };
};