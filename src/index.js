module.exports = function solveSudoku(matrix) {
    let m = copyArray(matrix); // копируем массив
    for (let x = 0; x >= 0 && x < 9; x++) {
        for (let y = 0; y >= 0 && y < 9; y++) {
            // console.log(`Обрабатываем ячейку ${x}.${y}, текущее значение m = ${m[x][y]}, matrix = ${matrix[x][y]}`);
            if (matrix[x][y] == 0) {
                for (let i = m[x][y] + 1; i < 10; i++) {
                    // console.log(`Пытаемся вставить число ${i} в ${x}.${y}`);
                    if (canIUse(x, y, i)) {
                        m[x][y] = i;
                        // console.log(`Ставим значение ${i} в ${x}.${y}`);
                        break;
                    }
                    if (i == 9) {
                        do {
                            if (matrix[x][y] == 0) {
                                m[x][y] = 0;
                            }
                            if (y > 0 && x >= 0) {
                                // console.log(`y -= 1;`);
                                y -= 1;
                            } else if (x > 0 && y == 0) {
                                x -= 1;
                                y = 8;
                            }
                            if (x == 0 && y == 0 && m[x][y] == 9) {
                                // console.log(`x < 0, нерешаемо`);
                                return false;
                            }
                        } while (matrix[x][y] != 0 || m[x][y] == 9);

                        // console.log(`Возвращаемся назад на ${x}.${y}, никакое число не подошло`);
                        y -= 1; // отнимаем еще y, поскольку при начале цикла y++
                    }
                }
            }
        }
    }
    // возвращаем решение
    return m;

    function canIUse(x, y, i) {
        // проверяем числа по горизонтали
        for (let a = 0; a < 9; a++) {
            if (m[x][a] == i) {
                return false;
            }
        }
        // проверяем числа по вертикали
        for (let b = 0; b < 9; b++) {
            if (m[b][y] == i) {
                return false;
            }
        }
        // проверяем, в каком квадрате находятся текущее значение
        // левый верхний
        if (x < 3 && y < 3) {
            for (let a = 0; a < 3; a++) {
                for (let b = 0; b < 3; b++) {
                    if (m[a][b] == i) {
                        return false;
                    }
                }
            }
            // средний верхний
        } else if (x < 3 && y >= 3 && y < 6) {
            for (let a = 0; a < 3; a++) {
                for (let b = 3; b < 6; b++) {
                    if (m[a][b] == i) {
                        return false;
                    }
                }
            }
            // правый верхний
        } else if (x < 3 && y >= 6) {
            for (let a = 0; a < 3; a++) {
                for (let b = 6; b < 9; b++) {
                    if (m[a][b] == i) {
                        return false;
                    }
                }
            }
            // левый средний
        } else if (x >= 3 && x < 6 && y < 3) {
            for (let a = 3; a < 6; a++) {
                for (let b = 0; b < 3; b++) {
                    if (m[a][b] == i) {
                        return false;
                    }
                }
            }
            // центральный
        } else if (x >= 3 && x < 6 && y >= 3 && y < 6) {
            for (let a = 3; a < 6; a++) {
                for (let b = 3; b < 6; b++) {
                    if (m[a][b] == i) {
                        return false;
                    }
                }
            }
            // правый средний
        } else if (x >= 3 && x < 6 && y >= 6) {
            for (let a = 3; a < 6; a++) {
                for (let b = 6; b < 9; b++) {
                    if (m[a][b] == i) {
                        return false;
                    }
                }
            }
            // левывй нижний
        } else if (x >= 6 && y < 3) {
            for (let a = 6; a < 9; a++) {
                for (let b = 0; b < 3; b++) {
                    if (m[a][b] == i) {
                        return false;
                    }
                }
            }
            // средний нижний
        } else if (x >= 6 && y >= 3 && y < 6) {
            for (let a = 6; a < 9; a++) {
                for (let b = 3; b < 6; b++) {
                    if (m[a][b] == i) {
                        return false;
                    }
                }
            }
            // правый нижний
        } else if (x >= 6 && y >= 6) {
            for (let a = 6; a < 9; a++) {
                for (let b = 6; b < 9; b++) {
                    if (m[a][b] == i) {
                        return false;
                    }
                }
            }
        }
        // если нигде нет повторяющихся значений, возвращаем true
        return true;
    }

    // функция для копирования массивов любой вложенности (рекурсия)
    function copyArray(mainArr) {
        const tempArr = [];
        for (let key in mainArr) {
            if (typeof(mainArr[key]) === 'object') {
                tempArr[key] = copyArray(mainArr[key]);
            } else {
                tempArr[key] = mainArr[key];
            }
        }
        return tempArr;
    }
};