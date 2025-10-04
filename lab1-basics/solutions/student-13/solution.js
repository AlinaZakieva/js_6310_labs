import chalk from "chalk";

// ===== ЗАДАНИЕ 1: Базовые операции =====
function simpleTask() {
    // 1.1 Объявите переменные разных типов (не менне 5)
    // 1.2 Выведите типы всех переменных
    let num = 115;
    let str = "Алина";
    let isActive = true; //булево значение
    let user = { name: "Алина", age: 50, isStudent: true}; //объекты
    let items = [1, 2, 3, 4, 5]; //массив
    let nothing = null; //намеренное отсутствие значения 
    let undef; //переменная без данных

    console.log("num:", typeof num);
    console.log("str:", typeof str);
    console.log("isActive:", typeof isActive);
    console.log("user:", typeof user);
    console.log("items:", typeof items);
    console.log("nothing:", typeof nothing);  
    console.log("undef:", typeof undef);
}

console.log(chalk.blue("\x1b[1mЗадание 1:\x1b[0m"));
simpleTask();
console.log();

// ===== ЗАДАНИЕ 2: Функции =====
function getReviewerNumber(number, lab) {
    // 2.1 Функция определяющая номер ревьюера для вашей группы по вашему номеру и номеру лабораторной работы
    const totalStudents = 23;

    // Проверка типа данных
    if (typeof number !== "number" || typeof lab !== "number") {
        return "Ошибка: неправильный тип данных";
        }

    // Проверка диапазона
    if (number < 1 || number > totalStudents) {
        return "Ошибка: номер студента должен быть от 1 до 23";
        }
    if (lab < 1) {
        return "Ошибка: номер лабораторной должен быть положительным";
        }

    let reviewer = (number + lab) % totalStudents;
        if (reviewer === 0) {
            reviewer = 1; 
        }

    return reviewer;
}

console.log(chalk.bold.blue("Задание 2.1:"));
console.log("Номер вашего ревьювера: ", getReviewerNumber(13, 1));
console.log();

function getVariant(number, variants) {
    // 2.2 Функция определяющая номер варианта, исходя из количества вариантов
    // Проверка типа
    if (typeof number !== "number" || typeof variants !== "number") {
        return "Ошибка: неправильный тип данных";
    }

    // Проверка диапазона
    if (number < 1) {
        return "Ошибка: номер студента должен быть больше 0";
    }
    if (variants < 1) {
        return "Ошибка: количество вариантов должно быть больше 0";
    }

    // Определяем номер варианта
    let variant = ((number - 1) % variants) + 1;
    return variant;
}

console.log(chalk.bold.blue("Задание 2.2:"));
console.log("Номер варианта: ",getVariant(13, 4));
console.log();

function calculate(a, b, operation) {
    // 2.3 Напишите функцию калькулятор, калькулятор обрабатывает следующие операции: +, -, *, /
        let c;

    // Проверка типа
    if (typeof a !== 'number' || typeof b !== 'number' || typeof operation !== 'string') {
        return 'Ошибка: неверный тип данных';
    }

    // Операции
    if (operation === "+") {
        c = a + b;
    } 
    else if (operation === "-") {
        c = a - b;
    } 
    else if (operation === "*") {
        c = a * b;
    } 
    else if (operation === "/") {
        if (b === 0) {
            return 'Ошибка: деление на ноль';
        } else {
            c = a / b;
        }
    } 
    else {
        return 'Ошибка: неверная операция';
    }

    // Проверка на переполнение
    if (!isFinite(c)) {
        return 'Ошибка: слишком большие данные';
    }

    return c;
}

console.log(chalk.bold.blue("Задание 2.3:"));
console.log("5 + 3 = ", calculate(5, 3, "+")); 
console.log("5 - 3 = ", calculate(5, 3, "-")); 
console.log("5 * 3 = ", calculate(5, 3, "*"));  
console.log("5 / 0 = ", calculate(5, 0, "/"));  
console.log("10 / 2 = ", calculate(10, 2, "/"));
console.log();

