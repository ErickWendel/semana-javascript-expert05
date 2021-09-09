import {
    describe,
    test,
    expect,
    jest
} from '@jest/globals'
import fs from 'fs'
import FileHelper from '../../src/fileHelper.js'

import Routes from './../../src/routes.js'

describe('#FileHelper', () => {

    describe('#getFileStatus', () => {
        test('it should return files statuses in correct format', async () => {
            const statMock = {
                dev: 16777220,
                mode: 33188,
                nlink: 1,
                uid: 501,
                gid: 20,
                rdev: 0,
                blksize: 4096,
                ino: 214187433,
                size: 188188,
                blocks: 368,
                atimeMs: 1630702590337.3582,
                mtimeMs: 1630702588444.2876,
                ctimeMs: 1630702588452.0754,
                birthtimeMs: 1630702588443.3276,
                atime: '2021-09-03T20:56:30.337Z',
                mtime: '2021-09-03T20:56:28.444Z',
                ctime: '2021-09-03T20:56:28.452Z',
                birthtime: '2021-09-03T20:56:28.443Z'
            }

            const mockUser = 'erickwendel'
            process.env.USER = mockUser
            const filename = 'file.png'

            jest.spyOn(fs.promises, fs.promises.readdir.name)
                .mockResolvedValue([filename])
            
            jest.spyOn(fs.promises, fs.promises.stat.name)
                .mockResolvedValue(statMock)
            
            const result = await FileHelper.getFilesStatus("/tmp")

            const expectedResult = [
                {
                    size: "188 kB",
                    lastModified: statMock.birthtime,
                    owner: mockUser,
                    file: filename
                }
            ]

            expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`)
            expect(result).toMatchObject(expectedResult)
        })
    })
})