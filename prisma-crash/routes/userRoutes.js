import express from "express"
import { userCreate, userFetchOne, usersFetch, userUpdate } from "../controllers/user.controller.js"


const router = express.Router()

router.post("/user/create",userCreate)
router.put("/user/:id",userUpdate)
router.get("/user/fetch",usersFetch)
router.get("/user/:id",userFetchOne)

export default router