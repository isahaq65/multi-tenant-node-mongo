
import dotenv from "dotenv";


import middlewareConfig from "./server/middleware.config.js";
import routesConfig from "./server/routes.config.js";
import expressConfig from "./server/express.config.js";

const app=expressConfig();
dotenv.config()

middlewareConfig(app)
routesConfig(app)

const PORT= process.env.PORT || 4000

app.listen(PORT, async()=>{
  console.log(`Server is running on http://localhost:${PORT}`)
})
