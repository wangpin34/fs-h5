import { FileError, Default } from './Constants'
import Logger from './Logger'

const errorLogger = Logger.newInstance({
    prefix:'File System error',
    type: Default.ERROR
})

export default class ErrorHandler {

    static handle( error, action ) {
        
        let msg = ''

        switch (error.code) {  
            case FileError.QUOTA_EXCEEDED_ERR:  
              msg = 'Request quoto exceeded'
              break
            case FileError.NOT_FOUND_ERR:  
              msg = 'Request path not found'
              break
            case FileError.SECURITY_ERR:  
              msg = 'Secerity error occoars'
              break
            case FileError.INVALID_MODIFICATION_ERR:  
              msg = 'Invalid modification occurs'
              break
            case FileError.INVALID_STATE_ERR:  
              msg = 'Invalide state error occurs '
              break 
            default:
              msg = 'An unknow error occurs, please contact dmoneh@163.com for help'
              break 
        }
        msg += ' when ' + action
        errorLogger.log(msg)
        return msg
    }

}