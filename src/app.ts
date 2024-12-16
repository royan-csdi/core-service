import express from "express"
import { env } from "@/configs"
import logger from "morgan"
import router from "./routes"
import { errorHandler } from "./middlewares"

const app = express()

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/", router)

app.use(errorHandler)

app.listen(env.APP.PORT, () => {
  console.log(`[Server] - Listening on port ${env.APP.PORT}`)
})
