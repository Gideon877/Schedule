const File = require('../../models/file');
const mongodb = require('mongodb');
const fs = require('fs');
const path = require('path')

module.exports = {
    Mutation: {
        // addFile: async (parent, { file }, context) => {
        //     try {
        //         const { createReadStream, filename, mimetype, encoding } = await file;
        //         const UPLOAD_PATH = path.resolve(__dirname)
        //         console.log({ file, UPLOAD_PATH }, ' addFile mutation --------', __dirname)

        //         return mongodb.MongoClient.connect(process.env._MONGO_DB_URL, async (error, client) => {
        //             const db = client.db(process.env.MONGO_DB)
        //             const bucket = new mongodb.GridFSBucket(db);
        //             const uploadStream = bucket.openUploadStream(filename);
        //             await new Promise((resolve, reject) => {
        //                 fs.createReadStream(UPLOAD_PATH)
        //                     .pipe(uploadStream)
        //                     .on('error', reject)
        //                     .on('finish', resolve);
        //             })

        //             return { _id: uploadStream.id, filename, mimetype, encoding };
        //         })
        //     } catch (error) {
        //         console.log(error)
        //         return false;
        //     }
        // }
    }
}