import mongoose from 'mongoose'

const url = `mongodb+srv://taboo3653:4XyyRo5toA4efgAn@cluster0-lzoyv.mongodb.net/auction`

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});