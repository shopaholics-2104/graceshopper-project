const productList = [
  {
    name: "Wakanda forever",
    description:
      "This cookie will give you the enhanced senses, with superhuman condition and speed,on top of that you will gain magical resistance, and a super cool vibranium-assisted outfit.",
    single_price: 99.99,
    dozen_price: 1170.0,
    status: "running_low",
    imageUrl:
      "https://i.pinimg.com/originals/00/b3/a8/00b3a817a303dbe6fedb81af9a65394c.png",
    categoryId: 1,
  },

  {
    name: "Wanda",
    description:
      "This cookie will have you extraordinary set of powers. Telekinesis, telepathy, and energy manipulation, what more do you need?",
    single_price: 99.99,

    dozen_price: 1170.0,
    status: "running_low",
    imageUrl:
      "https://64.media.tumblr.com/77e94c182e27591ccf9d0ae2477f556f/tumblr_od2y0kfDY91vycuvuo1_1280.jpg",
    categoryId: 3,
  },

  {
    name: "The first Avenger",
    description:
      "This cookie will provide you superhuman strength, aglility and stamina. And if that's not enough, it will also give you healing ability, and have you be able to fight like Bruce Lee",
    single_price: 99.99,

    dozen_price: 1170.0,
    status: "in_stock",
    imageUrl:
      "https://www.pikpng.com/pngl/m/46-467923_captainamerica-marvel-superhero-avengers-chibi-captain-america-drawing.png",
    categoryId: 4,
  },

  {
    name: "Groot",
    description:
      "Have you ever thought about becoming a tree with some sick superpower? if you have, now this cookie is your chance, not only this cookie will make you to have superhuman strength to lift and break, it will also gift you the ability to generate flowers, twig and leaves.",
    single_price: 99.99,

    dozen_price: 1170.0,
    status: "in_stock",
    imageUrl:
      "https://i.pinimg.com/736x/e2/39/ff/e239ff825e9e3b8543d1a15b69cd93b9.jpg",
    categoryId: 1,
  },

  {
    name: "Hawkeye",
    description:
      "Even though this cookie won't equip you with any superhuman power, but with this cookie, you will be at the very peak of human condition, and gain the exceptional fencing and marksmanship",
    single_price: 99.99,

    dozen_price: 1170.0,
    status: "running_low",
    imageUrl:
      "https://i.pinimg.com/originals/03/90/dc/0390dc70fbbd524efe4fbb01a903cdc9.png",
    categoryId: 5,
  },

  {
    name: "Doctor Strange",
    description:
      "Consider this cookie will transform you to be the most powerful being in the Universe, we suggest you consume it carefully",
    single_price: 99.99,

    dozen_price: 1170.0,
    status: "out_of_stock",
    imageUrl:
      "https://i.pinimg.com/originals/33/e9/fe/33e9fe1cfec6d0b54fa04b5bc479faa4.jpg",
    categoryId: 2,
  },

  {
    name: "The Hulk",
    description:
      "We know the look of this cookie isn't too appaetizing, but trust us when we say this cookie will provide you some marvelous abilities.",
    single_price: 99.99,

    dozen_price: 1170.0,
    status: "in_stock",
    imageUrl:
      "https://sketchok.com/images/articles/02-comics/006-superheroes-chibi/01/12.jpg",
    categoryId: 3,
  },

  {
    name: "Falcon",
    description:
      "Supersonic flight speed, enhanced maneuverability and agility, force generation, extreme vision, pilot, combatant, marksman and tactician. Communication with birds. With those being said, we don't see why you still hesitate",
    single_price: 99.99,

    dozen_price: 1170.0,
    status: "running_low",
    imageUrl:
      "https://i.pinimg.com/originals/b9/f8/28/b9f82843262ebb7af01f22074e452f36.jpg",
    categoryId: 2,
  },

  {
    name: "Vision",
    description:
      "This cookie will transform you to an ideal hybird of organic and inorganic material form, with the ability to understand emothions. And as if those are not awesome enough, this cookie will also offer you genius-level intellect and master combatant",
    single_price: 99.99,

    dozen_price: 1170.0,
    status: "running_low",
    imageUrl:
      "https://cdn.dribbble.com/users/228053/screenshots/2692658/vision4.png?compress=1&resize=400x300",
    categoryId: 5,
  },
];

const categoryList = [
  { flavor: "The Dark Chocolate Pistachio Sea Salt" },
  { flavor: "The Brown Butter Oatmeal filled With Caramel" },
  { flavor: "The Brown Butter Bourbon Spice" },
  { flavor: "The Caramel Pecan Snickerdoodle" },
  { flavor: "The Cinnamon Roll Sugar" },
];

const userList = [
  {
    username: "cody",
    password: "123",
    firstName: "cody",
    lastName: "smith",
    email: "cody@gmail.com",
    role: "admin",
    addressLine_1: "123 EvergreenDrive SE",
    mobile: "828-123-1234",
    city: "Hickory",
    state: "NC",
    zipCode: "28602",
    country: "USA",
  },
  {
    username: "murphy",
    password: "123",
    firstName: "murphy",
    lastName: "smith",
    email: "murphy@gmail.com",
    addressLine_1: "345 CookieRoad NE",
    mobile: "828-234-8674",
    city: "NYC",
    state: "NY",
    zipCode: "10018",
    country: "USA",
  },
  {
    username: "Lucy",
    password: "123",
    firstName: "lucy",
    lastName: "smith",
    email: "lucy@gmail.com",
    addressLine_1: "789 RiverBand Drive",
    mobile: "828-098-2580",
    city: "NYC",
    state: "NY",
    zipCode: "10017",
    country: "USA",
  },
  {
    username: "Jing",
    password: "123",
    firstName: "jing",
    lastName: "smith",
    email: "jing@gmail.com",
    role: "admin",
    addressLine_1: "409 PizzeDrive SE",
    mobile: "828-265-0423",
    city: "NYC",
    state: "NY",
    zipCode: "10016",
    country: "USA",
  },
  {
    username: "Tashif",
    password: "123",
    firstName: "tashif",
    lastName: "smith",
    email: "tashif@gmail.com",
    addressLine_1: "904 BurgerRoad SW",
    mobile: "828-268-0256",
    city: "NYC",
    state: "NY",
    zipCode: "10011",
    country: "USA",
  },
];

const orderList = [
  {
    userId: 1,
    status: "New",
    comment: "new order",
    totalAmount: 199.98,
  },
  {
    userId: 2,
    status: "CheckOut",
    comment: "order checked out",
    totalAmount: 1770.0,
  },
  {
    userId: 1,
    status: "Completed",
    comment: "order completed",
    totalAmount: 799.92,
  },
  { userId: 3, status: "Paid", comment: "order paid", totalAmount: 99.99 },
];

const orderItems = [
  { quantity: 1, price: 99.99, orderId: 1, productId: 1 },
  { quantity: 1, price: 99.99, orderId: 1, productId: 2 },
  { quantity: 1, price: 99.99, orderId: 2, productId: 3 },
  { quantity: 1, price: 99.99, orderId: 3, productId: 3 },
  { quantity: 2, price: 99.99, orderId: 3, productId: 4 },
  { quantity: 5, price: 99.99, orderId: 3, productId: 1 },
];

module.exports = { productList, categoryList, userList, orderList, orderItems };
