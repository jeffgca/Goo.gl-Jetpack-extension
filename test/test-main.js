const main = require("main");
var testRunner, remaininTests;

exports.test_test_run = function(test) {
  test.pass("Unit test running!");
};

exports.test_shorten = function(test) {
    testRunner = test;
    testRunner.waitUntilDone(2000);
    main.shorten('https://www.mozilla.org/', function(response) {
        testRunner.assertEqual(/^http:\/\/goo.gl\/[\w]{5}/.test(response.id), true);
        testRunner.done();
    });
}

