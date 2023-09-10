// const handleErrorMessage = (err, res) => {
// if (err.name === 'ValidationError') {
//   res.status(400).send({ message: err.message });
// } else if (err.name === 'CastError') {
//   res.status(400).send({ message: 'Некорректный _id пользователя' });
// } else {
//   res.status(500).send({ message: 'Ошибка на стороне сервера' });
// };

const validationMessage = {
  required: 'Поле должно быть заполнено',
  minlength: 'Минимальная длина поля должна быть от 2 до 30 символов',
  maxlength: 'Максимальная длина поля должна быть от 2 до 30 символов',
  url: 'Тут должна быть URL ссылка',
  email: 'Неверный формат строки Email',
  img: 'Введен неверный адрес постера к фильму',
  trailer: 'Некорректный адрес трейлера фильма',
  thumbnail: 'Неверный адрес миниатюрного изображения постера к фильму',
};
module.exports = {
  validationMessage,
};
