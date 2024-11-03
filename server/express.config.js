import express from "express";

const expressConfig=()=>{
    const app = express()
    app.use(express.json({extened:true}))
    app.set('trust proxy', true)
    return app;
}

export default expressConfig