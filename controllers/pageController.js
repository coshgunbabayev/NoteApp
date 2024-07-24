function getIndexPage(req, res) {
    res.status(200).render('index');
};

function getAccountPage(req, res) {
    res.status(200).render('account');
};

function getUserPage(req, res) {
    res.status(200).render('user', {
        username: req.params.username
    });
};

function getNotePage(req, res) {
    res.status(200).render('note', {
        id: req.params.id
    });
};

function getUserFollowingPage(req, res) {
    res.status(200).render('users', {
        option: 'Following',
        url: `/api/user/${req.params.username}/following`
    });
};

function getUserFollowersPage(req, res) {
    res.status(200).render('users', {
        option: 'Followers',
        url: `/api/user/${req.params.username}/followers`
    });
};

function getNoteLikesPage(req, res) {
    res.status(200).render('users', {
        option: 'Likes',
        url: `/api/note/${req.params.id}/likes`
    });
};

function getSettingsPage(req, res) {
    res.status(200).render('settings');
};

function getProfileSettingsPage(req, res) {
    res.status(200).render('settings-profile');
};

function getPasswordSettingsPage(req, res) {
    res.status(200).render('settings-password');
};

export {
    getIndexPage,
    getAccountPage,
    getUserPage,
    getNotePage,
    getUserFollowingPage,
    getUserFollowersPage,
    getNoteLikesPage,
    getSettingsPage,
    getProfileSettingsPage,
    getPasswordSettingsPage
};