function calculateArea(figure, ...params) { // ... - позволяет принимать любое количество параметров 
    // 2.4 Напишите функцию для определения площади фигур 'circle', 'rectangle', 'triangle'
    // Используйте switch.
    
    // Проверка типа фигуры
    if (typeof figure !== "string") {
        return "Ошибка: название фигуры должно быть строкой";
    }

    // Проверка типов параметров
    for (const p of params) {
        if (typeof p !== "number") {
            return "Ошибка: все параметры должны быть числами";
        }
    }

    switch (figure) {
        case "circle":
            if (params.length !== 1) {
                return "Ошибка: у круга должен быть только 1 параметр (радиус)";
            } // Проверка количества параметров
            const r = params[0]; 
            if (r <= 0) {
                return "Ошибка: радиус должен быть больше 0";
            }
            return +(Math.PI * r ** 2).toFixed(2); // toFixed возвращает строку, + - превращает строку обратно в число 

        case "rectangle":
            if (params.length !== 2) {
                return "Ошибка: у прямоугольника должно быть 2 параметра";
            }
            const [a, b] = params;
            if (a <= 0 || b <= 0) {
                return "Ошибка: стороны прямоугольника должны быть больше 0";
            }
            return +(a * b).toFixed(2);

        case "triangle":
            if (params.length !== 3) {
                return "Ошибка: у треугольника должно быть 3 параметра";
            }
            const [x, y, z] = params;
            if (x <= 0 || y <= 0 || z <= 0) {
                return "Ошибка: стороны треугольника должны быть больше 0";
            }
            if (x + y <= z || x + z <= y || y + z <= x) {
                return "Ошибка: стороны не удовлетворяют условию существования треугольника";
            }
            const p = (x + y + z) / 2; // Полупериметр
            return +Math.sqrt(p * (p - x) * (p - y) * (p - z)).toFixed(2);

        default:
            return "Ошибка: неизвестная фигура. Доступны: circle, rectangle, triangle";
    }
}

console.log(chalk.bold.blue("Задание 2.4:"));
console.log("Площадь круга: ", calculateArea("circle", 5));        
console.log("Площадь прямоугольника: ", calculateArea("rectangle", 4, 6));  
console.log("Площадь треугольника: ", calculateArea("triangle", 3, 4, 5));
console.log("Площадь шестиугольника: ", calculateArea("hexagon", 3)); // Выведет ошибку
console.log();

// 2.5 Стрелочные функции
const reverseString = (str) => {
    // Функция возвращает перевернутую строку
    if (typeof str !== "string") {
        return "Ошибка: неправильный тип данных";
    }
    return str.split("").reverse().join("");
};

