import { expect } from 'chai'
import sinon from 'sinon'

describe.skip('Test class fs', () => {

	let window
	let fs
	let ErrorHandler

	before(() => {
		window = {
			navigator:{
				webkitPersistentStorage: {
					requestQuota: sinon.stub()
				}
			},
			requestFileSystem: sinon.stub(),
			PERSISTENT: 'PERSISTENT'
		}
		global.window = window

		ErrorHandler = {
			generate: sinon.spy()
		}

		fs = proxyquire('../src/fs', {
			'./ErrorHandler': ErrorHandler
		}).default

	})

	after(() => {
		delete global.window
	})

	describe('Test static method init', () => {

		it.skip('It should be a function', () => {
			expect(fs.init).to.be.a('function')
		})

		it('It should call the callback once', () => {
			let bytes = 1024
			let callback = sinon.spy()
			window.navigator.webkitPersistentStorage.requestQuota.callsArgWith(1,bytes)
			window.requestFileSystem.callsArgWith(2, {})
			window.requestFileSystem.callsArgWith(3, {})
			fs.init(1024, callback)

			expect(callback.calledOnce).to.be.ok
			ErrorHandler.generate()
			expect(ErrorHandler.generate.called).to.be.ok

		})


	})



})