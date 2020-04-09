//importamos mongoose

// TODO:'mirar como insertar imagenes'

import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, enum: [100, 50] },
    _idHome: { type: mongoose.ObjectId, unique: true },
    tasks: Array,
  },
  { collection: 'users' },
  { timestamps: true }
); //le podemos poner el nombre a la lista

const User = mongoose.model('user', userSchema);
