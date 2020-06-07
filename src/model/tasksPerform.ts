//importamos mongoose

import { Document, model, Schema } from 'mongoose';


// en typescript hay que definir interfaces con la estructura de nuestro schema

export interface InterTasksPerform extends Document {
  _idTasks: string;
  _idHome: string;
  _idUser: string;
  dateAssigned: string;
  perform: boolean


}

const performSchema: Schema = new Schema(
  {
    _idTasks: { type: String, required: true },
    _idHome: { type: String, required: true },
    _idUser: { type: String, required: true },
    dateAssigned: { type: String, required: true },
    perform: { type: Boolean, required: true, default: false }
  },
  { timestamps: true } // poner fecha de creación y actualización
);

export default model<InterTasksPerform>('TasksPerform', performSchema);
