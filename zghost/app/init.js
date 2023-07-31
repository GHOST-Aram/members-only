import debug from "debug"
import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import http from 'http'
import morgan from "morgan"
import { Router } from 'express'

const app = express()
const logger = () => morgan('dev')
const debugg = debug('members-only:server')
const asyncHandler = expressAsyncHandler

export { 
    app,
    asyncHandler,
    debugg,
    express, 
    http,
    logger,
    Router, 
}