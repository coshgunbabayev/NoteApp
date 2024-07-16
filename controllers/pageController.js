function getIndexPage(req, res) {
    res.status(200).render('index');
};

function getAccountPage(req, res) {
    res.status(200).render('account');
};

export {
    getIndexPage,
    getAccountPage,
};