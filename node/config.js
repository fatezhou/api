function CuteConfig(){
    var cfg = {
        db:{
            host     : 'localhost',
            user     : 'minidope',
            password : 'minidope',
            database : 'minidope'        
        },
        port:8080,
        log:{
            logLevel:"debug",
            logSize:5000,
        }
    };
    this.GetDataBaseConfig = function(){
        return {
            host     : 'localhost',
            user     : 'minidope',
            password : 'minidope',
            database : 'minidope',
            port:3306        
        };
    };
    this.GetPort = function(){
        return this.cfg.port;
    };
    this.GetLog = function(){
        return this.cfg.log;
    }
    this.GetStudentsInfoUrl = function(){
        return "https://ouat.buzaishudian.com/api/students";
    }
    this.GetParentProfileInfoUrl = function(){
        return "https://ouat.buzaishudian.com/api/parent-info";
    }
    this.GetLoginUrl = function(){
        return "https://test.buzaishudian.com/api/mini/user-id";
    }
    this.GetTeathersUrl = function(){
		return "https://test.buzaishudian.com/api/teachers";
	}
}

module.exports = CuteConfig;