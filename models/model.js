const { Schema, model } = require('mongoose');

const ModelSchema = Schema({
    name: {
        type: String,
        required: ['name required']
    },
    description: {
        type: String
    },
    imgs: {
        type: Array,
        default: ''
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    year: {
        type: Number
    },
    price: {
        type: Number,
        default: 0
    },
    stock:{
        type: Number,
        default: 0
    }

})

ModelSchema.methods.toJSON = function () {
    const { __v,  ...data } = this.toObject();

    return data;
}


module.exports = model('Model', ModelSchema);