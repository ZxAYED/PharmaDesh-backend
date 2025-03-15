/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response, NextFunction } from 'express'

const NotFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        message: 'Route Not Found'
    })
}

export default NotFound
