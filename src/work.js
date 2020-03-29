const User = require('./model/user');


async function work() {
  /*  const users = await User.findOne({
        name: 'Samuel',
    });*/

    const  taskUsers = await User.updateOne({name:"Samuel"},{
        $set:{
            taskUser:[{workOne:true,workTwo:false}],
        }
    });


return taskUsers;
}

//ver en consola el resultado de una promesa
work().then(function (result) {
console.log(result);
});

module.exports = work;
