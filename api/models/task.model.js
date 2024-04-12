// const mongoose = require('mongoose');

// const taskSchema = new mongoose.Schema(
//     {
//         title: {
//             type: String,
//             required: true,
//         },
//         description: {
//             type: String,
//         },
//         attachments: {
//             type: [String],
//             default: [],
//         },
//         tags: {
//             type: [String],
//             default: [],
//         },
//         column: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Column',
//             required: true,
//         },
//         owner: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User',
//             required: true,
//         },
//     },
//     { timestamps: true }
// );

// taskSchema.pre('remove', async function (next) {
//     try {
//         const Column = mongoose.model('Column');
//         const column = await Column.findById(this.column);
//         column.tasks = column.tasks.filter((task) => task._id.toString() !== this._id.toString());
//         await column.save();
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// });

// const Task = mongoose.model('Task', taskSchema);

// module.exports = { Task, taskSchema };
