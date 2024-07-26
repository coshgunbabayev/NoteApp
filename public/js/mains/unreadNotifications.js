const unreadNotificationsCount = document.getElementById('unreadNotificationsCount');

async function getUnreadNotificationsCount() {
    let res = await fetch('/api/notifications/unread/count', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    res = await res.json();

    if (res.success) {
        const count = res.count;
        if (count > 0) {
            unreadNotificationsCount.style.display = 'inline';
        };
        
        if (count > 99) {
            unreadNotificationsCount.innerText = '99+';
        } else if (count > 0) {
            unreadNotificationsCount.innerText = count;
        };
    };
}

getUnreadNotificationsCount();