class AlgoCollection {
  palindromeChecker(str) {
    let getRidOf = /[\W_]/
    let forwardArr = str
      .toLowerCase()
      .split('')
      .filter((n) => !getRidOf.test(n))
    let backwardArr = forwardArr.slice().reverse()
    return forwardArr.join('') === backwardArr.join('')
  }

  convertToRoman(num) {
    let romTable = {
      0: [],
      1: ['I', 'X', 'C', 'M'],
      2: ['II', 'XX', 'CC', 'MM'],
      3: ['III', 'XXX', 'CCC', 'MMM'],
      4: ['IV', 'XL', 'CD'],
      5: ['V', 'L', 'D'],
      6: ['VI', 'LX', 'DC'],
      7: ['VII', 'LXX', 'DCC'],
      8: ['VIII', 'LXXX', 'DCCC'],
      9: ['IX', 'XC', 'CM']
    }
    if (num > 0 && num <= 3999) {
      return num
        .toString()
        .split('')
        .reverse()
        .map((num, ind) => romTable[num][ind])
        .reverse()
        .join('')
    } else return 'Not within Roman range, try a number between 0 and 3999'
  }

  caesarsCipher(str) {
    return str
      .split('')
      .map((item) => item.charCodeAt())
      .map((item) => {
        if (item >= 65 && item <= 77) {
          return item + 13
        } else if (item > 77) {
          return item - 13
        } else return item
      })
      .map((item) => String.fromCharCode(item))
      .join('')
  }

  validatePhoneNumber(str) {
    let myReg = /^1?\s?-?([(]\d{3}[)]|\d{3})-?\s?\d{3}-?\s?\d{4}$/
    return myReg.test(str)
  }

  checkCashRegister(price, cash, cid) {
    let value = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1]
    let total = cid
      .slice()
      .reverse()
      .map((arr) => Math.round(arr[1] * 100))
    let amtDue = Math.round((cash - price) * 100)
    let totalCID = cid.reduce((acc, arr) => acc + arr[1] * 100, 0)
    let open = { status: 'OPEN', change: [] }
    let pushArr = [
      ['ONE HUNDRED'],
      ['TWENTY'],
      ['TEN'],
      ['FIVE'],
      ['ONE'],
      ['QUARTER'],
      ['DIME'],
      ['NICKEL'],
      ['PENNY']
    ]

    if (amtDue > totalCID) {
      return { status: 'INSUFFICIENT_FUNDS', change: [] }
    } else if (amtDue === totalCID) {
      return { status: 'CLOSED', change: [...cid] }
    } else {
      total.reduce((acc, val, ind) => {
        if (value[ind] > acc) {
          pushArr[ind].push(0)
          return acc
        } else if (value[ind] <= acc && val <= acc) {
          pushArr[ind].push(val / 100)
          return acc - val
        } else {
          pushArr[ind].push((Math.floor(acc / value[ind]) * value[ind]) / 100)
          return acc - Math.floor(acc / value[ind]) * value[ind]
        }
      }, amtDue)
      if (amtDue === Math.round(pushArr.reduce((acc, arr) => acc + arr[1] * 100, 0))) {
        open.change = pushArr.filter((arr) => arr[1] !== 0)
        return open
      } else return { status: 'INSUFFICIENT_FUNDS', change: [] }
    }
  }

  toRainLanguage(num) {
    let statement = ''

    if (num % 3 === 0) statement += 'Pling'
    if (num % 5 === 0) statement += 'Plang'
    if (num % 7 === 0) statement += 'Plong'

    if (statement) {
      return statement
    } else return num
  }

  isogramChecker(str) {
    const setStr = [...new Set(str.toLowerCase().split(''))].join('')

    return setStr === str.toLowerCase()
  }

  leapYearChecker(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
  }

  encode(str) {
    let counts = []
    let count = 1

    for (let i = 0; i < str.length; i++) {
      if (str[i] === str[i + 1]) {
        count += 1
      } else {
        counts.push(count)
        count = 1
      }
    }
    const strSet = [...new Set(str)]
    return counts
      .reduce((acc, curr, ind) => {
        acc.push(curr)
        acc.push(strSet[ind])
        return acc
      }, [])
      .join('')
  }

  decode(str) {
    const strArr = str.split('')
    let decodedArr = []

    for (let i = 0; i < str.length; i += 2) {
      for (let j = 0; j < parseInt(strArr[i]); j++) {
        decodedArr.push(strArr[i + 1])
      }
    }
    return decodedArr.join('')
  }

  reduceDuplicates(arr) {
    return arr.reduce((acc, curr, ind) => {
      if (!acc.includes(curr)) {
        return [...acc, curr]
      } else return acc
    }, [])
  }

  reduceMap(arr, fn) {
    return arr.reduce((acc, curr) => {
      return [...acc, fn(curr)]
    }, [])
  }

  reduceFlattener(arr) {
    const flatBish = arr.reduce((acc, curr) => {
      if (typeof curr === 'object') {
        return [...acc, ...curr]
      } else return [...acc, curr]
    }, [])

    const isFlat = flatBish.reduce((i, c) => {
      return typeof c !== 'object'
    })

    if (isFlat) {
      return flatBish
    } else {
      return reduceFlattener(flatBish)
    }
  }

  transposeMatrix(arr) {
    return arr.map((item, index) => {
      let newArr = []
      item.map((num, ind) => {
        return newArr.push(item[index])
      })
      return newArr
    })
  }
}

