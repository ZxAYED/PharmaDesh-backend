import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application, RequestHandler } from 'express'
import globalErrorHandler from './App/Error/GlobalErrorHandlers'
import NotFound from './App/Error/NotFound'
import adminRouter from './App/features/admin/admin.routes'
import authRouter from './App/features/Auth/auth.routes'
import orderRoutes from './App/features/orders/orders.routes'
import productsRouter from './App/features/products/products.routes'


const app: Application = express()
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}))
app.use(express.json());

app.use('/api/products', productsRouter)
app.use('/api/orders', orderRoutes)
app.use('/api/auth', authRouter)
app.use('/api/admin', adminRouter)



app.get('/', (req, res) => {
  res.send('PharmaDesh apiiiii is working at shei level')
})

app.use(globalErrorHandler as unknown as RequestHandler)
app.use(NotFound as unknown as RequestHandler)

export default app
