var main = main || {
    exponent: 3,
    dummyReplacer: 'X',
    methodUsed: '1',
    numTo: 0,
    sumToCheck: 8,
    tempArrResults: {}
};

main.method2GuessPossiblities = function(newDummyNum, isScope) {
    var possiblilities = [];
    var i = 0;
    //for (var i = 0; i <= main.sumToCheck; i++) {
    //while (i <= 8) {
    var complement = main.getComplement(i);
    var option = newDummyNum.replace(main.dummyReplacer, complement);
    var sum = util.getSum(option);

    if (sum == main.sumToCheck) {
        possiblilities.push(i);
    }
    //i++;
    //};

    return possiblilities;
};

main.method2RecursivelyComputeResults = function(strNumber, currentIndex, startIndex, endIndex) {
    // if (currentIndex >= strNumber.length) {
    //     console.log('done');
    //     //main.tempArrResults = arrResults;
    //     return false;
    // }

    //var newNum = strNumber.replaceAt(startIndex, '0');
    //console.log('newNum:', newNum);
    var prevChar = util.getCharacter(strNumber, currentIndex - 1);
    var thisChar = util.getCharacter(strNumber, currentIndex);
    var nextChar = util.getCharacter(strNumber, currentIndex + 1);
    var guess = main.guess(thisChar);

    console.log(strNumber, currentIndex, startIndex, endIndex);
    console.log(prevChar, thisChar, [guess], nextChar);

    if (thisChar == 0) {
        if (nextChar == -1) {
            //console.log('Guess(' + thisChar + ') at index(' + currentIndex + ') is ' + guess);
            //console.log('========Create number & push to arrResults ======');

            var newNum = strNumber.replaceAt(currentIndex, guess);
            //console.log('newNum:', newNum);
            //main.tempArrResults.push(newNum);
            strNumber = newNum;
        }

        currentIndex = currentIndex + 1;
        console.log('Move to next char, currentIndex++, call fn');
        main.method2RecursivelyComputeResults('' + strNumber, currentIndex, startIndex, endIndex);

    } else {
        console.log('Get complement');
        if (guess < main.sumToCheck && guess >= 0) {
            console.log('Guess is less than sum');
        } else {
            console.log('Make Guess');
        }
    }

    // //var sum = util.getSum(newNum);
    // //console.log('sum:', sum);

    // if (sum == main.sumToCheck) {
    //     //possiblilities.push(i);
    // } else {
    //     //main.method2RecursivelyComputeResults(strDummyNumber, currentIndex, startIndex, endIndex);
    // }

    // //var guesses = main.method2GuessPossiblities(strNumber);
    // //console.log('guesses:', guesses);
};

main.method2RecursiveResults = function(strNumber, currentIndex, sum, tmpResults) {
    console.log('========>>>>', strNumber, currentIndex, sum, tmpResults);

    if (currentIndex < 0) {
        return tmpResults;
    }

    var prevChar = util.getCharacter(strNumber, currentIndex - 1);
    var thisChar = util.getCharacter(strNumber, currentIndex);
    var nextChar = util.getCharacter(strNumber, currentIndex + 1);

    var arrSplit = strNumber.splitIndex(currentIndex);
    var concernedNum = arrSplit[1];
    var guesses = main.guess(concernedNum);
    console.log(guesses);

    for (var i = 0; i < guesses.length; i++) {
        var guess = guesses[i];
        var resultant = strNumber.replaceBetween(currentIndex, currentIndex + 1, guess);
        if (util.getSum(resultant) === 0) {
            continue;
        }
        console.log(concernedNum, guess, resultant);
        tmpResults.push(resultant);

        // if (guess % main.sumToCheck == 0) {
        //     tmpResults.push(resultant);
        //     console.log('PUSH', resultant, 'TO RESULTS');
        //     console.log('currentIndex-- & call me again');
        //     currentIndex = currentIndex - 1;
        //     //main.method2RecursiveResults(strNumber, currentIndex, 0, tmpResults);
        // }
    };

    currentIndex = currentIndex - 1;
    main.method2RecursiveResults(strNumber, currentIndex, 0, tmpResults);
};

main.method2ProcessNDidits = function(strDummyNumber, numLength, numStartingWith, isScope, finalArrResults) {

    if (numLength > main.exponent) {
        return finalArrResults;
    }

    console.log('========>>>>', strDummyNumber, numLength, numStartingWith, isScope, finalArrResults);

    var tmpResults = [];

    if (numLength == 1) {
        console.log(strDummyNumber, numLength, numStartingWith, isScope, finalArrResults);
        tmpResults = [8];
        util.mergerArrays(finalArrResults, tmpResults);

        console.log('add digit before num, reset numStartingWith & call me again');
            
        numStartingWith = 0;
        strDummyNumber = numStartingWith + '0'.repeat(numLength);
        numLength = numLength + 1;
        main.method2ProcessNDidits(strDummyNumber, numLength, numStartingWith, isScope, finalArrResults);
    } else {
        if (isScope) {

            numStartingWith = numStartingWith + 1;
            console.log(strDummyNumber, numLength, numStartingWith, isScope, finalArrResults);
        }else {

        }
        console.log(strDummyNumber, numLength, numStartingWith, isScope, finalArrResults);
        console.log('++numStartingWith & call me again');
    }

    //strDummyNumber = '1' + '0'.repeat(numLength);
    //numLength = numLength + 1;
    //main.method2ProcessNDidits(strDummyNumber, numLength, numStartingWith, isScope, finalArrResults);
};

