# Приложение Auction

Приложение представляет из себя интернет-аукцион. 

Реализованы следующие возможности: 
- Cоздавать и редактировать собственные лоты;
- Делать ставки по лотам других пользователей;
- Создавать новых пользователей.

Аутентификация происходит при помощи JWT создаваемых сервером и передающихся клиенту при авторизации. Токены хранятся у клиента в localStorage.

При верстке активно использовался React-Bootstrap.

Формы реализованы при помощи Formik. Для хранения изображений используется Cloudinary.


## Используемые технологии

Backend
- Express
- MongoDB (Mongoose)
- TypeScript
- JWT
- Socket.io

Frontend
- React
- React Hooks
- Redux (Redux-thunk)
- React-Bootstrap (компоненты), Bootstrap (сетки)
- React Router
- SASS
- Formik
- Socket.io
- Cloudinary
- Axios
- Date-fns
- Lodash
- Prop-types, Classnames

## Heroku
https://auction3653.herokuapp.com