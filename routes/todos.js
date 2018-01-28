var _ = require('lodash');
var express = require('express');
var router = express.Router();
var User = require('../models/userModel');
var Todo = require('../models/todoModel');
var authenticate = require('../middleware/authenticate');
var ObjectID = require('mongodb').ObjectID;


router.get('/', (req, res) => {
    res.render('todos/index.njk', { title: 'TODO-index', username: req.user.username });
});

router.get('/list', (req, res) => {

    Todo.find({}).then((todos) => {
        //res.send({ todos });
        res.render('todos/todos_list.njk', { todos, username: req.user.username });
    }, (e) => {
        res.status(400).send(e);
    });

});

router.get('/create', (req, res) => {
    res.render('todos/create_get.njk', { title: 'NOVI UNOS - todos' });
});

router.post('/create', (req, res) => {
    var todo = new Todo({
        text: req.body.text,
    });

    todo.save().then((doc) => {
        res.redirect('/todos/list');
    }, (e) => {
        res.status(400).send(e);
    });

});


router.get('/:id/delete', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('ObjectID not valid.');
    }

    Todo.findOne({
        _id: id
        //,_creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.render('todos/delete_get.njk', { title: 'BRISANJE UNOSA - todos', doc: todo });
        //res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    });

});

router.post('/:id/delete', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findOneAndRemove({
        _id: id
        //,_creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        //res.send({ todo });
        res.redirect('/todos/list');
    }).catch((e) => {
        res.status(400).send();
    });
});

router.get('/:id/update', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('ObjectID not valid.');
    }

    Todo.findOne({
        _id: id
        //,_creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.render('todos/update_get.njk', { title: 'PROMJENA UNOSA - todos', doc: todo });
        //res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    });

});

router.post('/:id/update', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findOneAndUpdate({ _id: id }, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        //res.send({ todo });
        res.redirect('/todos/list');

    }).catch((e) => {
        res.status(400).send();
    })
});


module.exports = router;

