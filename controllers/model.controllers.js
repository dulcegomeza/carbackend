const { Model } = require('../models');

const modelsPaginadoPost = async(req, res) =>{

    const {limite = 9, desde=0, pag=1} = req.body;

    let page = pag;
    let desd = desde;
    

    const total = await Model.countDocuments();



   let  total_pages = Math.ceil(total / limite);

    if(page > total_pages){
        page = total_pages;
    }

    page = pag -1;
    desd = page * limite;

    if(desd < 0){
        desd = 0;
    }


    const models = await  Model.find()
    .populate('brand', 'name')
    .skip(Number(desd)).limit(Number(limite));

    const page_actual = page +1;
   

    res.json({ models, total, total_pages, page_actual, limite, desd })
}



const modelsGetById = async (req, res) => {
    const { id } = req.params;
    const model = await Model.findById(id).populate('brand', 'name');

    res.json(model);
}


const modelsPost = async (req, res) => {

    const { name, ...resto } = req.body;

    const modelDB = await Model.findOne({ name });

    if (modelDB) {
        return res.status(400).json({ msg: `model ${name} exist` });
    }

    const data = {
        ...resto,
        name
    }

    const model = new Model(data);

    await model.save();

    res.status(201).json(mdoel);

}


const modelsPut = async (req, res) => {
    const { id } = req.params;
    const data  = req.body;

    const model = await Model.findByIdAndUpdate(id, data);


    res.json({ 'msg': 'put', model })
}


const modelsPutStock = async (req, res) => {
    const { id } = req.params;
    const { cantidad  } = req.body;

    const model = await Model.findByIdAndUpdate(id, { stock: cantidad});
    res.json({ 'msg': 'update stock', model })
}

module.exports = {
    modelsPut,
    modelsPutStock,
    modelsPaginadoPost,
    modelsPost,
    modelsGetById
}