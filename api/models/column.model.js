// const mongoose = require('mongoose');

// const columnSchema = new mongoose.Schema(
//     {
//         title: {
//             type: String,
//             required: true,
//             unique: true,
//         },
//         tasks: [
//             {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: 'Task',
//             },
//         ],
//         owner: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Board',
//         },
//     },
//     { timestamps: true }
// );

// columnSchema.pre('remove', async function (next) {
//     try {
//         const Board = mongoose.model('Board');
//         const board = await Board.findById(this.owner);
//         board.columns = board.columns.filter((column) => column._id.toString() !== this._id.toString());
//         await board.save();
//         next();
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// });

// const Column = mongoose.model('Column', columnSchema);

// module.exports = { Column, columnSchema };
