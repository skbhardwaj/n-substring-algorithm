var init = init || {};

// Bind events
init.bindEvents = function() {

    $('#btn').on('click', function(e) {
        console.clear();

        // $('#result').html(function(){
        //   return $(this).data('text');
        // });

        main.sumToCheck = '8' || $('#n').val();
        main.exponent = $('#exp').val() || '2';
        var strToSearch = $('#txt').val() || '3521148';

        var timeUsed = util.testPerformance(function() { // testPerformance OR testTime(if console is opened)
            //res = main.search(strToSearch);
            res = main.iterateToExp(main.exponent);
        });

        console.log(timeUsed, res.length, res);
        init.setResults(res, strToSearch, timeUsed);
    });

    $('#clear').on('click', function(e) {
        console.clear();
        $('#result').html(function() {
            return $(this).data('text');
        });
        // $('#n').val(function(){
        //   return $(this).data('text');
        // });
        $('#exp').val(function() {
            return $(this).data('text');
        });
        //$('#txt').val('').focus();
    });
};

// Get result list
init.getResultList = function(res) {
    var li = '';
    for (var i = 0; i < res.length; i++) {
        //console.log(res[i].num +"-"+ res[i].substr +"-"+ res[i].startIndex +"-"+ res[i].endIndex);

        //var replaceWith = '<span>'+res[i].substr+'</span>'; // ''; //
        //li += '<li>'+res[i].num.replaceBetween(res[i].startIndex, res[i].endIndex, replaceWith)+'</li>';
        li += '<li>' + res[i] + '</li>';
    }
    //console.log(li);
    return li;
};

// Set the results in DOM
init.setResults = function(res, strToSearch, timeUsed) {
    //console.log(res);
    var str = '';
    //str += '<div class="number">The entered number = <span>'+strToSearch+'</span></div>';
    //str += '<div class="length">Length of number = <span>'+strToSearch.length+'</span></div>';
    str += res ? '<div class="found">The entered exponent = <span>' + main.exponent + '</span></div>' : '';
    str += res ? '<div class="found">Number of matches found (from 1 to ' + main.numTo + ') = <span>' + res.length + '</span></div>' : '';
    str += timeUsed ? '<div class="time">Time(in millisec.) utilized to find matches = <span>' + timeUsed + '</span></div>' : '';
    //str += res ? '<div class="matches">Matches : <ol>'+init.getResultList(res)+'</ol></div>' : '';

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
