import Busboy from 'busboy'
import fs from 'fs'
import { pipeline } from 'stream/promises'
import { logger } from './logger.js'
export default class UploadHandler {
    constructor({ io, socketId, downloadsFolder, messageTimeDelay = 200 }) {
        this.io = io
        this.socketId = socketId
        this.downloadsFolder = downloadsFolder
        this.ON_UPLOAD_EVENT = 'file-upload'
        this.messageTimeDelay = messageTimeDelay
    }

    canExecute(lastExecution) {
        return (Date.now() - lastExecution) >= this.messageTimeDelay
    }

    handleFileBytes(filename) {
        this.lastMessageSent = Date.now()

        async function* handleData(source) {
            let processedAlready = 0

            for await (const chunk of source) {
                yield chunk
                
                processedAlready += chunk.length
                if (!this.canExecute(this.lastMessageSent)) {
                    continue;
                }

                this.lastMessageSent = Date.now()
                
                this.io.to(this.socketId).emit(this.ON_UPLOAD_EVENT, { processedAlready, filename })
                logger.info(`File [${filename}] got ${processedAlready} bytes to ${this.socketId}`)
            }
        }

        return handleData.bind(this)
    }
    async onFile(fieldname, file, filename) {
        const saveTo = `${this.downloadsFolder}/${filename}`

        await pipeline(
            // 1o passo, pegar uma readable stream!
            file,
            // 2o passo, filtrar, converter, transformar dados!
            this.handleFileBytes.apply(this, [filename]),
            // 3o passo, é saida do processo, uma writable stream!
            fs.createWriteStream(saveTo)
        )

        logger.info(`File [${filename}] finished`)
    }

    registerEvents(headers, onFinish) {
        const busboy = new Busboy({ headers })
        busboy.on("file", this.onFile.bind(this))
        busboy.on("finish", onFinish)

        return busboy
    }

}