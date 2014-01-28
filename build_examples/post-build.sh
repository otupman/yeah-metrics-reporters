#!/bin/bash

metric_fu -r --format yaml --format html

git clone https://github.com/centralway/yeah-metrics-reporters.git tmp/yeah-metrics-reporters

gem install keen
ruby tmp/yeah-metrics-reporters/ruby/yeah-metrics.rb tmp/metric_fu/report.yml coverage/results.csv
