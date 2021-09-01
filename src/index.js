module.exports = function solveSudoku(matrix) {
  const emptyArr = [];
  const newMatrix = matrix;
  let resolved = false;

  function findEmpty(matrix) {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === 0) {
          emptyArr.push([i, j]);
        }
      }
    }
  }

  function checkBoxValues(rowNum, colNum, testNum) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (matrix[(3 * Math.floor(rowNum / 3)) + i][(3 * Math.floor(colNum / 3)) + j] === testNum) {
          return true;
        }
      }
    }
    return false;
  }

  function testCell(testNum, rowNum, colNum) {
    for (let i = 0; i < matrix.length; i++) {
      if ((matrix[rowNum][i] === testNum && colNum !== i) || (matrix[i][colNum] === testNum && rowNum !== i) || checkBoxValues(rowNum, colNum, testNum)) {
        return false;
      }
    }
    return true;
  }

  findEmpty(matrix);

  for (let i = 0; i < emptyArr.length; i++) {
    for (let testNum = 1; testNum < 10; testNum++) {
      if (testCell(testNum, emptyArr[i][0], emptyArr[i][1])) {
        newMatrix[emptyArr[i][0]][emptyArr[i][1]] = testNum;
        if (solveSudoku(newMatrix) !== false || undefined) {
          resolved = true;
          break;
        };
      }
    }
    if (resolved) break;
    newMatrix[emptyArr[i][0]][emptyArr[i][1]] = 0;
    return false;
  }

  return newMatrix;
}
