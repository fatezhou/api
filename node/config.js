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
            port:3306 ,
			dateStrings:true			
        };
    };
    var frontPage = "https://ouat";//https://test
    
    this.GetTeacherAppid = function(){
        return "wxc3cdca6978c3b5ba";
    };
    this.GetTemplateId = function(){
        return "5RrP5MixecP2lFPLATMazPRoQmBsiQ_wVy2a5H0Vd34";
    };
    this.GetParentAppid = function(){
        return "wxf4ff3923fa71c9a3";
    };
    this.GetTemplateIdOfParent = function(){
        return "CfO9VdYIeC70pQTBX-9DIbPLrbG-Hgc9HrO9nF3K2dM";
    };
    this.GetPort = function(){
        return this.cfg.port;
    };
    this.GetLog = function(){
        return this.cfg.log;
    }
    this.GetStudentsInfoUrl = function(){
        return frontPage + ".buzaishudian.com/api/students";
    }
    this.GetParentProfileInfoUrl = function(){
        return frontPage + ".buzaishudian.com/api/parent-info";
    }
    this.GetLoginUrl = function(){
        return frontPage + ".buzaishudian.com/api/mini/user-id";
    }
    this.GetTeathersUrl = function(){
		return frontPage + ".buzaishudian.com/api/teachers";
	}
	this.GetBindPhoneUrl = function(){
		return frontPage + ".buzaishudian.com/api/mini/phone-bind";
	}
	this.GetVCode = function(){
		return frontPage + ".buzaishudian.com/api/mini/phone-vcode";
	}
	this.GetTeacherInfoByPhone = function(){
		return frontPage + ".buzaishudian.com/api/teacher-info";
    }
    this.GetCdnTokenUrl = function(){
        return frontPage + ".buzaishudian.com/api/upload-auth";
    }
    this.GetFamilyUrl = function(){
        return frontPage + ".buzaishudian.com/api/family-info";
    }
    this.GetParentsUrl = function(){
        return frontPage + ".buzaishudian.com/api/parents";
    }
}

module.exports = CuteConfig;