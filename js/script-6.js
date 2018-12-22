"use strict";

/*
  Сеть фастфудов предлагает несколько видов гамбургеров.
  Основа (булочка) гамбургера может быть большой или маленькой (обязательно):
	- маленькая (+30 денег, +50 калорий)
	- большая (+50 денег, +100 калорий)
  Гамбургер может быть с одной из нескольких видов начинок (обязательно):
	- сыром (+15 денег, +20 калорий)
	- салатом (+20 денег, +5 калорий)
	- мясом (+35 денег, +15 калорий)
  Дополнительно, гамбургер можно:
	- посыпать приправой (+10 денег, +0 калорий)
	- полить соусом (+15 денег, +5 калорий)
  Напишите скрипт, расчитывающий стоимость и калорийность гамбургера. Используте ООП подход,
  создайте класс Hamburger, константы, методы для выбора опций и рассчета нужных величин.
  Написанный класс должен соответствовать следующему jsDoc описанию. То есть класс должен содержать
  указанные методы, которые принимают и возвращают данные указанного типа.
*/

/**
 * Класс, объекты которого описывают параметры гамбургера.
 */

class Hamburger {

    constructor(size, stuffing) {
        this._size = size; //Размер
        this._stuffing = stuffing; //Начинка
        this._toppings = [];
    }

    addTopping(topping) {
        if (!this._toppings.includes(topping))
            this._toppings.push(topping);
    }

    removeTopping(topping) {
        this._toppings = this._toppings.filter(item => item !== topping);

    }

    /**
     * Получить список toppings
     * @returns {Array} - Массив добавленных topping, содержит значения констант Hamburger.TOPPING_*
     *
     * Попробуйте сделать это геттером чтобы можно было обращаться как obj.toppings и нам вернет массив добавок
     */
    get toppings() {
        return this._toppings;
    }

    /**
     * Узнать размер гамбургера
     * @returns {String} - размер гамбургера
     *
     * Попробуйте сделать это геттером чтобы можно было обращаться как obj.size и нам вернет размер
     */
    get size() {
        return this._size;
    }

    /**
     * Узнать начинку гамбургера
     * @returns {String} - начинка гамбургера
     *
     * Попробуйте сделать это геттером чтобы можно было обращаться как obj.stuffing и нам вернет начинку
     */
    get stuffing() {
        return this._stuffing;
    }

    /**
     * Узнать цену гамбургера
     * @returns {Number} - Цена в деньгах
     *
     * Попробуйте сделать это геттером чтобы можно было обращаться как obj.price и нам вернет сумму.
     */

    /**
     * Узнать калорийность
     * @returns {Number} - Калорийность в калориях
     *
     * Попробуйте сделать это геттером чтобы можно было обращаться как obj.calories и нам вернет сумму.
     */

    _calculate(key) {
        let value =
            Hamburger.SIZES[hamburger._size][key] +
            Hamburger.STUFFINGS[hamburger._stuffing][key] +
            this._toppings.reduce(
                (acum, item) => acum + Hamburger.TOPPINGS[item][key],
                0);
        return value;
    }

    get calculateCalories() {return this._calculate('calories');}
    get calculatePrice() {return this._calculate('price');}
}

/*
  Размеры, виды добавок и начинок объявите как статические поля класса.
  Добавьте отсутсвующие поля по аналогии с примером.
*/
Hamburger.SIZE_SMALL = "SIZE_SMALL";
Hamburger.SIZE_LARGE = "SIZE_LARGE";

Hamburger.SIZES = {
    [Hamburger.SIZE_SMALL]: {
        price: 30,
        calories: 50
    },
    [Hamburger.SIZE_LARGE]: {
        price: 50,
        calories: 100
    }
};

Hamburger.STUFFING_CHEESE = "STUFFING_CHEESE";
Hamburger.STUFFING_SALAD = "STUFFING_SALAD";
Hamburger.STUFFING_MEAT = "STUFFING_MEAT";

Hamburger.STUFFINGS = {
    [Hamburger.STUFFING_CHEESE]: {
        price: 15,
        calories: 20
    },
    [Hamburger.STUFFING_SALAD]: {
        price: 20,
        calories: 5
    },
    [Hamburger.STUFFING_MEAT]: {
        price: 35,
        calories: 15
    }
};

Hamburger.TOPPING_SPICE = "TOPPING_SPICE";
Hamburger.TOPPING_SAUCE = "TOPPING_SAUCE";

Hamburger.TOPPINGS = {
    [Hamburger.TOPPING_SPICE]: {
        price: 10,
        calories: 0
    },
    [Hamburger.TOPPING_SAUCE]: {
        price: 15,
        calories: 5
    }
};

const hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
// Добавка из приправы
hamburger.addTopping(Hamburger.TOPPING_SPICE);

// Спросим сколько там калорий
console.log("Calories: ", hamburger.calculateCalories);

// Сколько стоит?
console.log("Price: ", hamburger.calculatePrice);

// Я тут передумал и решил добавить еще соус
hamburger.addTopping(Hamburger.TOPPING_SAUCE);

// А сколько теперь стоит?
console.log("Price with sauce: ", hamburger.calculatePrice);

// Проверить, большой ли гамбургер?
console.log("Is hamburger large: ", hamburger.size === Hamburger.SIZE_LARGE);

// Убрать добавку
hamburger.removeTopping(Hamburger.TOPPING_SPICE);

// Смотрим сколько добавок
console.log("Hamburger has %d toppings", hamburger.toppings.length);