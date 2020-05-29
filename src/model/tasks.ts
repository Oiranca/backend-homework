//importamos mongoose

import { Document, model, Schema } from 'mongoose';


// en typescript hay que definir interfaces con la estructura de nuestro schema

export interface InterTasks extends Document{
    name:string;
    description: string;
  _idHome: string;

}

const tasksSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true},
    description: { type: String, required: true},
    _idHome: { type: String, required:true},
  },
  { timestamps: true } // poner fecha de creación y actualización
);

export default model<InterTasks>('Task', tasksSchema);
