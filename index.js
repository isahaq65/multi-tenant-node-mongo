import ExpressConfig from "./server/express.config";
import dotenv from "dotenv";

const app=ExpressConfig();
dotenv.config()

const PORT= process.env.PORT || 4000

app.listen(PORT, async()=>{
  console.log(`Server is running on http://localhost${PORT}`)
})
