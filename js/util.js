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

util.getCharacter = function(str, loc) {
    var strRet;
    strRet = str.charAt(loc);
    //strRet = str.toString()[loc];
    return strRet;
};

util.initPrototypes = function() {

    // replace a string between from & to
    String.prototype.replaceBetween = function(start, end, what) {
        return this.substring(0, start) + what + this.substring(end + 1);
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
