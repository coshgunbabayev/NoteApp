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

export {
    getIndexPage,
    getAccountPage,
    getUserPage
};