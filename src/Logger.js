export default class Logger {

	constructor({prefix = 'Error', type}) {
		this.prefix = prefix
		this.type = type
	}

	static newInstance(opt) {
		return new Logger(opt)
	}

	log(msg) {
		if(typeof msg === 'object'){
			msg = JSON.stringify(msg, null, 4)
		}

		switch(this.type){
			case 'info': console.info(msg); break
			case 'warn': console.warn(msg); break
			case 'error': console.error(msg); break
			default: console.log(msg)
		}
	}

}