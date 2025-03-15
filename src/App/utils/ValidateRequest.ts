import { NextFunction, Request, Response } from "express"
import { z } from "zod"
import CatchAsync from "./CatchAsync"

const validateRequest = (schema: z.ZodSchema) => {
    return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
        await schema.parseAsync(req.body, req.cookies)
        next()
    })
}
export default validateRequest
