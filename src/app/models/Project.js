import { Schema, model } from 'mongoose';

const ProjectSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    tasks: {
        type: [String],
        required: false
    },
}, {
    timestamps: true
});

export default model('Project', ProjectSchema);