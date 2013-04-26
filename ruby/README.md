#Yeah, Metrics
## Ruby reporter

##Requirements
The ruby reporter parses SimpleCov CSV output and metric_fu report data, so you need the following gems to be run first:

* simplecov + simplecov-csv
* metric_fu

In addition, you need a keen.io project to report to.

##Usage
You run the script like this:

    $ KEEN_PROJECT_ID=<your project ID> ruby yeah-metrics.rb <path/to/metric_fu/_data/YYMMDD.yml> <path/to/simplecov/results.csv>
This will feed the metrics into your project.