const getRandomNumber = (min, max) => {
    // Функция возвращает случайное число между min и max
    if (typeof min !== "number" || typeof max !== "number") {
        return "Ошибка: неправильный тип данных";
    }
    if (min > max) {
        return "Ошибка: min не может быть больше max";
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

console.log(chalk.bold.blue("Задание 2.5:"));
console.log("Перевернутая строка: ", reverseString("asdf"));
console.log("Случайное число между max и min: ", getRandomNumber(1, 10));
console.log();

// ===== ЗАДАНИЕ 3: Объекты =====
const book = {
    // 3.1 Создайте объект "книга" с полями для хранения заголовка, автора, 
    // года выпуска, количества страниц, и доступности
    // объект должен иметь два метода getInfo возвращает одной строкой информацию о названии книги, аторе, годе выпуска, количестве страниц
    // метод toggleAvailability - который меняет значение доступности и возвращает его

    title: "Гарри Поттер и Философский камень",
    author: "Дж. Роулинг",
    year: 1997,
    pages: 432,
    available: true,

    // Метод для вывода информации
    getInfo() {
        return `${this.title} — ${this.author}, ${this.year}, ${this.pages} стр.`; // ` - где ~
    },

    // Метод для смены доступности
    toggleAvailability() {
        this.available = !this.available; // this обращается к значениям выше
        return this.available;
    }
};

console.log(chalk.bold.blue("Задание 3.1:"));
console.log(book.getInfo());          
console.log("Текущий статус активности: ", book.toggleAvailability());
console.log();

const student = {
    name: "Анна Петрова",
    age: 20,
    course: 2,
    grades: {
        math: 90,
        programming: 95,
        history: 85
    },
    
    getAverageGrade() {
        const values = Object.values(this.grades);
        const sum = values.reduce((acc, grade) => acc + grade, 0);
        return Number((sum / values.length).toFixed(2));
    },
    
    addGrade(subject, grade) {
        if (typeof subject !== "string" || typeof grade !== "number") {
            return "Ошибка: неправильный тип данных";
        }
        this.grades[subject] = grade;
        return `Добавлен предмет "${subject}" с оценкой ${grade}`;
    }
};

console.log(chalk.bold.blue("Задание 3.2:"));
console.log("Средний балл студента: ", student.getAverageGrade()); 
console.log(student.addGrade("physics", 85)); 
console.log(student.grades);
console.log();

// ===== ЗАДАНИЕ 4: Массивы =====
console.log(chalk.bold.blue("Задание 4:"));
function processArrays() {
    const numbers = [12, 45, 23, 67, 34, 89, 56, 91, 27, 14];
    const words = ["JavaScript", "программирование", "массив", "функция", "объект"];
    const users = [
        { id: 1, name: "Анна", age: 25, isActive: true },
        { id: 2, name: "Борис", age: 30, isActive: false },
        { id: 3, name: "Виктория", age: 22, isActive: true },
        { id: 4, name: "Григорий", age: 35, isActive: true },
        { id: 5, name: "Дарья", age: 28, isActive: false }
    ];
    
    // 1. Используйте forEach для вывода всех чисел больше 50
    console.log("Числа больше 50:");
    numbers.forEach(function(number) {
        if (number > 50) {
            console.log(number);
        }
    });
    console.log();

    // 2. Используйте map для создания массива квадратов чисел
    /*const squares =  ваш код */
    const squares = numbers.map(number => number ** 2);
    console.log("Массив квадратов чисел: ",squares);
    console.log();

    // 3. Используйте filter для получения активных пользователей
    /*const activeUsers =  ваш код */
    const activeUsers = users.filter(user => user.isActive);
    console.log("Активные позователи: ",activeUsers);
    console.log();

    // 4. Используйте find для поиска пользователя с именем "Виктория"
    /*const victoria =  ваш код */
    const victoria = users.find(user => user.name === "Виктория");
    console.log("Поиск пользователя с именем Виктория: ",victoria);
    console.log();

    // 5. Используйте reduce для подсчета суммы всех чисел
    /*const sum =  ваш код */
    const sum = numbers.reduce((acc, current) => acc + current);
    console.log("Сумма всех чисел: ",sum);
    console.log();

    // 6. Используйте sort для сортировки пользователей по возрасту (по убыванию)
    /*const sortedByAge =  ваш код */
    const sortedByAge = users.sort((a, b) => b.age - a.age);
    console.log("Сортировка пользователей по возрасту: ",sortedByAge);
    console.log();

    // 7. Используйте метод для проверки, все ли пользователи старше 18 лет
    /*const allAdults =  ваш код */
    const allAdults = users.every(user => user.age > 18);
    console.log("Проверка: все ли пользователи старше 18: ",allAdults);
    console.log();

    // 8. Создайте цепочку методов: 
    //    - отфильтровать активных пользователей
    //    - преобразовать в массив имен
    //    - отсортировать по алфавиту
    /*const activeUserNames =  ваш код */
    const activeUserNames = users
        .filter(user => user.isActive)
        .map(user => user.name)
        .sort();
    console.log("Цепочка методов: ",activeUserNames);
}
processArrays();

// ===== ЗАДАНИЕ 5: Менеджер задач =====
const taskManager = {
    tasks: [
        { id: 1, title: "Изучить JavaScript", completed: false, priority: "high" },
        { id: 2, title: "Сделать лабораторную работу", completed: true, priority: "high" },
        { id: 3, title: "Прочитать книгу", completed: false, priority: "medium" }
    ],
    
    addTask(title, priority = "medium") {
        // 5.1 Добавление задачи
        const newtask = {
            id: this.tasks.length + 1, // id = следующий номер
            title,                     // название задачи
            completed: false,          // новая задача = невыполнена
            priority                   // приоритет
        };
        this.tasks.push(newtask);       // добавляем в список
        return this.tasks;
    },
    
    completeTask(taskId) {
        // 5.2 Отметка выполнения
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = true;
            return task;
        }
        return "такой задачи нет";
    },

    // Удаление задачи
    deleteTask(taskId) {
        // 5.3 Ваш код здесь
        const index = this.tasks.findIndex(task => task.id === taskId);
        if (index !== -1) {
            return this.tasks.splice(index, 1)[0];
        }
        return "такой задачи нет";
    },

    // Получение списка задач по статусу
    getTasksByStatus(completed) {
        // 5.4 Ваш код здесь
        return this.tasks.filter(task => task.completed === completed);
    },
    
    getStats() {
        /* 5.5 Статистика возвращает объект:        
        total,
        completed,
        pending,
        completionRate
        */
        const total = this.tasks.length;
        const completed = this.tasks.filter(task => task.completed).length;
        const pending = this.tasks.filter(task => !task.completed).length;
        const completionRate = (completed / total) * 100;
        return { total, completed, pending, completionRate };
    }
};

// ===== ЗАДАНИЕ 6: Регулярные выражения =====
/*
Дополнительные материалы:
https://regex101.com/ - интерактивный тестер regex
MDN Regular Expressions - https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Regular_expressions
Learn Regex - https://github.com/ziishaned/learn-regex - учебник по regex
Задание:
1. Изучите функции с регулярными выражениями по своему варианту
На защите вы должны суметь объяснить структуру регулярного выражения.
2. Напишите тесты, покрывающие все различные варианты. Обратите внимание тесты должны обеспечивать полное покрытие, но не быть дублирующимися.
3. Если предложенное регулярное выражение некорректно, вы можете исправить его.
 */
/**
 * Валидация email адреса
 * Правила:
 * - Латиница, цифры, спецсимволы: ._%+-
 * - Обязательный символ @
 * - Доменная часть: латиница, цифры, точка
 * - Минимальная длина 5 символов
 */
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/; // допускал двойные точки (исправила)
    return emailRegex.test(email);
}

