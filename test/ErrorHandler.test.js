import { expect } from 'chai'
import sinon from 'sinon'
import ErrorHandler from '../src/ErrorHandler'

describe('Test Class ErrorHandler', () => {
    let log
    let Constants

    before(() => {
        log = sinon.spy()
        Constants = {
            Default: {
                DEFAULT_SIZE: 10*1024*1024,
                ROOT: '/',
                ERROR:'error'
            },
            FileError: {
                QUOTA_EXCEEDED_ERR: 10,
                NOT_FOUND_ERR: 1,
                SECURITY_ERR: 2,
                INVALID_MODIFICATION_ERR: 9,
                INVALID_STATE_ERR: 7
            }
        }

        ErrorHandler.__Rewire__('Constants',Constants)
        ErrorHandler.__Rewire__('./Logger',{
            newInstance: ({}) => {
                return {
                    log: log
                }
            }
        })

    })

    after(() => {})

    describe('Test method on',() => {

        it('It should be a function', () => {
            expect(ErrorHandler.on).to.be.a('function')
        })

        it('It should return a msg and its type should be string', () => {
            let msg = ErrorHandler.on({code:Constants.FileError.QUOTA_EXCEEDED_ERR},'test')
            expect(log.calledOnce).to.be.ok
            expect(msg).to.be.a('string')
        })
    })

})