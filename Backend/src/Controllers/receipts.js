import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const getAllReceipts = async(req, res) => {
    res.send('Get all the receipts.')
}

export const getSingleReceipt = async(req, res) => {
    res.send('Get single receipts.')
}

export const generateReceipt = async(req, res) => {
    res.send('create receipt.')
}

export const deleteReceipt =  async(req, res) => {
    res.send('Delete receipt.')
}