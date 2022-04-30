import "reflect-metadata";
import "./crossCutting"
import { connect } from "mongoose";

connect(process.env.NX_URI_MONGO)
  .then(res => {
    console.log(`🚀  MongoDB Connected: Port ready at ${res.connections.map(c => c.port).join()}`);
  })
  .catch(console.error)

export * from './resolvers';
