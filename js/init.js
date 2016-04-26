var init = init || {};

// Bind events
init.bindEvents = function() {

    $('#btn').on('click', function(e) {
        console.clear();

        main.sumToCheck = $('#n').val() || main.sumToCheck;
        main.exponent = $('#exp').val() || $('#exp').data('text');
        main.numTo = Math.pow(10, main.exponent);
        main.methodUsed = $('input[name="method"]:checked').val() || '1';

        var timeUsed = util.testPerformance(function() { // testPerformance OR testTime(if console is opened)
            res = main.search();
        });

        //console.log(timeUsed, res.length, res);
        init.setResults(res, timeUsed);
    });

    $('#clear').on('click', function(e) {
        console.clear();
        $('#result').html(function() {
            return $(this).data('text');
        });
        $('#n').val(function() {
            return $(this).data('text');
        });
        $('#exp').val(function() {
            return $(this).data('text');
        }).focus();
    });

    $('.ctrl').on('click', function(e) {
        var $inp = $(this).closest('.step').find('input[type="text"]');
        var res = +$inp.val();
        var operator = $(this).data('val');

        if (operator === '+') {
            res += 1;
        } else {
            res -= 1;
        }

        if (res <= 0) {res = 1;}

        $inp.val(res).focus();
    });
};

// Get result list
init.getResultList = function(res) {
    var li = '';
    for (var i = 0; i < res.length; i++) {
        li += '<li>' + res[i] + '</li>';
    }
    return li;
};

// Set the results in DOM
init.setResults = function(res, timeUsed) {
    //console.log(res);
    var str = '';
    str += res ? '<div class="found">The entered sum to check = <span>' + main.sumToCheck + '</span></div>' : '';
    str += res ? '<div class="found">The entered exponent = <span>' + main.exponent + '</span></div>' : '';
    str += res ? '<div class="found">Number of matches found (from 1 to ' + main.numTo + ') = <span>' + res.length + '</span></div>' : '';
    str += timeUsed ? '<div class="time">Time(in ms) utilized to find matches = <span>' + timeUsed + '</span></div>' : '';
    str += res ? '<div class="matches">Matches : <ol>' + init.getResultList(res) + '</ol></div>' : '';

    $('#result').html(str);
};

// Initialize the scripts
init.init = function() {
    init.bindEvents();
};

// Start scripts on page load
$(document).ready(function() {
    init.init();
    util.init();
});
