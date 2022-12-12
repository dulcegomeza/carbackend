const { Router } = require('express');
const { body, check } = require('express-validator');
const bodyParser = require('body-parser');
const { validateFields, validateJWT } = require('../middlewares');
const { modelsGetById, modelsPost, modelsPut, modelsPaginatePost } = require('../controllers/model.controllers');
const  jsonParser = bodyParser.json();

const { modelExists, brandExists } = require('../helpers/validate-db');

const router = Router(); 

router.get('/:id', [    
    check('id','No Mongo id').isMongoId(), 
    check('id').custom(modelExists),
    validateFields
], modelsGetById );

router.post('/',[validateJWT,
    jsonParser,
    body('model', 'Model required').not().isEmpty(),
    body('brand', 'Brand no mongo id').isMongoId(),
    check('brand').custom(brandExists),
    validateFields], modelsPost);

router.put('/:id',[validateJWT,  
    jsonParser,
    check('id','No Mongo id').isMongoId(),   
    check('id').custom(modelExists), 
    validateFields], modelsPut);

    router.post('/paginate', [
        jsonParser,
        validateFields], modelsPaginatePost);
    

module.exports = router;