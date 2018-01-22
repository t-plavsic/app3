var _ = require('lodash');
var express = require('express');
var router = express.Router();
var User = require('../models/userModel');
var Todo = require('../models/todoModel');
var authenticate = require('../middleware/authenticate');
var ObjectID = require('mongodb').ObjectID;


router.get('/', (req, res) => {
    res.render('todos/index.njk', { title: 'TODO-index' });
});

router.get('/list', (req, res) => {

    Todo.find({}).then((todos) => {
        //res.send({ todos });
        res.render('todos/todos_list.njk', { todos });
    }, (e) => {
        res.status(400).send(e);
    });

});

// router.get('/', authenticate, (req, res) => {
//     Todo.find({
//         _creator: req.user._id
//     }).then((todos) => {
//         res.send({ todos });
//     }, (e) => {
//         res.status(400).send(e);
//     });
// });

router.get('/create', (req, res) => {
    res.render('todos/create.njk', { title: 'NOVI UNOS - todos' });
});

router.post('/create',  (req, res) => {
    var todo = new Todo({
        text: req.body.text,
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });

}); 

// router.post('/', authenticate, (req, res) => {
//     var todo = new Todo({
//         text: req.body.text,
//         _creator: req.user._id
//     });

//     todo.save().then((doc) => {
//         res.send(doc);
//     }, (e) => {
//         res.status(400).send(e);
//     });
// }); 


router.get('/:id', authenticate, (req, res) => {
    var id = req.params.id;

    console.log('item: ', id)
    console.log('user: ', req.user._id)

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('ObjectID not valid.');
    }

    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    });
});

router.delete('/:id', authenticate, (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    });
});

router.patch('/:id', authenticate, (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    console.log('body: ', body)

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({ _id: id, _creator: req.user._id }, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    })
});



module.exports = router;

