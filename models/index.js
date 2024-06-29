import mongoose from 'mongoose';

const { Schema } = mongoose;

const QuoteSchema = new Schema({
    quote: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
});

const Quote = mongoose.models.Quote || mongoose.model('Quote', QuoteSchema);

export default Quote;
