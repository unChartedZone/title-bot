import mongoose, { Schema, Model } from 'mongoose';

class DbManager {
  static async connectDb() {
    try {
      await mongoose.connect('mongodb://localhost:27017/', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'titlebot',
        user: 'root',
        pass: 'example',
      });
    } catch (e) {
      console.log('Error connecting to database: ', e);
    }
  }
}

const recordSchema: Schema = new mongoose.Schema({
  url: String,
  title: String,
});

const Record = mongoose.model('record', recordSchema);

export default DbManager;
export { Record };
