class AlgoCollection {
  palindromeChecker(str) {
    let getRidOf = /[\W_]/
    let forwardArr = str
      .toLowerCase()
      .split("")
      .filter((n) => !getRidOf.test(n))
    let backwardArr = forwardArr.slice().reverse()
    return forwardArr.join("") === backwardArr.join("")
  }

  convertToRoman(num) {
    let romTable = {
      0: [],
      1: ["I", "X", "C", "M"],
      2: ["II", "XX", "CC", "MM"],
      3: ["III", "XXX", "CCC", "MMM"],
      4: ["IV", "XL", "CD"],
      5: ["V", "L", "D"],
      6: ["VI", "LX", "DC"],
      7: ["VII", "LXX", "DCC"],
      8: ["VIII", "LXXX", "DCCC"],
      9: ["IX", "XC", "CM"],
    }
    if (num > 0 && num <= 3999) {
      return num
        .toString()
        .split("")
        .reverse()
        .map((num, ind) => romTable[num][ind])
        .reverse()
        .join("")
    } else return "Not within Roman range, try a number between 0 and 3999"
  }
}

console.log(AlgoCollection.palindromeChecker("race car"))
console.log(AlgoCollection.palindromeChecker("race boat"))
console.log(AlgoCollection.convertToRoman(3999))
console.log(AlgoCollection.convertToRoman(4999))
console.log(AlgoCollection.convertToRoman(346))
