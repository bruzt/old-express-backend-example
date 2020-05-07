const bcrypt = require('bcrypt');
const { where, fn, col } = require('sequelize');

const userModel = require('../models/postgres/userModel');

module.exports = {

    async index(req, res){

        try {
    
            let read;
            
            if(req.query.id){ // find by ID, ?id=
                
                read = await userModel.findByPk(req.query.id);
    
                read = [read];
    
            } else if (req.query.username) { // find by username, ?username=
    
                //read = await userModel.findAll({ where: { username: `${req.query.username}`}});
                read = await userModel.findAll({ where: where(fn('LOWER', col('username')), 'LIKE', `%${req.query.username}%`)});
    
            } else {
    
            read = await userModel.findAll();
    
            }
            
            read.map(element => { // não deixa a senha ser exibida
                return element.password = undefined;
            });
    
            return res.json(read);
    
        } catch (error) {
            //console.error(error);
            res.status(500).json(error);
        }
    },

    async show(req, res){

        try {
    
            let read = await userModel.findByPk(req.params.id);
            
            read.password = undefined;
    
            return res.json(read);
            
        } catch (error) {
    
            if(Object.entries(error).length === 0){
                return res.status(400).json( { message: "ID not found"} );
            }
            
            return res.status(500).json(error);
        }
    
    },

    async store(req, res){
    
        req.assert('name', 'name must have 4 characters mininum, 12 characters maximum').isLength({ min: 4, max: 12 });
        req.assert('email', 'invalid email').isEmail();
        req.assert('password', 'password must have 6 characters mininum, 16 characters maximum').isLength({ min: 6, max: 16 });
    
        let errors = req.validationErrors();
    
        if(errors){
            return res.status(400).json(errors);
        }
    
        try {
    
            const user = req.body;

            user.password = await bcrypt.hash(user.password.toString(), 10);
            
            let create = await userModel.create(user);
                    
            create.dataValues.password = undefined;
    
            return res.json(create.dataValues);
    
        } catch (error) {
            
            if(error.name == "SequelizeUniqueConstraintError"){
                let msg = [];
                error.errors.forEach( (err) => {
                    msg.push(err.message + ', ' + err.type);
                });
    
                return res.status(400).json({ errors: msg }); // message: error.errors[0].message
            }
           
            return res.status(500).json(error);
        }
    },

    async update(req, res){

        if(req.body.username){
            req.assert('username', 'username must have 5 characters mininum, 12 characters maximum').isLength({ min: 5, max: 12 });
        }
    
        if(req.body.email){
            req.assert('email', 'invalid email').isEmail();
        }
        
        if(req.body.password){
            req.assert('password', 'password must have 6 characters mininum, 16 characters maximum').isLength({ min: 6, max: 16 });
        }
    
        let errors = req.validationErrors();
    
        if(errors){
            return res.status(400).json(errors);
        }
    
        try {
            const id = req.params.id;
            const user = req.body;
    
            const update = await userModel.update(user, { where: { id }})
    
            return res.json(update);
    
        } catch (error) {
            //console.error(error);
            res.status(500).json(error);
        }
    },

    async destroy(req, res){
        try {
            const id = req.params.id;
    
            await userModel.destroy({ where: { id }});
    
            return res.json(true);
    
        } catch (error) {   
            //console.error(error);
            res.status(500).json(error);
        }
    }
}