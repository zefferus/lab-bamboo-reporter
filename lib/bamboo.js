
var internals = {};


exports = module.exports = internals.Reporter = function (options) {
    this.settings = options;
};


internals.Reporter.prototype.start = function (notebook) {
    // Nothing to run here
};


internals.Reporter.prototype.test = function (test) {
    // Nothing to run here
};


internals.Reporter.prototype.end = function (notebook) {
    var successes = [];
    var failures = [];
    var skipped = [];

    notebook.tests.forEach(function (test) {
        if (!!test.err) {
            failures.push(test);
        } else if (test.skipped) {
            skipped.push(test);
        } else {
            successes.push(test);
        }
    });

    var obj = {
        stats: {
            tests: notebook.tests.length - skipped.length,
            passes: successes.length,
            failures: failures.length,
            duration: notebook.ms
        },
        failures: failures.map(internals.cleanTest),
        passes: successes.map(internals.cleanTest),
        skipped: skipped.map(internals.cleanTest)
    };

    this.report(JSON.stringify(obj, null, 2));
};


internals.cleanTest = function cleanTest(test) {
    var o = {
        title: test.relativeTitle,
        fullTitle: test.title,
        duration: test.duration
    }
    if (!!test.err) {
        o.error = test.err.message;
    }
    return o;
};

