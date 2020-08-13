import express from 'express'
import getEventsRoutes from './events'

export default function getRoutes() {
  const router = express.Router()

  router.use('/events', getEventsRoutes())

  return router
}
