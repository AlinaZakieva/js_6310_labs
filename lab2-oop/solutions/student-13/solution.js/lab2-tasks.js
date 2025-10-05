'use strict'
import chalk from "chalk";

// ===== ЗАДАНИЕ 1: Базовый класс Vehicle =====
class Vehicle {
    // Создайте базовый класс Vehicle.
    // В конструкторе принимайте и сохраняйте в this свойства: 
    // make (марка), model (модель), year (год выпуска).
    static vehicleCount = 0;

    constructor(make, model, year) {
        Vehicle.vehicleCount++; // при каждом создании нового объекта увеличиваем счетчик

        // проверка данных
        if (typeof make !== "string" || make.trim() === "") {
            throw new Error("Марка должна быть не пустой строкой!");
        }
        if (typeof model !== "string" || model.trim() === "") {
            throw new Error("Модель должна быть не пустой строкой!");
        }
        if (typeof year !== "number" || !Number.isInteger(year)) {
            throw new Error("Год выпуска должен быть числом!");
        }

        this.make = make;   // марка
        this.model = model; // модель
        this.year = year;   // год выпуска
    }

    // Добавьте метод displayInfo(), который выводит в консоль информацию 
    // о транспортном средстве в формате: "Марка: [make], Модель: [model], Год: [year]".
    displayInfo() {
        console.log(chalk.magenta(`Марка: ${this.make}\nМодель: ${this.model}\nГод: ${this.year}`));
    }

    // Добавьте геттер age, который возвращает возраст транспортного средства 
    // (текущий год минус год выпуска). Используйте new Date().getFullYear().
    get age() {
        const currentYear = new Date().getFullYear(); // берем текущий год из системы
        return currentYear - this.year; // возвращаем разницу
    }

    // Добавьте сеттер для года выпуска с проверкой: год не может быть больше текущего.
    set year(newYear) {
        const currentYear = new Date().getFullYear();
        if (typeof newYear !== "number" || !Number.isInteger(newYear)) {
            console.log("Ошибка: год должен быть числом!");
            return;
        }
        if (newYear > currentYear) {
            console.log("Ошибка: год выпуска не может быть больше текущего!");
        } else {
            this._year = newYear;
        }
    }

    get year() {
        return this._year;
    }

    // Добавьте статический метод compareAge(vehicle1, vehicle2), 
    // который возвращает разницу в возрасте между двумя транспортными средствами.
    static compareAge(vehicle1, vehicle2) {
        if (!(vehicle1 instanceof Vehicle) || !(vehicle2 instanceof Vehicle)) {
            throw new Error("Сравнивать можно только объекты Vehicle!");
        }
        return vehicle1.age - vehicle2.age;
    }

    // статический метод для получения общего числа созданных транспортных средств
    static getTotalVehicles() {
        return Vehicle.vehicleCount;
    }
}

console.log(chalk.bgYellow("Задание 1:"));
console.log();

// создаем два объекта 
const car1 = new Vehicle("Toyota", "Camry", 2015);
const car2 = new Vehicle("BMW", "X5", 2020);

// выводим информацию о машинах
car1.displayInfo(); 
console.log();
car2.displayInfo(); 
console.log();

// узнаем возраст
console.log(chalk.magenta(`Возраст ${car1.make}: ${car1.age} лет`));
console.log(chalk.magenta(`Возраст ${car2.make}: ${car2.age} лет`));
console.log();

// сравниваем возраст
const diff = Vehicle.compareAge(car1, car2);
console.log(chalk.magenta(`Разница в возрасте: ${diff} лет`));
console.log();

