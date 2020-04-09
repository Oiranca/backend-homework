//importamos mongoose

import mongoose from 'mongoose';

export const groupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { collection: 'group' },
  { timestamps: true }// poner fecha de creación y actualización
); //le podemos poner el nombre a la lista

const Group = mongoose.model('group', groupSchema);
