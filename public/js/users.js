const url = document.getElementById('url').innerText.trim();
const users = document.getElementById('users');

async function getUsers() {
    let res = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    });

    res = await res.json();

    if (res.success) {
        if (res.users.length > 0) {
            users.innerHTML = '';
            for (user of res.users) {
                users.innerHTML += `
                    <div class="card">
                        <div class="card-body">

                            <h4 class="card-title">
                                ${user.name} ${user.surname}
                            </h4>

                            <h6 class="card-subtitle text-muted">
                                @${user.username}
                            </h6>

                        </div>
                    </div>
                `;
            };
        } else {
            users.innerHTML = `
                <div class="card">
                    <div class="card-body">
                    
                        <p class="card-title">
                            No users found.
                        </p>
                        
                    </div>
                </div>
            `;
        };
    } else {
        document.getElementById('option').innerText = res.message;
    };
};

getUsers();