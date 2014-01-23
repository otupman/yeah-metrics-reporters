require 'keen'
require 'yaml'
require 'csv'

YAML::ENGINE.yamler = 'syck'

if ARGV.size < 2 
    puts "Call me like this, please: KEEN_PROJECT_ID=YOUR_PROJECT_ID ruby yeah-metrics.rb </path/to/metric_fu/<DATE>.yml> <path/to/coverage.csv>"
    exit
end

metric_data = YAML.load_file(ARGV[0])
roodi_score = metric_data[:roodi][:total][0].match(/\d+/).values_at(0)[0].to_i
reek_code_smells = metric_data[:reek][:matches].reduce(0) { |sum, file| sum + file[:code_smells].size }

code_to_test_ratio = metric_data[:stats][:code_to_test_ratio]

coverage_relevant_lines = 0
coverage_covered_lines = 0

CSV.foreach(ARGV[1]) do |row|
    coverage_relevant_lines = coverage_relevant_lines + row[3].to_i
    coverage_covered_lines = coverage_covered_lines + row[4].to_i
end

score = 100.0 * (coverage_covered_lines.to_f / coverage_relevant_lines.to_f)
if score.nan?
  score = 0.0
end

Keen.publish("code_style", { :language => "ruby", :score => roodi_score })
Keen.publish("code_smells", { :language => "ruby", :score => reek_code_smells})
Keen.publish("code_to_test_ratio", { :language => "ruby", :score => code_to_test_ratio })
Keen.publish("coverage", { :language => "ruby", :score => score })
