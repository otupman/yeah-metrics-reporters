var fs = require('fs'),
    xml2js = require('xml2js'),
    keen = require('keen.io');

var api = keen.api("38E85E60882DBD1B07E9F66EBE81294B");
var projectToken = "450f0330b2604dffb99a0b08d98cdf65";

var parser = new xml2js.Parser();
fs.readFile(__dirname + '/jshint.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        var errors = 0;
        for(var i=0;i<result.checkstyle.file.length;i++) {
           if(result.checkstyle.file[i].error[0]['$'].severity !== "error") continue;
           errors++;
        }

        api.events.insert(projectToken, [{collection: "code_style", data: { score: errors, language: "javascript" }}], function(err, res) {
            if(error) {
                console.error("Sending data failed:" , err, res);
            } else {
                console.info("Data sent to backend.");
            }
        });

        console.log('Done, ' + errors + " errors found.");
    });
});
