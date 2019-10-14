import { check } from 'express-validator'

export default [
    check("email", "Недопустимый email").exists().isEmail(),
    check("password", "Пароль слишком короткий или имеет недопустимые символы" ).exists().custom((value) => (/^[0-9A-Za-z]{3,}$/i.test(value)))
];