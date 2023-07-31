import express from 'express'
import morgan from "morgan"
import debug from "debug"
import http from 'http'
import { Router } from 'express'

export const app = express()
export const logger = () => morgan('dev')
export const debugg = debug('members-only:server')

export { express, Router, http }