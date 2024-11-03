import { databaseResolver } from "../middleware/databaseResolver.js";


export default function middlewareConfig(app){
  app.use(databaseResolver);
}