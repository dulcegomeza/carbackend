const { Router } = require('express');
const { body, check } = require('express-validator');
const bodyParser = require('body-parser');
const { validateFields, validateJWT } = require('../middlewares');
const { brandsGet, brandsPost, brandsPut } = require('../controllers/brand.controllers');
const  jsonParser = bodyParser.json();

const { brandExists } = require('../helpers/validate-db');

const router = Router(); 

router.get('/', brandsGet);

router.post('/',[validateJWT,
    jsonParser,
    body('name', 'Name required').not().isEmpty(),
    validateFields], brandsPost);

router.put('/:id',[validateJWT,  
     check('id','No Mongo id').isMongoId(),   
     check('id').custom(brandExists), 
     jsonParser, 
    body('name', 'Name required').not().isEmpty(), 
    validateFields], brandsPut);

module.exports = router;
