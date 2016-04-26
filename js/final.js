var main = main || {
    exponent: 3,
    dummyReplacer: 'X',
    methodUsed: '1',
    numTo: 0,
    sumToCheck: 8,
    tempArrResults: {}
};

main.method1MainLogic = function(num) {
    var arrResults = [],
        indexParticipated = [];

    for (var startIndex = 0; startIndex < num.length; startIndex++) {
        //console.log(num, util.getSum(num[startIndex] + num[startIndex + 1]));
        // if (startIndex < num.length &&
        //      util.getSum(num[startIndex] + num[startIndex + 1]) > main.sumToCheck &&
        //      num[startIndex] != main.sumToCheck) {
        //     continue;
        // }

        for (var endIndex = startIndex; endIndex < num.length; endIndex++) {
            
            //console.log(num, startIndex, num[startIndex], endIndex, num[endIndex]);

            var substr = util.getSubString(num, startIndex, endIndex),
                sum = util.getSum(substr);

            //console.log(num, startIndex, endIndex, 'Sum('+substr+')='+sum);
            if (sum == main.sumToCheck) {
                indexParticipated.pushFromTo(startIndex, endIndex);
            }
        }
    }

    if (indexParticipated.length === num.length) {
        //console.log('SUCCESSFUL CANDIDATE', num);
        arrResults.push(num);
    }

    return arrResults;
};

// Method 1 : Using for loop
main.method1 = function() {
    var arrResults = [];
    var ranges = main.getRanges(main.exponent);
    //console.log(ranges);

    for (var r = 0; r < ranges.length; r++) {
        //console.log(ranges[r][0], ranges[r][1]);
        for (var i = ranges[r][0]; i <= ranges[r][1]; i++) {
            if (('' + i).indexOf('9') == -1) {
                var isMatch = main.method1MainLogic(i.toString());
                if (isMatch.length > 0) {
                    arrResults.push(i);
                }
            }
        }
    };

    return arrResults;
};


// Start the search process
main.search = function() {

    return main['method' + main.methodUsed]() || [];
};

// Get ranges for the exponent
main.getRanges = function(exp) {
    var arrRanges = [];
    for (var i = 1; i <= exp; i++) {
        if (i == 1) {
            arrRanges.push(['8', '8']);
        } else {
            arrRanges.push(['1' + '0'.repeat(i - 1), '8'.repeat(i)]);
        }
    };
    return arrRanges;
};
