//Database local
const host = 'localhost';
const dbPort = '27017';
const database = 'db0';
const strUrl = `mongodb://@${host}:${dbPort}/${database}`

//Database remote
//const strUrl = 'mongodb://tplavsic:tplavsic!!@185.205.209.49:27017/db0?authMechanism=SCRAM-SHA-1&authSource=admin';

module.exports = {
    dbUrl: strUrl,
    secret: 'myLocalSecret...'
};
