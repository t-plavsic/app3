
//Database remote
    //const strUrl = 'xxx';
    //const secret = 'remoteSecret';

//Database local
    //const strUrl = 'mongodb://localhost:27017/db0';
    //const secret = 'localSecret';

module.exports = {
    dbUrl: 'mongodb://localhost:27017/db0',
    secret: 'myLocalSecret...',  
    tokenExpireTime: 2*60*60 ,      // 8*60*60  or '8h'
    cookieMaxAge:    2*60*60*1000 
};  
