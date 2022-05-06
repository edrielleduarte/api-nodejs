// import {porta} from "./config.js"
const express = require("express")
const app = express()
const configs = require('config')
const handlebars = require('express-handlebars')

const Post = require('./models/Post')
// const bodyParser = require('body-parser')
var handle = handlebars.create({
    defaultLayout: 'main'
})
// const config = require("config")


//config    
    // Template Engine
    app.engine('handlebars', handle.engine)
    app.set('view engine', 'handlebars')

    //Body Parser
    app.use(express.json())
    app.use(express.urlencoded({
        extended: true
    }))
    


// Rotas

    app.get('/', (req, resp) => {
        Post.findAll({order: [['id', 'DESC']]}).then( (posts) =>{
            console.log(posts)
            resp.render('home',{posts: posts})
        })
        
    })
    app.get('/cad', (req, resp) => {
        resp.render('formulario.handlebars')
        // resp.send('Rota de Cadastro')
    })

    app.post('/add', (req, resp) => {

        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then(() => {
            resp.redirect('/')
        }).catch(() => {
            resp.send('Houve um erro:' + console.erro)
        })

        // req.body.conteudo
        // resp.send(`Texto: ${req.body.titulo} Conteudo: ${req.body.conteudo}`)
    })

    app.get('/deletar/:id', (req, resp) =>{
        Post.destroy({where: {'id': req.params.id}}).then(() => {
            resp.send('<h1>Apagado com sucesso!</h1>')
        }).catch((erro) => {
            resp.send('postagem não existe')
        })
    })
    


app.listen(configs.get('configuracao.porta'), () => console.log('Porta localhost funcionado'))