// ===== ЗАДАНИЕ 2: Класс Car (наследуется от Vehicle) =====
class Car extends Vehicle {
    // Создайте дочерний класс Car, который наследуется от Vehicle.
    // Добавьте новое свойство numDoors (количество дверей).
    constructor(make, model, year, numDoors) {
        super(make, model, year); // super вызывает конструктор родителя (Vehicle)

        // проверка количества дверей 
        if (typeof numDoors !== "number" || !Number.isInteger(numDoors) || numDoors <= 0) {
            throw new Error("Количество дверей (numDoors) должно быть положительным целым числом!");
        }

        this.numDoors = numDoors; // сохраняем количество дверей
    }

    // Переопределите метод displayInfo() так, чтобы он также выводил количество дверей. 
    // Используйте super.displayInfo() для вызова метода родителя.
    displayInfo() {
        super.displayInfo(); // покажет марку, модель и год
        console.log(chalk.magenta(`Количество дверей: ${this.numDoors}`));
    }

    // Добавьте метод honk(), который выводит "Beep beep!".
    honk() {
        console.log(chalk.magenta("Beep beep!"));
    }
}

console.log(chalk.bgYellow("Задание 2:"));
console.log();
// создаем объект Car
const myCar = new Car("Honda", "Civic", 2018, 4);
// выводим инфу
myCar.displayInfo();
// гудок
myCar.honk(); 
console.log();

// ===== ЗАДАНИЕ 3: Класс ElectricCar (наследуется от Car) =====
class ElectricCar extends Car {
    // Создайте дочерний класс ElectricCar, который наследуется от Car.
    // Добавьте новое свойство batteryCapacity (емкость батареи в кВт·ч).
    constructor(make, model, year, numDoors, batteryCapacity) {
        super(make, model, year, numDoors); // передаем данные Car

        // проверка батареи
        if (typeof batteryCapacity !== "number" || batteryCapacity <= 0) {
            throw new Error("Емкость батареи должна быть положительным числом!");
        }

        this.batteryCapacity = batteryCapacity; // емкость батареи
    }

    // Переопределите метод displayInfo() для вывода дополнительной информации о батарее.
    displayInfo() {
        super.displayInfo(); // выводит все, что есть у Car
        console.log(chalk.magenta(`Ёмкость батареи: ${this.batteryCapacity} кВт·ч`));
    }

    // Добавьте метод calculateRange(), который рассчитывает примерный запас хода 
    // (предположим, что 1 кВт·ч = 6 км).
    calculateRange() {
        const range = this.batteryCapacity * 6;
        console.log(chalk.magenta(`Примерный запас хода: ${range} км`));
        return range;
    }
}

console.log(chalk.bgYellow("Задание 3:"));
console.log();
// создаем электрическую машину
const tesla = new ElectricCar("Tesla", "Model 3", 2022, 4, 75);
// выводим всю инфу
tesla.displayInfo();
// считаем запас хода
tesla.calculateRange();
console.log();

// ===== ЗАДАНИЕ 4: Каррирование =====

// Создайте функцию createVehicleFactory, которая возвращает функцию 
// для создания транспортных средств определенного типа (каррирование).
const createVehicleFactory = (vehicleType) => (make, model, year, ...extraArgs) => {
    // проверка vehicleType
    if (typeof vehicleType !== "function" || !(vehicleType.prototype instanceof Vehicle)) {
        throw new Error("Аргумент vehicleType должен быть классом, наследующим Vehicle!");
    }
    return new vehicleType(make, model, year, ...extraArgs); // Замените {} на варажение
};

console.log(chalk.bgYellow("Задание 4:"));
console.log();
// создаем фабрики для разных типов
const carFactory = createVehicleFactory(Car);
const electricCarFactory = createVehicleFactory(ElectricCar);
// используем фабрику для создания объектов
const toyota = carFactory("Toyota", "Corolla", 2019, 4);
const tesla2 = electricCarFactory("Tesla", "Model S", 2021, 4, 100);
// проверяем инфу
toyota.displayInfo();
tesla2.displayInfo();
console.log();

// ===== ЗАДАНИЕ 5: Статические методы и свойства =====

