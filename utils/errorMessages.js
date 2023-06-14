const notValidDataCreateMovie = 'Переданы некорректные данные при создании фильма';
const notFoundMovie = 'Фильм с указанным _id не найдена';
const notRemoveAlienMovie = 'Нельзя удалить чужую карточку';

const notFoundUser = 'Пользователь по указанному _id не найден';
const notValidDataCreateUser = 'Переданы некорректные данные при создании пользователя';
const notValidDataPatchUser = 'Переданы некорректные данные при обновлении профиля';
const uniqueEmailCreateUser = 'Пользователь с таким email уже зарегистрирован';
const uniqueEmailPatchUser = 'Этот email уже занят';
const notValidForLogin = 'Неправильные почта или пароль';

const needAuth = 'Необходима авторизация';
const errorAuth = 'Авторизация не пройдена';

const pageNotFount = 'Страница не найдена';
const serverError = 'На сервере произошла ошибка';

const notValidUrl = 'Неправильный формат Url';
const notValidEmail = 'Неправильный формат Email';

module.exports = {
  notValidDataCreateMovie,
  notFoundMovie,
  notRemoveAlienMovie,
  notFoundUser,
  notValidDataCreateUser,
  uniqueEmailCreateUser,
  uniqueEmailPatchUser,
  notValidDataPatchUser,
  notValidForLogin,
  needAuth,
  errorAuth,
  pageNotFount,
  serverError,
  notValidUrl,
  notValidEmail,
};
