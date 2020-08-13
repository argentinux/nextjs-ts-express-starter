import logger from 'loglevel'

function setupCloseOnExit(server) {
  async function handleClose() {
    await server
      .close()
      .then(() => {
        logger.info(`Server closed successfully`)
        // TODO check event
        process.exit()
      })
      .catch(() => {
        logger.warn(`Fail to close server`)
      })
  }
  const events = 'exit SIGINT uncaughtException SIGUSR1 SIGUSR2'
  events.split(' ').forEach((event) => {
    process.on(event, handleClose)
  })
}

export { setupCloseOnExit }
