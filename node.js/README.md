#Yeah, Metrics
## node.js reporter

##Requirements
The node.js reporter parses JSHint / JSLint xml output and has the following dependencies:


* [jshint](https://npmjs.org/package/jshint)
* [karma](https://npmjs.org/package/karma)
* [xml2js](https://npmjs.org/package/xml2js)
* [keen.io](https://npmjs.org/package/keen.io)

In addition, you need a [Keen.io](http://keen.io) project to report to.
You may wish to put them into your npm package.json and install them through npm

##Configuration
Please change the ```YOUR_API_TOKEN``` and ```YOUR_PROJECT_TOKEN``` in ```yeah-metrics.js``` to the values of your keen.io project first.

##Usage
You run the script like this:

    $ node yeah-metrics.js ./path/to/jshint.xml ./path/to/cobertura-coverage.xml
This will feed the metrics into your project.
