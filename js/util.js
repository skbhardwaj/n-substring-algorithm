var util = util || {};

// Calculates the performance of test | Performance
util.testPerformance = function(functionToTest) {
    var t0 = window.performance.now();
    functionToTest();
    var t1 = window.performance.now();
    return t1 - t0;
};

// Calculates the performance of test | Time
util.testTime = function(functionToTest) {
    console.time("ProcessTime");
    functionToTest();
    return console.timeEnd("ProcessTime");
};

// Merge 2 arrays; returns arr2;
util.mergerArrays = function(arr1, arr2) {
    return Array.prototype.push.apply(arr1, arr2);
};

// Get substring
util.getSubString = function(num, x, y) {
    var retStr = 0;
    retStr = num.substring(x, y) + util.getCharacter(num, y);

    /*if(!retStr){
      retStr = num.substring(x, x+1);
    }*/

    //console.log(retStr);
    return retStr;
};

util.getDummyOfLengthN = function(n, replaceBy) {
    var retVal = '';
    for (var i = 0; i < n; i++) {
        retVal += replaceBy;
    };
    return retVal;
};

util.getLastNDigits = function(strNumber, indexN) {

    return strNumber.toString().substr(strNumber.length - (+lastNDigits), (+lastNDigits));
};

util.replaceFirstChars = function(strNumber, firstNDigits, replaceBy) {
    var strTemp = util.getDummyOfLengthN(firstNDigits, replaceBy);
    return strTemp + strNumber.substring(firstNDigits);
};

util.replaceLastChars = function(strNumber, lastNDigits, replaceBy) {
    var strTemp = util.getDummyOfLengthN(lastNDigits, replaceBy);
    return strNumber.substring(0, strNumber.length - (+lastNDigits)) + strTemp;
};

// Get sum of digits of number
util.getSum = function(txt) {

    if (!txt) {
        return 0;
    }

    var sum = 0;
    var num = txt;

    // method 1
    for (var i = 0; i < num.length; i++) {
        sum += parseInt(num.charAt(i), 10);
    }

    //// method 2
    // num = parseInt(txt);
    // while(num > 0) {
    //    sum = sum + num%10;
    //    num = Math.floor(num/10);
    // }

    //console.log('Sum('+ txt +')='+ sum +'.');
    return sum;
};

// get char at given index location
util.getCharacter = function(str, loc) {
    var strRet;
    strRet = str.charAt(loc) || -1;
    //strRet = str.toString()[loc];
    return strRet;
};

// initializes given prototypes
util.initPrototypes = function() {

    // repeats the string n times
    String.prototype.repeat = function(count) {
        if (count < 1) return '' + this;
        var result = '', pattern = this.valueOf();
        while (count > 1) {
            if (count & 1) result += pattern;
            count >>= 1, pattern += pattern;
        }
        return result + pattern;
    };

    // repeats the string n times
    String.prototype.splitIndex = function(index) {
        var arrSplit = [];
        arrSplit.push(this.substring(0, index));
        arrSplit.push(this.substring(index));
        return arrSplit;
    };

    // replaces at nth index
    String.prototype.replaceAt = function(index, character) {
        index = index.toString();
        character = character.toString();
        return this.toString().substr(0, index) + character + this.toString().substr(index + character.length);
    };

    // replace a string between from & to
    String.prototype.replaceBetween = function(start, end, what) {

        return this.substring(0, start) + what + this.substring(end + 1);
    };

    // reverses a given string
    String.prototype.reverse = function() {
        //return this.split('').reverse().join('');

        var o = '';
        for (var i = this.length - 1; i >= 0; i--)
          o += this[i];
        return o;
    };

    // push numbers between the range
    Array.prototype.pushFromTo = function(fromIndex, toIndex) {
        for (var i = fromIndex; i <= toIndex; i++) {
            if (this.indexOf(i) < 0) {
                this.push(i);
            }
        }
        return this;
    };
};

// Initializes default functions
util.init = function() {
    util.initPrototypes();

    $('.numOnly').on('keypress', function(e) {
        //this.value = this.value.replace(/[^0-9\.]/g,'');

        var keynum = (!window.event) ? e.which : e.keyCode;
        return !((keynum === 8 || keynum === undefined || e.which === 0) ? null : String.fromCharCode(keynum).match(/[^0-9]/));
    });
};
