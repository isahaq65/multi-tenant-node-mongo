import router from "../routes/index.js";


export default function routesConfig(app){
  app.use('/api',router);
}