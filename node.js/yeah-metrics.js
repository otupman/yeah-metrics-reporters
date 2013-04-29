var fs = require('fs'),
    xml2js = require('xml2js'),
    keen = require('keen.io');

var api = keen.api("YOUR_API_TOKEN");
var projectToken = "YOUR_PROJECT_TOKEN";

if(process.argv.length < 4) {
    console.log("Usage: node yeah-metrics.js /path/to/jshint.xml /path/to/cobertura-coverage.xml");
    process.exit();
}

var parser = new xml2js.Parser();
fs.readFile(process.argv[2], function(err, data) {
    parser.parseString(data, function (err, result) {
        var errors = 0;
        for(var i=0;i<result.checkstyle.file.length;i++) {
           if(result.checkstyle.file[i].error[0]['$'].severity !== "error") continue;
           errors++;
        }

        api.events.insert(projectToken, [{collection: "code_style", data: { score: errors, language: "javascript" }}], function(err, res) {
            if(err) {
                console.error("Sending data failed:" , err, res);
            } else {
                console.info("Data sent to backend.");
            }
        });

        console.log('Done, ' + errors + " errors found.");
    });
});

var parser = new xml2js.Parser();
fs.readFile(process.argv[3], function(err, data) {
  parser.parseString(data, function(err, result) {
    if(err) {
      console.error("Sorry, cannot find coverage XML.");
    } else {
      coverage = result.coverage["$"]["line-rate"] * 100.0;
      api.events.insert(projectToken, [{collection: "coverage", data: {score: coverage, language: "javascript"}}]);
      console.log("Done, coverage is " + coverage + "%");
    }
  });
});

