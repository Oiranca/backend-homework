//importamos mongoose

import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { collection: 'Group' },
  { timestamps: true }// poner fecha de creación y actualización
); //le podemos poner el nombre a la lista

export const Group = mongoose.model('Group', groupSchema);
