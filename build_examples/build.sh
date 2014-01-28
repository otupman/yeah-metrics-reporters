#!/bin/bash 
export RAILS_ENV=test

bundle install
# TODO: Bring these in once the DB is ready
rake db:migrate:reset
rake db:test:prepare
COVERAGE=true bundle exec rspec spec/
