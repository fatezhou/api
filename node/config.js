function CuteConfig(){
    var cfg = {
        db:{
            user:"admin",
            password:"admin",
            host:"127.0.0.1",
            port:3306,
            database:"test",            
        },
        port:8080,
        log:{
            logLevel:"debug",
            logSize:5000,
        }
    }
    this.GetDataBaseConfig = function(){
        return this.cfg.db;
    }
    this.GetPort = function(){
        return this.cfg.port;
    }
    this.GetLog = function(){
        return this.cfg.log;
    }
}