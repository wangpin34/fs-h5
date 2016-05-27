import { expect } from 'chai'
import sinon from 'sinon'
import proxyquire from 'proxyquire'
import fs from '../src/fs'

describe.only('Test class fs', () => {

	let window
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

/*		fs = proxyquire('../src/fs.js', {
			'./ErrorHandler': ErrorHandler
		})*/

		console.log('Before call')
	})

	after(() => {
		delete global.window
	})

	describe('Test static method init', () => {


		it('It should be a function', () => {
			expect(fs.init).to.be.a('function')
		})

		it('It should call the callback once', () => {
			let bytes = 1024
			let callback = sinon.spy()
			window.navigator.webkitPersistentStorage.requestQuota.callsArgWith(1,bytes)
			window.requestFileSystem.callsArgWith(2, {})
			fs.init(1024, callback)

			expect(callback.calledOnce).to.be.ok
		})


	})



})