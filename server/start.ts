import express from 'express'
import logger from 'loglevel'
import 'express-async-errors'

import { NextHandlerType } from '.'
import errorHandler from './middleware/error'
import { promisify } from 'util'
import { setupCloseOnExit } from './utils'
import getRoutes from './routes'
import bodyParser from 'body-parser'

function startServer(handle: NextHandlerType, port: number) {
  const app = express()

  app.disable('x-powered-by')

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  app.use('/api', getRoutes())

  app.use(errorHandler)

  app.all('*', (req, res) => {
    return handle(req, res)
  })

  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      logger.info(`>> Listening at ${port}`)

      const originalClose = server.close.bind(server)

      /* @ts-ignore */
      server.close = promisify(originalClose)

      setupCloseOnExit(server)

      resolve(server)
    })
  })
}

export { startServer }
