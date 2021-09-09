import { jest } from '@jest/globals'
import { Readable, Writable, Transform } from 'stream'
export default class TestUtil {

    // 00:01
    // 00:02
    // 00:03
    


    static mockDateNow(mockImplementationPeriods) {

        const now = jest.spyOn(global.Date, global.Date.now.name)

        mockImplementationPeriods.forEach(time => {
            now.mockReturnValueOnce(time);
        })

    }

    static getTimeFromDate(dateString) {
        return new Date(dateString).getTime()
    }


    static generateReadableStream(data) {
        return new Readable({
            objectMode: true,
            read() {
                for (const item of data) {
                    this.push(item)
                }

                this.push(null)
            }
        })
    }
    static generateWritableStream(onData) {
        return new Writable({
            objectMode: true,
            write(chunk, encondig, cb) {
                onData(chunk)
                
                cb(null, chunk)
            }
        })
    }

    static generateTransformStream(onData) {
        // async function *(source) {
        //     for await(const chunk of data) {
        //          yield chunk   
        //     }
        // }

        return new Transform({
            objectMode: true,
            transform(chunk, enconding, cb) {
                onData(chunk)
                cb(null, chunk)
            }
        })
    }
}