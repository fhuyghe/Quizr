import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
    introTitle: { type: String },
    introParagraph: { type: String },
    resultsTitle: { type: String },
    resultsParagraph: { type: String },
    resultsTextAfter: { type: String }
});

export const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;