// Добавьте статическое свойство vehicleCount в класс Vehicle 
// для подсчета количества созданных транспортных средств.
// Модифицируйте конструктор Vehicle для увеличения счетчика
// (добавьте в начало конструктора: Vehicle.vehicleCount++);
// Создайте статический метод getTotalVehicles(), 
// который возвращает общее количество созданных транспортных средств.

console.log(chalk.bgYellow("Задание 5:"));
console.log();
console.log(chalk.magenta(`Всего создано транспортных средств: ${Vehicle.getTotalVehicles()}`));
console.log();

// Автоматические тесты
function runTests() {
    console.log("Тестирование начато\n");

    // Задание 1: класс Vehicle
    console.log("Задание 1: класс Vehicle");
    try {
        const v1 = new Vehicle("Toyota", "Camry", 2010);
        console.log("Объект Vehicle создан:", v1.displayInfo());
        console.log("Возраст:", v1.age);
    } catch (e) {
        console.log("Ошибка при создании Vehicle:", e.message);
    }

    console.log("Проверка изменения свойства year");
    const v2 = new Vehicle("BMW", "X5", 2015);
    try {
        const prevYear = v2.year;
        v2.year = 2020;
        console.log(`Год обновлен: ${prevYear} → ${v2.year}`);
    } catch (e) {
        console.log("Ошибка при изменении года:", e.message);
    }

    try { v2.year = 1800; } catch (e) { console.log("Ошибка (год < 1886):", e.message); }
    try { v2.year = -2018; } catch (e) { console.log("Ошибка (год отрицательный):", e.message); }
    try { v2.year = "2018"; } catch (e) { console.log("Ошибка (строка вместо числа):", e.message); }
    try { v2.year = 2018.5; } catch (e) { console.log("Ошибка (не целое число):", e.message); }
    try { v2.year = 2100; } catch (e) { console.log("Ошибка (год из будущего):", e.message); }

    console.log("Проверка метода compareAge");
    const v3 = new Vehicle("Audi", "A6", 2018);
    console.log("Разница по возрасту v2 и v3:", Vehicle.compareAge(v2, v3));
    try { Vehicle.compareAge(v2, 42); } catch (e) { console.log("Ошибка (второй аргумент не Vehicle):", e.message); }
    try { Vehicle.compareAge("строка", v3); } catch (e) { console.log("Ошибка (первый аргумент не Vehicle):", e.message); }

    console.log("Некорректные входные данные конструктора Vehicle");
    try { new Vehicle("", "Model", 2000); } catch (e) { console.log("Ошибка (пустая марка):", e.message); }
    try { new Vehicle(2018, "Model", 2000); } catch (e) { console.log("Ошибка (марка не строка):", e.message); }
    try { new Vehicle("Ford", "", 2000); } catch (e) { console.log("Ошибка (пустая модель):", e.message); }
    try { new Vehicle("Ford", 2018, 2000); } catch (e) { console.log("Ошибка (модель не строка):", e.message); }
    try { new Vehicle("Ford", "Focus", 1885); } catch (e) { console.log("Ошибка (год < 1886):", e.message); }
    try { new Vehicle("Ford", "Focus", "2000"); } catch (e) { console.log("Ошибка (год строка):", e.message); }
    try { new Vehicle("Ford", "Focus", -2010); } catch (e) { console.log("Ошибка (год отрицательный):", e.message); }
    try { new Vehicle("Ford", "Focus", 2010.7); } catch (e) { console.log("Ошибка (год не целое):", e.message); }
    try { new Vehicle("Ford", "Focus", 2100); } catch (e) { console.log("Ошибка (год из будущего):", e.message); }
    console.log("");

    // Задание 2: класс Car
    console.log("Задание 2: класс Car");
    try {
        const c1 = new Car("Honda", "Civic", 2018, 4);
        console.log("Объект Car создан:", c1.displayInfo());
        c1.honk();
    } catch (e) {
        console.log("Ошибка при создании Car:", e.message);
    }

    console.log("Некорректные значения дверей");
    try { new Car("Honda", "Civic", 2018, 0); } catch (e) { console.log("Ошибка (0 дверей):", e.message); }
    try { new Car("Honda", "Civic", 2018, -2); } catch (e) { console.log("Ошибка (отрицательное число):", e.message); }
    try { new Car("Honda", "Civic", 2018, 2.5); } catch (e) { console.log("Ошибка (не целое):", e.message); }
    try { new Car("Honda", "Civic", 2018, "двери"); } catch (e) { console.log("Ошибка (строка вместо числа):", e.message); }
    console.log("");

    // Задание 3: класс ElectricCar
    console.log("Задание 3: класс ElectricCar");
    try {
        const e1 = new ElectricCar("Tesla", "Model 3", 2020, 4, 75);
        console.log("Объект ElectricCar создан:", e1.displayInfo());
        console.log("Запас хода:", e1.calculateRange());
    } catch (e) {
        console.log("Ошибка при создании ElectricCar:", e.message);
    }

    console.log("Некорректные значения батареи");
    try { new ElectricCar("Tesla", "Model S", 2021, 4, -50); } catch (e) { console.log("Ошибка (отрицательная батарея):", e.message); }
    try { new ElectricCar("Tesla", "Model S", 2021, 4, "ёмкость"); } catch (e) { console.log("Ошибка (строка вместо числа):", e.message); }
    console.log("");

    // Задание 4: фабрика createVehicleFactory
    console.log("Задание 4: createVehicleFactory");
    try {
        const vehicleFactory = createVehicleFactory(Vehicle);
        const vFact = vehicleFactory("Mazda")("CX-5")(2019)();
        console.log("Vehicle через фабрику:", vFact.displayInfo());
    } catch (e) {
        console.log("Ошибка создания Vehicle фабрикой:", e.message);
    }

    try {
        const carFactory = createVehicleFactory(Car);
        const cFact = carFactory("Nissan")("Altima")(2020)(4);
        console.log("Car через фабрику:", cFact.displayInfo());
        cFact.honk();
    } catch (e) {
        console.log("Ошибка создания Car фабрикой:", e.message);
    }

    try {
        const elFactory = createVehicleFactory(ElectricCar);
        const eFact = elFactory("BYD")("Seal")(2023)(4, 80);
        console.log("ElectricCar через фабрику:", eFact.displayInfo());
        console.log("Запас хода:", eFact.calculateRange());
    } catch (e) {
        console.log("Ошибка создания ElectricCar фабрикой:", e.message);
    }

    console.log("Частичное каррирование фабрики");
    try {
        const teslaFactory = createVehicleFactory(ElectricCar)("Tesla");
        const modelSFactory = teslaFactory("Model S");
        const model2023Factory = modelSFactory(2023);
        const finalCar = model2023Factory(4, 100);
        console.log("ElectricCar через каррирование:", finalCar.displayInfo());
    } catch (e) {
        console.log("Ошибка при каррировании:", e.message);
    }

    console.log("Негативные сценарии фабрики");
    try { createVehicleFactory("NotAClass"); } catch (e) { console.log("Ошибка (аргумент не функция):", e.message); }
    try { 
        class NotAVehicle {} 
        createVehicleFactory(NotAVehicle); 
    } catch (e) { console.log("Ошибка (аргумент не Vehicle):", e.message); }
    console.log("");

    // Задание 5: статические свойства
    console.log("Задание 5: статические свойства Vehicle");
    console.log("Всего создано транспортных средств:", Vehicle.getTotalVehicles());
    console.assert(Vehicle.vehicleCount === Vehicle.getTotalVehicles(), "Ошибка: значения не совпадают");
    console.log("");

    console.log("Тестирование завершено");
}

runTests();
