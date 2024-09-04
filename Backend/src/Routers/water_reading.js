import { Router } from "express";
const router = Router()

router.get('/all', async(req,res) => {
    res.json('sdklsklds')
})

router.get('/reading/:reading_id', async(req,res) => {
    res.json('single water reading.')
})

router.post('/create', async(req,res) => {
    res.json('Create new water reading.')
})


router.delete('/reading/:reading_id', async(req,res) => {
    res.json('delete water reading.')
})