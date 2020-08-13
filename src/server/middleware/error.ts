import { ErrorRequestHandler } from 'express'
import logger from 'loglevel'

const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (res.headersSent) {
    next(error)
  } else {
    logger.error(error)
    res.status(500)
    res.json({
      message: error.message,
    })
  }
}

export default errorHandler
