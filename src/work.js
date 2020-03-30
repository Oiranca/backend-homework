const User = require('./model/user');
const Controlgroup = require('./model/group');
const mongoose = require('mongoose');
/**
 * @return {string}
 */
var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};
/*
async function work() {
    const users = await User.findOne({
        name: 'Samuel',
    });

    const  taskUsers = await User.updateMany({name:"Samuel"},{
        $push:{
            tasks:[{
                id: ID(),
                description: 'tarea3',
                done: true,
                createDate: Date()
            }
                , {
                    id: ID(),
                    description: 'tarea4',
                    done: true,
                    createDate: Date()
                }]
        }
        $addToSet:{
              tasks:[{
               id: ID(),
               description: 'tarea3',
               done: true,
               createDate: Date()
           }
               , {
                   id: ID(),
                   description: 'tarea4',
                   done: true,
                   createDate: Date()
               }]
        }
       $push:{

          tasks:{
              $each:[{
                  id: ID(),
                  description: 'tarea3',
                  done: true,
                  createDate: Date()
              }
                  , {
                      id: ID(),
                      description: 'tarea4',
                      done: true,
                      createDate: Date()
                  }

              ]
          }
        }
    });


return taskUsers;
 // return users;
}

//ver en consola el resultado de una promesa
work().then(function (result) {
console.log(result);
});

module.exports = work;*/

/*
const users = await User.findOne({
    name: 'Samuel',
});*/

async function idGropuf() {
const idGp = await Controlgroup.findOne({
    name:'Nombre a elegir por el admin',
});

  return idGp._id;
};

idGropuf().then(function (result) {
    console.log(result);
    return result;
});

var idHome=idGropuf().then(function (result) {

    return result;
});


console.log('Esto es la variable'+idHome);

module.exports = idGropuf;

