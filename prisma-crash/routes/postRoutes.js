import express from "express"

import { postCreate, postsFetch, postsFetchByUser } from "../controllers/post.controller.js"


const router = express.Router()

router.post("/post/create",postCreate)

router.get("/post/fetch",postsFetch)

router.get("/post/:id",postsFetchByUser)


export default router