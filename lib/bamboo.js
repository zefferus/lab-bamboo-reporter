
var internals = {};


exports = module.exports = internals.Reporter = function Reporter(options) {
    this.settings = options;
};


internals.Reporter.prototype.start = function start(notebook) {
    // Nothing to run here
};


internals.Reporter.prototype.test = function test(test) {
    // Nothing to run here
};


internals.Reporter.prototype.end = function end(notebook) {
    var successes = [];
    var failures = [];
    var skipped = [];

    notebook.tests.forEach(function separateTests(test) {
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
    // Borrowed heavily from Lab's console reporter

    var o = {
        title: test.relativeTitle,
        fullTitle: test.title,
        duration: test.duration
    };

    if (!!test.err) {
        var message = test.err.message || '';

        if (test.err.actual !== undefined && test.err.expected !== undefined) {
            message += ' - actual: ' + internals.stringify(test.err.actual) +
                ' expected: ' + internals.stringify(test.err.expected);
        }

        if (test.err.at) {
            message += '\n      at ' + test.err.at.filename + ':' + test.err.at.line + ':' + test.err.at.column;

        } else if (!test.timeout && test.err.stack) {
            message += '\n' + test.err.stack.slice(test.err.stack.indexOf('\n') + 1).replace(/^/gm, '  ');
        }

        o.error = message;
    }

    return o;
};


internals.stringify = function stringify(value) {
    // Borrowed directly from Lab's console reporter

    // Show usually invisible values from JSON.stringify in a different way

    if (value === undefined) {
        return '[undefined]';
    }

    if (typeof value === 'function') {
        return '[' + value.toString() + ']';
    }

    /* $lab:coverage:off$ */ // There is no way to cover that in node 0.10
    if (typeof value === 'symbol') {
        return '[' + value.toString() + ']';
    }
    /* $lab:coverage:on$ */

    return JSON.stringify(value);
};
