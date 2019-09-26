var _ = require('lodash')

const errorCodes = {
  1: 'Не авторизован',
  3: 'Нет доступа',
  4: 'Не найдено',
  5: 'Не указан параметр',
  10: 'Токен не валиден',
  11: 'Токен просрочен',
  12: 'Пользователь с этим адресом уже зарегестрирован',
  13: 'Пользователь с этим логином уже зарегестрирован',
  14: 'Нет пользователя с этим email',
  15: 'Неверный токен',
  20: 'Инвайт не найден',
  21: 'Неверная роль',
  30: 'Нет файла',
  31: 'Это расширение запрещено для заливки',
  32: 'Слишком большой файл',
  40: 'Нет доступа к блогу',
  41: 'Блог не найден',
  50: 'Пост с таким url уже существует',
  60: 'Не удается соединиться с trello',
  70: 'Аватар - не картинка',
  71: 'Аватар слишком большой',
  80: 'Стикер - не картинка',
  81: 'Стикер слишком большой',
}

var getErrorCode = (error) => {
  if (_.has(error, 'response')) {
    // it's server error
    var data = error.response.data
    if (_.has(data, 'error')) {
      // there is error in request
      var code = data.error.code
      return code
    }
  } else {
    return null
  }
}

export default {
  handle: (error) => {
    console.log(error)
  },
  getText: (error) => {
    var code = getErrorCode(error)
    if (code !== null) {
      return errorCodes[code]
    }
    else {
      return "Что-то пошло не так"
    }
  },
  getErrorCode: (error) => getErrorCode(error)
}