const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SignalSchema = new Schema({
    createdAt: { type: Date, required: true },
    signalId: { type: String, required: true },
    isWin: { type: Boolean },
    entryPrice: { type: Number, required: true },
    winRate: { type: Number }, // 60 - 70 - 80,
    closedAt: { type: Date },
    closePrice: { type: Number }
});

const Signal = mongoose.model('Signal', SignalSchema);

module.exports = Signal;
