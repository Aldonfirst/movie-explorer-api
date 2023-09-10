const mongoose = require('mongoose');
const { isURL } = require('validator');
const { validationMessage } = require('../utils/errorMessage');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле  страна создания фильма должно быть заполнено'],
  },
  director: {
    type: String,
    required: [true, 'Поле режиссёр фильма должно быть заполнено'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле длительность фильма должно быть заполнено'],
  },
  year: {
    type: Date,
    required: [true, 'Поле год выпуска должно быть заполнено'],
  },
  description: {
    type: String,
    required: [true, 'Поле описание фильма должно быть заполнено'],
  },
  image: {
    type: String,
    required: [true, 'Поле ссылка на постер к фильму должно быть заполнено'],
    validate: {
      validator: (imgUrl) => isURL(imgUrl),
      message: validationMessage.img,
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле ссылка на трейлер фильма должно быть заполнено'],
    validate: {
      validator: (trailer) => isURL(trailer),
      message: validationMessage.trailer,
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле миниатюрное изображение постера к фильму должно быть заполнено'],
    validate: {
      validator: (v) => isURL(v),
      message: validationMessage.thumbnail,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле id пользователя, который сохранил фильм должно быть заполнено'],
  },
  movieId: {
    type: Number,
    required: [true, 'Поле id фильма,должно быть заполнено'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле название фильма на русском языке должно быть заполнено'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле название фильма на английском языке должно быть заполнено'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
