import mongoose from 'mongoose'

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-lzoyv.mongodb.net/auction`

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});