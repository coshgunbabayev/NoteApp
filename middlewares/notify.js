import moment from 'moment';

function notify(req, res, next) {
    console.log(`[${moment().format('L')}]`, req.method, '"' + req.url + '"');
    next();
};

export default notify;