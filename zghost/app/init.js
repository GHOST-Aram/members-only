import express from 'express'
import morgan from "morgan"
import debug from "debug"
import httpProtocol from 'http'

export const app = express()
export const logger = () => morgan('dev')
export const debugg = debug('members-only:server')
export const http = httpProtocol

export { express }