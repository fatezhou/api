/*
CREATE TABLE `growth_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` text CHARACTER SET utf8,
  `picture_urls` text CHARACTER SET utf8,
  `author_id` varchar(32) NOT NULL,
  `author_type` int(2) NOT NULL DEFAULT '1' COMMENT '1:teacher,2:parent',
  `student_id` varchar(32) NOT NULL,
  `append_advice` text CHARACTER SET utf8,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `some_one_like` text CHARACTER SET utf8 COMMENT '{"myLike":true, "like":[memberids]}',
  `record_type` int(2) NOT NULL DEFAULT '1' COMMENT '1: text, 2: append',
  `parent_record_id` int(32) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) 
*/
var CuteTool = require("./../tools.js");

function ApiGetGrowthRecord(){
    this.Service = function(version, data, callback){
        //"growthRecordId":"10001"
        var tools = new CuteTool;
        var db = tools.GetDataBase();
        var res = {};
        function GetMainRecord(){
            var sqlFmt = "select "
        }

        function Get
    }
}

module.exports = ApiGetGrowthRecord;