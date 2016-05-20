export default class ErrorHandler {

	static generate( prefix = 'Error', callback = err =>{} ) {
		return e => {
			let msg = ''
	  
			  switch (e.code) {  
			    case FileError.QUOTA_EXCEEDED_ERR:  
			      msg = 'QUOTA_EXCEEDED_ERR'
			      break
			    case FileError.NOT_FOUND_ERR:  
			      msg = 'NOT_FOUND_ERR'
			      break
			    case FileError.SECURITY_ERR:  
			      msg = 'SECURITY_ERR'
			      break
			    case FileError.INVALID_MODIFICATION_ERR:  
			      msg = 'INVALID_MODIFICATION_ERR'
			      break
			    case FileError.INVALID_STATE_ERR:  
			      msg = 'INVALID_STATE_ERR'
			      break 
			    default:
			      msg = 'Unknown Error'
			      break 
			  }
			  this.logger(prefix + ' / ' + msg, 'error')
			  callback(new Error(msg))
		}
	}

	static logger(msg = '', type = '') {
		switch(type){
			case 'info': console.info(msg); break
			case 'warn': console.warn(msg); break
			case 'error': console.error(msg); break
			default: console.log(msg)
		}
	}

}