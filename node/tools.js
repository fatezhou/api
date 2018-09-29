function CuteTool(){
    this.GetResponse = function(){
        var CuteResponse = require("./response.js");
        var res = new CuteResponse;
        return res;
    }
    this.GetDataBase = function(){
        var CuteDbController = require("./dbController.js");
        var config = this.GetConfig();
        var conn = config.GetDataBaseConfig();
        var res = new CuteDbController(conn);
        console.info("get data base");
        return res;
    }
    this.GetConfig = function(){
        var CuteConfig = require("./config.js");
        var res = new CuteConfig;
        return res;
    }
    this.GetHttps = function(){
        var CuteHttps = require("./https.js");
        var res = new CuteHttps;
        return res;
    }
    this.GetLogger = function(){
        var log4js=require('log4js');
        log4js.configure({
            appenders: {
              out: { type: 'stdout' },//设置是否在控制台打印日志
              info: { type: 'file', filename: './logs/info.log' }
            },
            categories: {
              default: { appenders: [ 'out', 'info'], level: 'debug' }//去掉'out'。控制台不打印日志
            }
          });
        return log4js.getLogger('info');;
    }
    this.GetMongo = function(){
        var Mongo = require("./mongoCtrl.js");
        var res = new Mongo;
        return res;
    }
}

module.exports = CuteTool;