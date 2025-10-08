'use strict'

// ===== ЗАДАНИЕ 1: Базовый класс Vehicle =====
class Vehicle {
    // Создайте базовый класс Vehicle.
    // В конструкторе принимайте и сохраняйте в this свойства: 
    // make (марка), model (модель), year (год выпуска).
    constructor(make, model, year) {
        // проверка данных
        const currentYear = new Date().getFullYear(); // берем текущий год из системы

        if (typeof make !== "string" || make.trim() === "") {
            throw new Error("Марка должна быть не пустой строкой!");
        }
        if (typeof model !== "string" || model.trim() === "") {
            throw new Error("Модель должна быть не пустой строкой!");
        }
        if (typeof year !== "number" || !Number.isInteger(year)) {
            throw new Error("Год выпуска должен быть числом!");
        }
        if (year < 1886 || year > currentYear) {
            throw new Error("Год выпуска указан некорректно!");
        }

        this.make = make;   // марка
        this.model = model; // модель
        this._year = year;  // год выпуска (внутреннее хранилище)

        Vehicle.vehicleCount++; // при каждом создании нового объекта увеличиваем счетчик
    }

    // Добавьте метод displayInfo(), который выводит в консоль информацию 
    // о транспортном средстве в формате: "Марка: [make], Модель: [model], Год: [year]".
    displayInfo() {
        console.log(`Марка: ${this.make}\nМодель: ${this.model}\nГод: ${this.year}`);
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
            throw new Error("Год должен быть числом!");
        }
        if (newYear < 1886) {
            throw new Error("Год не может быть меньше 1886!");
        }
        if (newYear > currentYear) {
            throw new Error("Год выпуска не может быть больше текущего!");
        }
        this._year = newYear;
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
        return Math.abs(vehicle1.age - vehicle2.age);
    }

    // статический метод для получения общего числа созданных транспортных средств
    static getTotalVehicles() {
        return Vehicle.vehicleCount;
    }
}

// Инициализация статического счетчика
Vehicle.vehicleCount = 0;


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
        console.log(`Количество дверей: ${this.numDoors}`);
    }

    // Добавьте метод honk(), который выводит "Beep beep!".
    honk() {
        console.log("Beep beep!");
    }
}


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
        console.log(`Емкость батареи: ${this.batteryCapacity} кВт·ч`);
    }

    // Добавьте метод calculateRange(), который рассчитывает примерный запас хода 
    // (предположим, что 1 кВт·ч = 6 км).
    calculateRange() {
        const range = this.batteryCapacity * 6;
        return range;
    }
}

// ===== ЗАДАНИЕ 4: Каррирование ===== Каррирование — это превращение функции, которая принимает несколько аргументов сразу, в цепочку функций, каждая из которых принимает только один аргумент

// Создайте функцию createVehicleFactory, которая возвращает функцию 
// для создания транспортных средств определенного типа (каррирование).
const createVehicleFactory = (vehicleType) => {
    // проверка vehicleType
    if (typeof vehicleType !== "function" || !(vehicleType === Vehicle || vehicleType.prototype instanceof Vehicle)) {
        throw new Error("Аргумент vehicleType должен быть классом, наследующим Vehicle!");
    }
    return (make) => (model) => (year) => (...extraArgs) => {
        return new vehicleType(make, model, year, ...extraArgs);
    };
};

// ===== ЗАДАНИЕ 5: Статические методы и свойства =====

// Добавьте статическое свойство vehicleCount в класс Vehicle 
// для подсчета количества созданных транспортных средств.
// Модифицируйте конструктор Vehicle для увеличения счетчика
// (добавьте в начало конструктора: Vehicle.vehicleCount++);
// Создайте статический метод getTotalVehicles(), 
// который возвращает общее количество созданных транспортных средств.


