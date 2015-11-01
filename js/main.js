var main = main || {
	sumToCheck : '8',
	results : {},
	numTo : 0,
	lastIndexParticipated : -1
};

// Check the sum of digits : Method 2 | Recursive
function checkSumRecursively(num, startIndex, endIndex, arrResults) {
	if(startIndex >= num.length || endIndex >= num.length){
		//console.log(arrResults);
		main.results = arrResults;
		return false;
	}

	var substr = util.getSubString(num, startIndex, endIndex);
	var sumOfSubstr = util.getSum(substr);
	//console.log('sumOfSubstr('+substr+')='+sumOfSubstr);

	if( sumOfSubstr < main.sumToCheck ){
		//console.log('keep startIndex, endIndex++, keep sum & call checkSumRecursively()');

		endIndex = endIndex+1;
		checkSumRecursively(num, startIndex, endIndex, arrResults);
	} else if( sumOfSubstr > main.sumToCheck ) {
		//console.log('startIndex++, reset endIndex to startIndex, reset sum to 0 & call checkSumRecursively()');

		startIndex = startIndex+1;
		endIndex = startIndex;
		sumOfSubstr = 0;
		checkSumRecursively(num, startIndex, endIndex, arrResults);
	} else {
		//console.log('PUSH "'+ substr +'" to arrResults.');
		main.pushToArray(num,arrResults,substr,startIndex,endIndex);
		//console.log(arrResults);

		//console.log('startIndex++, reset endIndex to startIndex, reset sum to 0 & call checkSumRecursively()');
		startIndex = startIndex+1;
		endIndex = startIndex;
		sumOfSubstr = 0;
		checkSumRecursively(num, startIndex, endIndex, arrResults);
	}
}

// Method 3 : Using Higher Order Functions
main.method3 = function(num){
	var startIndex=0,
		endIndex=0;
  var arrResults = [];

	arrResults = num
		.split('')
		//.map(function(e) {return +e;})
		// .reduce((previousValue, currentValue, index, array)=>{
		// 	var retVal = previousValue + currentValue;
		// 	//console.log('hello', retVal, previousValue, currentValue, index);
		//
		// 	// get sum of the substring
		// 	var sum = retVal
		// 		.split('')
		// 		//.map(function(e) {return +e;})
		// 		.reduce((a,b,c,d)=>{
		// 			console.log('sum', a,b,c,d);
		// 			return a+b;
		// 		}, []);
		//
		// 	console.log(sum);
		//
		// 	return retVal;
		//
		// 	if(sum == 8) {
		// 		return retVal;
		// 	} else {
		// 		return previousValue;
		// 	}
		//
		// }, []);

	//console.log(arrResults);
	return arrResults || [];
};

// Method 2 : Using Recursion
main.method2 = function(num){
	var startIndex=0,
		endIndex=0;
  var arrResults = [];

	checkSumRecursively(num, startIndex, endIndex, arrResults);
	//console.log(arrResults);
	return main.results;
};

// Method 1 : Using for loop
main.method1 = function(num){
  var arrResults = [],
	indexParticipated = [];

	for(var startIndex = 0; startIndex < num.length; startIndex++) {
    for(var endIndex = startIndex; endIndex < num.length; endIndex++){
      var substr = util.getSubString(num, startIndex, endIndex),
				sum = util.getSum(substr);

				//console.log(num, startIndex, endIndex, 'Sum('+substr+')='+sum);

				if(sum == main.sumToCheck){
					indexParticipated.pushFromTo(startIndex, endIndex);
				}
		}
	}

	if(indexParticipated.length === num.length){
		//console.log('SUCCESSFUL CANDIDATE', num);
		arrResults.push(num);
	}

	return arrResults;
};

main.pushToArray=function(num, arrResults,substr,startIndex,endIndex){
	arrResults.push({
		num : num,
		substr : substr,
		startIndex : startIndex,
		endIndex : endIndex
	});
	//console.log(arrResults);
};

// Start the search process
main.search = function(num){
  var arrResults = [];
  //console.log('Length('+ num +')='+ num.length +'.');
	var selectedMethod = 4 || $('input[name="method"]:checked').val();

	switch (selectedMethod) {
		case '1':
			arrResults = main.method1(num);
			break;
		case '2':
			arrResults = main.method2(num);
			break;
		case '3':
			arrResults = main.method3(num);
			break;
		case '4':
			arrResults = main.method4(num);
			break;
		default:
			arrResults = main.method1(num);
			break;
	}

	//console.log(arrResults);
	return arrResults || 0;
};

main.iterateToExp = function(exp) {
	main.numTo = Math.pow(10, exp);
	var arrResults=[];
	var has9 = /^[9]+$/g;

	for (var i = 1; i <= main.numTo; i++) {

		if(i.toString().indexOf(9) == -1){

			var isMatch = main.search(i.toString());
			if(isMatch.length>0){
				arrResults.push(i);
			}
		}
	}
	return arrResults;
};
