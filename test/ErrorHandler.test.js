import { expect } from 'chai'
import sinon from 'sinon'
import ErrorHandler from '../src/ErrorHandler'

describe('Test Class ErrorHandler', () => {
	
	describe('Test static method generate',() => {

		let logger = sinon.spy()

		before(() => {
			sinon.stub(ErrorHandler, 'logger', logger)
		})

		after(() => {
			ErrorHandler.logger.restore()
		})

		it('It should be a function', () => {
			expect(ErrorHandler.generate).to.be.a('function')
		})

		it('It should return a function, it is an error handler', () => {
			expect(ErrorHandler.generate()).to.be.a('function')
		})

		it('Returned error handler should call the passed in callback , and looger error', () => {
			let callback = sinon.spy()
			let error = {code:10}
			ErrorHandler.generate('', callback)(error)
			expect(callback.calledOnce).to.be.ok
			expect(logger.calledOnce).to.be.ok
		})
	})

	describe('Test static method logger', () => {

		it('It should be a function', () => {
			expect(ErrorHandler.logger).to.be.a('function')
		})

	})
})