// Автоматические тесты
function runTests() {
    console.log("Тестирование начато\n");

    const baseline = Vehicle.getTotalVehicles();

        // --- Задание 1: класс Vehicle ---
    console.log("Задание 1: класс Vehicle");
    const v1 = new Vehicle("Toyota", "Camry", 2010);
    v1.displayInfo();
    console.log("Возраст:", v1.age);

    const bmw = new Vehicle("BMW", "X5", 2018);
    bmw.displayInfo();
    console.log("Разница в возрасте двух авто:", Vehicle.compareAge(v1, bmw));
    console.log("");

    if (typeof v1.make !== "string" || v1.make.trim() === "") {
        console.error("Ошибка: марка должна быть непустой строкой");
    }
    if (typeof v1.model !== "string" || v1.model.trim() === "") {
        console.error("Ошибка: модель должна быть непустой строкой");
    }
    if (typeof v1.year !== "number" || !Number.isInteger(v1.year)) {
        console.error("Ошибка: год выпуска должен быть числом");
    }

    const currentYear = new Date().getFullYear();
    if (v1.year > currentYear) {
        console.error("Ошибка: год выпуска не может быть больше текущего");
    }

    // --- Задание 2: класс Car ---
    console.log("Задание 2: класс Car");
    const c1 = new Car("Honda", "Civic", 2018, 4);
    c1.displayInfo();
    c1.honk();

    if (!(c1 instanceof Vehicle)) {
        console.error("Ошибка: класс Car должен наследоваться от Vehicle");
    }
    if (typeof c1.numDoors !== "number" || !Number.isInteger(c1.numDoors) || c1.numDoors <= 0 || c1.numDoors > 7) {
        console.error("Ошибка: количество дверей должно быть положительным числом от 1 до 7");
    }
    console.log("");

    // --- Задание 3: класс ElectricCar ---
    console.log("Задание 3: класс ElectricCar");
    const e1 = new ElectricCar("Tesla", "Model 3", 2020, 4, 75);
    e1.displayInfo();
    const e1Range = e1.calculateRange();
    console.log("Запас хода:", e1Range);

    if (!(e1 instanceof Car)) {
        console.error("Ошибка: ElectricCar должен наследоваться от Car");
    }
    if (typeof e1.batteryCapacity !== "number" || e1.batteryCapacity <= 0) {
        console.error("Ошибка: емкость батареи должна быть положительным числом");
    }
    if (typeof e1Range !== "number" || e1Range <= 0) {
        console.error("Ошибка: calculateRange должен возвращать положительное число");
    }
    console.log("");

    // --- Задание 4: фабрика createVehicleFactory ---
    console.log("Задание 4: createVehicleFactory");
    const vehicleFactory = createVehicleFactory(Vehicle);
    const carFactory = createVehicleFactory(Car);
    const electricFactory = createVehicleFactory(ElectricCar);

    const v2 = vehicleFactory("Mazda")("CX-5")(2019)();
    v2.displayInfo();

    const c2 = carFactory("Nissan")("Altima")(2020)(4);
    c2.displayInfo();
    c2.honk();

    const e2 = electricFactory("BYD")("Seal")(2023)(4, 80);
    e2.displayInfo();
    const e2Range = e2.calculateRange();
    console.log("Запас хода:", e2Range);

    if (!(v2 instanceof Vehicle)) {
        console.error("Ошибка: объект из vehicleFactory должен быть экземпляром Vehicle");
    }
    if (!(c2 instanceof Car)) {
        console.error("Ошибка: объект из carFactory должен быть экземпляром Car");
    }
    if (!(e2 instanceof ElectricCar)) {
        console.error("Ошибка: объект из electricFactory должен быть экземпляром ElectricCar");
    }
    console.log("");

    // --- Задание 5 ---
    console.log("Задание 5");

    // --- Статическая информация ---
    const createdDuringTests = Vehicle.getTotalVehicles() - baseline;
    console.log("Всего создано транспортных средств:", createdDuringTests);
    if (Vehicle.getTotalVehicles() !== Vehicle.vehicleCount) {
        console.error("Ошибка: getTotalVehicles возвращает некорректное значение");
    }

    console.log("\nТестирование завершено ✅");
}

runTests();