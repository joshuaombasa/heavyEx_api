const logger = require('./logger')

const requestLogger = (request,response,next) => {
    logger.info('Method:', request.method)
    logger.info('Path:', request.path)
    logger.info('Body:', request.body)
    logger.info('___')
    next()
}

module.exports = {requestLogger}