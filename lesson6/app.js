var fibonacci = function (num) {
    if (num === 0) {
        return 0;
    }

    if (num === 1) {
        return 1;
    }

    return fibonacci(num - 1) + fibonacci(num - 2);
}

exports.fibonacci = fibonacci;

if (require.main === module) {
    var n = Number(process.argv[2]);
    console.log('fibonacci(' + n + ') is ', fibonacci(n));
}