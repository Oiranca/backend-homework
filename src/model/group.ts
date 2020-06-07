//importamos mongoose

import { Document, model, Schema } from 'mongoose'; // importaciones paciales para typescript


// en typescript hay que definir interfaces con la estructura de nuestro schema

export interface InterGroup extends Document{
    name:string;

}

const groupSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },


  },
  { timestamps: true } // poner fecha de creación y actualización
);

export default model<InterGroup>('Group', groupSchema);