const logger = new AlgoCollection()

console.log(logger.palindromeChecker('race car'))
console.log(logger.palindromeChecker('race boat'))
console.log(logger.convertToRoman(3999))
console.log(logger.convertToRoman(4999))
console.log(logger.convertToRoman(346))
console.log(logger.caesarsCipher('SERR CVMMN!'))
console.log(logger.validatePhoneNumber('1 555-555-5555')) //should return true.
console.log(logger.validatePhoneNumber('555-5555')) //should return false.
console.log(
  logger.checkCashRegister(19.5, 20, [
    ['PENNY', 0.5],
    ['NICKEL', 0],
    ['DIME', 0],
    ['QUARTER', 0],
    ['ONE', 0],
    ['FIVE', 0],
    ['TEN', 0],
    ['TWENTY', 0],
    ['ONE HUNDRED', 0]
  ])
)
console.log(logger.toRainLanguage(105))
console.log(logger.toRainLanguage(106))
console.log(logger.isogramChecker('ambiDextRouSlY'))
console.log(logger.isogramChecker('paTtErn'))
console.log(logger.leapYearChecker(2020)) // true
console.log(logger.leapYearChecker(2018)) // false
console.log(logger.leapYearChecker(1700)) // false
console.log(logger.leapYearChecker(1600)) // true
console.log(logger.encode('wwwiiuuuu')) // 3w2i4u
console.log(logger.decode('2u3a4o')) // uuaaoooo
console.log(logger.reduceDuplicates(['one', 'two', 'one', 'three', 'three', 'two']))
console.log(logger.reduceMap([1, 2, 3], (v) => v + 1))
console.log(logger.reduceFlattener(['one', ['two', 'three'], ['four', ['five']]]))
console.log(
  logger.transposeMatrix([
    [1, 2, 3],
    [1, 2, 3],
    [1, 2, 3]
  ])
)

// console.log(logger.validatePhoneNumber("1 (555) 555-5555"))         //should return true.
// console.log(logger.validatePhoneNumber("5555555555"))               //should return true.
// console.log(logger.validatePhoneNumber("555-555-5555"))             //should return true.
// console.log(logger.validatePhoneNumber("(555)555-5555"))            //should return true.
// console.log(logger.validatePhoneNumber("1(555)555-5555"))           //should return true.
// console.log(logger.validatePhoneNumber("5555555"))                  //should return false.
// console.log(logger.validatePhoneNumber("1 555)555-5555"))           //should return false.
// console.log(logger.validatePhoneNumber("1 555 555 5555"))  //should return true.
// console.log(logger.validatePhoneNumber("1 456 789 4444"))           //should return true.
// console.log(logger.validatePhoneNumber("123**&!!asdf#"))   //should return false.
// console.log(logger.validatePhoneNumber("55555555"))                 //should return false.
// console.log(logger.validatePhoneNumber("(6054756961)"))             //should return false.
// console.log(logger.validatePhoneNumber("2 (757) 622-7382"))         //should return false.
// console.log(logger.validatePhoneNumber("0 (757) 622-7382"))         //should return false.
// console.log(logger.validatePhoneNumber("-1 (757) 622-7382"))        //should return false.
// console.log(logger.validatePhoneNumber("2 757 622-7382"))           //should return false.
// console.log(logger.validatePhoneNumber("10 (757) 622-7382"))        //should return false.
// console.log(logger.validatePhoneNumber("27576227382"))              //should return false.
// console.log(logger.validatePhoneNumber("(275)76227382"))            //should return false.
// console.log(logger.validatePhoneNumber("2(757)6227382"))            //should return false.
// console.log(logger.validatePhoneNumber("2(757)622-7382"))           //should return false.
// console.log(logger.validatePhoneNumber("555)-555-5555"))            //should return false.
// console.log(logger.validatePhoneNumber("(555-555-5555"))            //should return false.
// console.log(logger.validatePhoneNumber("(555)5(55?)-5555"))         //should return false.
// console.log(logger.validatePhoneNumber("55 55-55-555-5"))           //should return false.
// console.log(logger.validatePhoneNumber("11 555-555-5555"))          //should return false.
