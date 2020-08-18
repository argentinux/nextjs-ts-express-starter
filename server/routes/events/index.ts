import express from 'express'

const dumbEvents = [
  {
    name: 'My first event',
    date: '2020-12-12',
    description: 'Event from express server.',
  },
]

export default function getEventsRoutes() {
  const router = express.Router()

  router.get('/', (_req, res) => {
    res.json(dumbEvents)
  })

  return router
}
