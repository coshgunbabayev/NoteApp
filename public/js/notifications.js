const notifications = document.getElementById('notifications');

async function getNotifications() {
    let res = await fetch('/api/notifications', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    res = await res.json();

    console.log(res.notifications);

    // if (res.success) {
        
    // };
};

getNotifications();