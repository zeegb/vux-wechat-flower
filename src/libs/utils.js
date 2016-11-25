/**
 * Created by wangze on 2016/11/25.
 */
export const haveSame = (arr1, arr2) => {
  var arr3 = []
  for (var s in arr1) {
    for (var x in arr2) {
      if (arr1[s] === arr2[x]) {
        arr3.push(arr1[s])
      }
    }
  }
  if (arr3.length > 0) return true
}
