function CuteTool(){
    this.GetResponse = function(){
        var CuteResponse = require("./response.js");
        var res = new CuteResponse;
        return res;
    }
    this.GetDataBase = function(){
        var CuteDbController = require("./dbController.js");
        var res = new CuteDbController;
        return res;
    }
    this.GetConfig = function(){
        var CuteConfig = require("./config.js");
        var res = new CuteConfig;
        return res;
    }
    this.Https = function(){
        var CuteHttps = require("./https.js");
        var res = new CuteHttps;
        return res;
    }
}

module.exports = CuteTool;