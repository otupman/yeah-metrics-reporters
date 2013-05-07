var fs = require('fs'),
    xml2js = require('xml2js'),
    keen = require('keen.io');

if(process.argv.length < 6) {
    console.log("Usage: node yeah-metrics.js YOUR_KEEN_IO_API_KEY YOUR_KEEN_IO_PROJECT_ID /path/to/jshint.xml /path/to/cobertura-coverage.xml");
    process.exit();
}

var api = keen.configure({
    projectId: process.argv[3],
    writeKey: process.argv[2]
});
var parser = new xml2js.Parser();

// Go!

fs.readFile(process.argv[4], function(err, data) {
    parser.parseString(data, function (err, result) {
        var errors = 0;
        for(var i=0;i<result.checkstyle.file.length;i++) {
           if(result.checkstyle.file[i].error[0]['$'].severity !== "error") continue;
           errors++;
        }

        api.addEvent("code_style", { score: errors, language: "javascript" }, function(err, res) {
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
fs.readFile(process.argv[5], function(err, data) {
  parser.parseString(data, function(err, result) {
    if(err) {
      console.error("Sorry, cannot find coverage XML.");
    } else {
      coverage = result.coverage["$"]["line-rate"] * 100.0;
      api.addEvent("coverage", {score: coverage, language: "javascript" }, function(err, res) {
        if(err) {
          console.error("Sending data failed:" , err, res);
        } else {
          console.info("Data sent to backend.");
        }      
      });
      console.log("Done, coverage is " + coverage + "%");
    }
  });
});

