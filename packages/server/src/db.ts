import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
async function connect(stringConnect: string | any): Promise<void> {
    await mongoose.connect(stringConnect, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'chat-app',
    });
    console.log('[db] sucessful connection');
}

export default connect;