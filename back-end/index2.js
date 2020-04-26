/*
const Sequelize = require('sequelize');
//Nome do banco, usuario e senha
const sequelize = new Sequelize('provasistema','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(function(){
        console.log('Conexão realizada com sucesso');
    })
    .catch(function(){
        console.log('Conexão falhou');
    });


    //Como criar um ORM
    //Postagens
    const postagem = sequelize.define(
        'postagens',
        {
            titulo:{
                type: Sequelize.STRING
            },
            conteudo:{
                type: Sequelize.TEXT
            }
        }
    );

    postagem.sync({force: true});*/
