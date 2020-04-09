//importamos mongoose

// TODO:'mirar como insertar imagenes'

import mongoose from 'mongoose';

 const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, enum: [100, 50] },
    _idHome: { type: mongoose.Schema.Types.ObjectID,ref:'Group' , unique: true , required:true},
    tasks: {type: [{type:String}],default:['Sin tarea']},
  },
  { collection: 'Users' },
  { timestamps: true }
); //le podemos poner el nombre a la lista

export const User = mongoose.model('User', userSchema);
