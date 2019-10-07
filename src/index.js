function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // let str = expr.replace(/\s/g, '').split();
    let str = expr.replace(/\s/g, '').split(/([\(,\),\/,*,+,-])/);
    str.forEach((el, i) => {
        if (el == '') {
            str.splice(i, 1);
        }
    });

    // let resultArr = [];
    // function getArr(arrStr) {
    //     let arr = [];
    //     // let resultArr = [];

    //     var bracketOpen;
    //     var bracketClose;

    //     arrStr.forEach(elem => {
    //         bracketOpen = elem.indexOf('(');
    //         bracketClose = elem.indexOf(')');

    //         if(bracketOpen !== -1 && bracketClose !== -1) {
    //             arr = elem.split(/\((.*)\)/);
    //             arr.forEach((el, i) => {
    //                 if (el == '') {
    //                     arr.splice(i, 1);
    //                 }
    //             });
    //             getArr(arr);
    //         } else if(bracketOpen === -1 && bracketClose === -1) {
    //             resultArr.push(elem);
    //         } else {
    //             // error
    //         }
    //     });
        
    //     return resultArr;
    // }

    // function count(arrStr) {

    //     function countMathOperations(el, start, end) {
    //         for (let i = start; i < end; i++) {
    //             switch (el[i]) {
    //                 case "*":
    //                     el.splice(i - 1, 3, Number(el[i - 1]) * Number(el[i + 1]));
    //                     i = i - 2;
    //                     end -= 2;
    //                     break;
    //                 case '/':
    //                     el.splice(i - 1, 3, Number(el[i - 1], 10) / Number(el[i + 1], 10));
    //                     i = i - 2;
    //                     end -= 2;
    //                     break;
    //                 default:
    //                     break;
    //             }
    //         }
    //         for (let i = start; i < end; i++) {
    //             switch (el[i]) {
    //                 case "+":
    //                     el.splice(i - 1, 3, Number(el[i - 1]) + Number(el[i + 1]));
    //                     i = i - 2;
    //                     end -= 2;
    //                     break;
    //                 case '-':
    //                     if (i === 0) {
    //                         el.splice(i, 2, (- Number(el[i + 1])));
    //                         i = i - 1;
    //                         end -= 1;
    //                     } else {
    //                         el.splice(i - 1, 3, Number(el[i - 1]) - Number(el[i + 1]));
    //                         i = i - 2;
    //                         end -= 2;
    //                     }
    //                     break;
    //                 default:
    //                     break;
    //             }
    //         }
    //     }

    //     let resultArr = [];
    //     let arr = [];

    //     arrStr.forEach(elem => {
    //         resultArr = elem.split(/(\d{1,})/);
    //         resultArr.forEach((el, i) => {
    //             if (el == '') {
    //                 resultArr.splice(i, 1);
    //             }
    //         });
    //         arr.push(resultArr);
    //     });

    //     arr.forEach((el) => {
    //         if (el.length > 2) {
    //             countMathOperations(el, 1, el.length - 1);
    //         }
    //     });

    //     resultArr = [];
    //     arr.forEach(el => {
    //         el.forEach(el => {
    //             resultArr.push(el);
    //         });
    //     });

    //     countMathOperations(resultArr, 0, resultArr.length);

    //     return resultArr[0];
    // }

    function count(arrStr) {
        if (arrStr[0] === '(') {
            arrStr.shift();
            arrStr.pop();
        }
        for (let i = 0; i < arrStr.length; i++) {
            switch (arrStr[i]) {
                case "*":
                    arrStr.splice(i - 1, 3, Number(arrStr[i - 1]) * Number(arrStr[i + 1]));
                    i = i - 2;
                    break;
                case '/':
                    if (arrStr[i + 1] == 0) {
                        throw "TypeError: Division by zero.";
                    } else {
                        arrStr.splice(i - 1, 3, Number(arrStr[i - 1], 10) / Number(arrStr[i + 1], 10));
                        i = i - 2;
                    }
                    break;
                default:
                    break;
            }
        }
        for (let i = 0; i < arrStr.length; i++) {
            switch (arrStr[i]) {
                case "+":
                    arrStr.splice(i - 1, 3, Number(arrStr[i - 1]) + Number(arrStr[i + 1]));
                    i = i - 2;
                    break;
                case '-':
                    if (i === 0) {
                        arrStr.splice(i, 2, (- Number(arrStr[i + 1])));
                        i = i - 1;
                    } else {
                        arrStr.splice(i - 1, 3, Number(arrStr[i - 1]) - Number(arrStr[i + 1]));
                        i = i - 2;
                    }
                    break;
                default:
                    break;
            }
        }

        return arrStr[0];
    }

    function getResult(arrStr) {
        let substring = [];
        let arrBrackets = [];
        let resultArr = [];

        for (let i = 0; i < arrStr.length; i++) {
            if (arrStr[i] === '(') {
                arrBrackets.unshift(i);
            } else if (arrStr[i] === ')') {
                if (arrBrackets.length === 0) {
                    throw "ExpressionError: Brackets must be paired";
                } else {
                    substring = arrStr.slice(arrBrackets[0], i + 1);
                    i = i + 1 - substring.length;
                    arrStr.splice(arrBrackets[0], substring.length, count(substring));
                    arrBrackets.shift();
                }
            }
        }
        if (arrBrackets.length > 0) {
            throw "ExpressionError: Brackets must be paired";
        }
        if (arrStr.length > 1) {
            count(arrStr);
        }

        return arrStr[0];
    }
    
    return getResult(str);
}

module.exports = {
    expressionCalculator
}