// Method 2 : Using Recursion
main.method2 = function() {
    // var startIndex = 0,
    //     endIndex = 0;
    // var replacer = '1' || main.dummyReplacer;
    // var strDummyNumber = '';
    // //strDummyNumber = util.getDummyOfLengthN(main.exponent, replacer);
    // strDummyNumber = replacer.repeat(main.exponent);
    // //console.log('strDummyNumber', strDummyNumber);

    var isScope = true,
        numLength = 1,
        numStartingWith = '0',
        tmpResults = [],
        strDummyNumber = numStartingWith;

    main.method2ProcessNDidits(strDummyNumber, numLength, numStartingWith, isScope, tmpResults);

    console.log('Results: ', tmpResults);

    main.tempArrResults = tmpResults;

    return main.tempArrResults || [];
};

// Method 3 : Using P&C
main.method3 = function() {
    return [];
};

main.method1MainLogic = function(num) {
    var arrResults = [],
        indexParticipated = [];

    for (var startIndex = 0; startIndex < num.length; startIndex++) {
        for (var endIndex = startIndex; endIndex < num.length; endIndex++) {
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
            //for (var i = main.numTo; i >= 1; i--) {

            if (('' + i).indexOf('9') == -1) {
                var isMatch = main.method1MainLogic(i.toString());
                if (isMatch.length > 0) {
                    arrResults.push(i);
                }
            }

            //};
        }
    };

    return arrResults;
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

// Get complement of the given number in relation to main.sumToCheck
main.getComplement = function(num) {

    return (+main.sumToCheck) - (+num);
};

// Guess the next possible digit
main.guess = function(num) {
    // var complement = main.getComplement(num);
    // if (complement == 0) {
    //     complement = [0, main.sumToCheck];
    // } else if (complement < 0 || complement > main.sumToCheck) {
    //     complement = -1;
    // }
    // return complement;

    var complement = main.getComplement(num);
    if (complement == 0 || complement == main.sumToCheck) {
        complement = [0, +main.sumToCheck];
    } else if (complement < 0 || complement > main.sumToCheck) {
        complement = [-1];
    } else {
        complement = [complement];
    }
    return complement;
};

// Start the search process
main.search = function() {

    return main['method' + main.methodUsed]() || [];
};











// main.method3 = function() {
//     var letters = '012345',
//         size = '3';
//     return main.method3Permutate.getPermutations(letters, size);
// };

// main.method3Permutate = (function() {
    
//     var results = [];    
    
//     function doPermute(input, output, used, size, level) { 
//         if (size == level) {
//             var word = output.join('');
//             results.push(word);
//             return;
//         } 
        
//         level++;
        
//         for (var i = 0; i < input.length; i++) {
            
//             if (used[i] === true) {
//                 continue;
//             }            
            
//             used[i] = true;

//             output.push(input[i]);
            
//             console.log(input, output, used, size, level);
//             doPermute(input, output, used, size, level);
            
//             used[i] = false;
            
//             output.pop();
//         }
//     }
    
//     return {
//         getPermutations: function(input, size) {
//             console.clear();
//             results = [];
//             var chars = input.split('');
//             var output = [];
//             var used = new Array(chars.length);      
            
//             console.log(chars, output, used, size, 0);
//             doPermute(chars, output, used, size, 0);        

//             return results;    
//         }
//     }
// })();

// Check the sum of digits : Method 2 | Recursive
main.checkSumRecursively = function(num, startIndex, endIndex, arrResults) {
    if (startIndex >= num.length || endIndex >= num.length) {
        //console.log(arrResults);
        main.tempArrResults = arrResults;
        return false;
    }

    var substr = util.getSubString(num, startIndex, endIndex);
    var sumOfSubstr = util.getSum(substr);
    console.log('sumOfSubstr(' + substr + ')=' + sumOfSubstr);

    if (sumOfSubstr < main.sumToCheck) {
        //console.log('keep startIndex, endIndex++, keep sum & call checkSumRecursively()');

        endIndex = endIndex + 1;
        main.checkSumRecursively(num, startIndex, endIndex, arrResults);
    } else if (sumOfSubstr > main.sumToCheck) {
        //console.log('startIndex++, reset endIndex to startIndex, reset sum to 0 & call checkSumRecursively()');

        startIndex = startIndex + 1;
        endIndex = startIndex;
        sumOfSubstr = 0;
        main.checkSumRecursively(num, startIndex, endIndex, arrResults);
    } else {
        console.log('PUSH "' + substr + '" to arrResults.');
        //main.pushToArray(num, arrResults, substr, startIndex, endIndex);
        //console.log(arrResults);

        //console.log('startIndex++, reset endIndex to startIndex, reset sum to 0 & call checkSumRecursively()');
        startIndex = startIndex + 1;
        endIndex = startIndex;
        sumOfSubstr = 0;
        main.checkSumRecursively(num, startIndex, endIndex, arrResults);
    }
};

// // Method 3 : Using Higher Order Functions
// main.method3 = function(num) {
//     var startIndex = 0,
//         endIndex = 0;
//     var arrResults = [];

//     arrResults = num
//         .split('')
//     //.map(function(e) {return +e;})
//     // .reduce((previousValue, currentValue, index, array)=>{
//     //   var retVal = previousValue + currentValue;
//     //   //console.log('hello', retVal, previousValue, currentValue, index);
//     //
//     //   // get sum of the substring
//     //   var sum = retVal
//     //       .split('')
//     //       //.map(function(e) {return +e;})
//     //       .reduce((a,b,c,d)=>{
//     //           console.log('sum', a,b,c,d);
//     //           return a+b;
//     //       }, []);
//     //
//     //   console.log(sum);
//     //
//     //   return retVal;
//     //
//     //   if(sum == 8) {
//     //       return retVal;
//     //   } else {
//     //       return previousValue;
//     //   }
//     //
//     // }, []);

//     //console.log(arrResults);
//     return arrResults || [];
// };
