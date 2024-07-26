const notifications = document.getElementById('notifications');

async function getNotifications() {
    function url(notification) {
        if (notification.targetType === 'User') {
            return `/user/${notification.target.username}`;
        } else if (notification.targetType === 'Note') {
            return `/note/${notification.target._id}`;
        };
    };

    function color(read) {
        return read ? 
        '' :
        `style="background-color: rgb(205, 243, 243);"`;
    };

    function isNew(read) {
        return read?
        '' :
        `<span class="card-text">New</span>`;
    };

    function text(type) {
        if (type === 'follow') return 'followed you.';
        if (type === 'like') return 'liked your note.';
        if (type === 'note') return 'shared new note.';
    };

    let res = await fetch('/api/notifications', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    res = await res.json();

    if (res.success) {
        notifications.innerHTML = '';
        res.notifications.reverse();
        for (let notification of res.notifications) {
            notifications.innerHTML += `
                <div class="card">
                <a href="${url(notification)}">
                    <div class="card-body" ${color(notification.read)}>

                        ${isNew(notification.read)}

                        <div>
                            <h5  class="card-subtitle"
                            style="display: inline-block;"
                            onclick="event.preventDefault(); window.location.href = '/user/${notification.sender.username}'">
                            @${notification.sender.username}
                            </h5>

                            <p class="card-text" style="display: inline-block;">${text(notification.type)}</p>

                            <p class="card-subtitle text-muted text-end" style="float: right;">${notification.date}</p>
                        </div>    

                    </div>
                </div>
            `;
        };

        readAll();
    };
};

getNotifications();

async function readAll() {
    let res = await fetch('/api/notifications/read', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    });
};