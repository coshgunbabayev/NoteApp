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

function getUserFollowingPage(req, res) {
    res.status(200).render('users', {
        username: req.params.username,
        option: 'Following',
        url: `/api/user/${req.params.username}/following`
    });
};

function getUserFollowersPage(req, res) {
    res.status(200).render('users', {
        username: req.params.username,
        option: 'Followers',
        url: `/api/user/${req.params.username}/followers`
    });
};

export {
    getIndexPage,
    getAccountPage,
    getUserPage,
    getUserFollowingPage,
    getUserFollowersPage
};