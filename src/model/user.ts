// TODO:'mirar como insertar imagenes'

import { Document, model, Schema } from 'mongoose'; // importaciones paciales para typescript


export interface InterUsers extends Document {
  name: string;
  email: string;
  password: string;
  role: number;
  _idHome: string;
  tasks: string[];
};

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, enum: [100, 50] },
    _idHome: { type: String, required: true },
    tasks: { type: [{ type: Object }], default: ['Sin tarea'] }
  },
  { timestamps: true }
);

export default model<InterUsers>('User', userSchema);
