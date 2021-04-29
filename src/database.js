import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost/products", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true
})
.then(db => console.log('DB connected'))
.catch(err => console.error(err));