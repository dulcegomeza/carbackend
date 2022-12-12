
const { Model } = require('../models');

const modelsPaginatePost = async(req, res) =>{

    const { limit = 9, desde=0, pag=1} = req.body;

    let page = pag;
    let skip_number = desde;


    const total = await Model.countDocuments();



   let  total_pages = Math.ceil(total / limit);

    if(page > total_pages){
        page = total_pages;
    }

    page = pag -1;
    desd = page * limit;

    if(desd < 0){
        desd = 0;
    }


    const models = await  Model.find()
    .populate('brand', 'name')
    .skip(Number(desd)).limit(Number(limit));


    res.json({ models, total, total_pages, limit, skip_number })
}


const modelsGetById = async (req, res) => {
    const { id } = req.params;
    const model = await Model.findById(id).populate('brand', 'name');

    res.json(model);
}


const modelsPost = async (req, res) => {

    const { model, ...resto } = req.body;

    const modelDB = await Model.findOne({ model });

    if (modelDB) {
        return res.status(400).json({ msg: `model ${model} exist` });
    }

    const data = {
        ...resto,
        model
    }

    const models = new Model(data);

    await models.save();

    res.status(201).json(models);

}


const modelsPut = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const model = await Model.findByIdAndUpdate(id, data);


    res.json({ 'msg': 'put', model })
}


const modelsPutStock = async (req, res) => {


    const { id } = req.params;

    const { cantidad } = req.body;

    const model = await Model.findByIdAndUpdate(id, { stock: cantidad });
    res.json({ 'msg': 'update', model })
}

module.exports = {
    modelsPaginatePost,
    modelsGetById,
    modelsPost,
    modelsPut,
    modelsPutStock
}