/* ============ТЕСТИРОВАНИЕ============ */
function runTests() {
    console.log(chalk.yellow.bold("\n=== НАЧАЛО ТЕСТИРОВАНИЯ ==="));

    // 2.1
    console.log(chalk.cyan("\ngetReviewerNumber"));
    console.assert(getReviewerNumber(5, 1) === 6);
    console.assert(getReviewerNumber(23, 1) === 1);
    console.assert(getReviewerNumber("5", 1) === "Ошибка: неправильный тип данных");
    console.assert(getReviewerNumber(0, 1) === "Ошибка: номер студента должен быть от 1 до 23");
    console.assert(getReviewerNumber(5, -1) === "Ошибка: номер лабораторной должен быть положительным");

    // 2.2
    console.log(chalk.cyan("\ngetVariant"));
    console.assert(getVariant(13, 4) === 1);
    console.assert(getVariant(1, 4) === 1);
    console.assert(getVariant("13", 4) === "Ошибка: неправильный тип данных");
    console.assert(getVariant(0, 4) === "Ошибка: номер студента должен быть больше 0");
    console.assert(getVariant(5, 0) === "Ошибка: количество вариантов должно быть больше 0");

    // 2.3
    console.log(chalk.cyan("\ncalculate"));
    console.assert(calculate(5, 3, "+") === 8);
    console.assert(calculate(5, 3, "-") === 2);
    console.assert(calculate(5, 3, "*") === 15);
    console.assert(calculate(10, 2, "/") === 5);
    console.assert(calculate(5, 0, "/") === "Ошибка: деление на ноль");
    console.assert(calculate(5, 3, "^") === "Ошибка: неверная операция");
    console.assert(calculate("5", 3, "+") === "Ошибка: неверный тип данных");

    // 2.4
    console.log(chalk.cyan("\ncalculateArea"));
    console.assert(calculateArea("circle", 5) === 78.54);
    console.assert(calculateArea("rectangle", 4, 6) === 24);
    console.assert(calculateArea("triangle", 3, 4, 5) === 6);
    console.assert(calculateArea("circle", -1) === "Ошибка: радиус должен быть больше 0");
    console.assert(calculateArea("rectangle", 4) === "Ошибка: у прямоугольника должно быть 2 параметра");
    console.assert(calculateArea("hexagon", 3) === "Ошибка: неизвестная фигура. Доступны: circle, rectangle, triangle");

    // 2.5
    console.log(chalk.cyan("\nreverseString / getRandomNumber"));
    console.assert(reverseString("abc") === "cba");
    console.assert(reverseString(123) === "Ошибка: неправильный тип данных");
    const rnd = getRandomNumber(1, 5);
    console.assert(rnd >= 1 && rnd <= 5);
    console.assert(getRandomNumber("a", 5) === "Ошибка: неправильный тип данных");
    console.assert(getRandomNumber(10, 5) === "Ошибка: min не может быть больше max");

    // 3
    console.log(chalk.cyan("\nbook / student"));
    console.assert(book.getInfo().includes("Гарри Поттер и Философский камень"));
    const statusBefore = book.available;
    book.toggleAvailability();
    console.assert(book.available !== statusBefore);
    console.assert(student.addGrade("english", 88).includes("english"));

    // 5
    console.log(chalk.cyan("\ntaskManager"));
    const prevCount = taskManager.tasks.length;
    taskManager.addTask("Новая задача", "low");
    console.assert(taskManager.tasks.length === prevCount + 1);
    console.assert(taskManager.completeTask(1).completed === true);
    console.assert(taskManager.deleteTask(2).title === "Сделать лабораторную работу");
    console.assert(Array.isArray(taskManager.getTasksByStatus(false)));
    const stats = taskManager.getStats();
    console.assert(typeof stats.total === "number" && typeof stats.completionRate === "number");

    // 6
    console.log(chalk.cyan("\nvalidateEmail"));
    console.assert(validateEmail("test@example.com") === true);
    console.assert(validateEmail("user.name+tag@gmail.com") === true);
    console.assert(validateEmail("bademail.com") === false);
    console.assert(validateEmail("x@y") === false);
    console.assert(validateEmail("user@domain..com") === false);

    console.log(chalk.bold.yellow("\n=== ✅ ВСЕ ТЕСТЫ ВЫПОЛНЕНЫ ===\n"));
}
// Запуск тестов
runTests();