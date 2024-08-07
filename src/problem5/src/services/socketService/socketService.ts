import * as http from 'http'
import * as io from 'socket.io'
import * as express from 'express'
import * as _ from 'lodash'
import { SOCKET_EVENTS } from '@/services/socketService/consts/event'
import { config } from '@/config'
import { IConnection } from '@/services/socketService/schema'
const { Emitter } = require(`${'@socket.io/redis-emitter'}`)
const { createAdapter } = require(`${'@socket.io/redis-adapter'}`)
// import { createAdapter } from '@socket.io/redis-adapter'
import { Server, Socket } from 'socket.io'
import { createClient } from 'redis'
import cluster from 'cluster'

export class SocketService {
	private server: http.Server
	private socketServer: Server
	private sockets: { [x: string]: Socket } = {}
	public connections: { [key: string]: IConnection } = {}
	private adapterConstructor: ReturnType<typeof createAdapter>
	private socketEmitter: ReturnType<typeof Emitter>
	// private socketEmitter: Emitter;
	private pubClientRedis: ReturnType<typeof createClient>

	async init(app: express.Application) {
		// 1. Create Server
		this.server = http.createServer(app)
		this.socketServer = new Server(this.server, {
			allowEIO3: true,
			cors: {
				origin: true,
				credentials: true,
			},
			pingTimeout: 60000,
			pingInterval: 20000,
			connectionStateRecovery: {
				// the backup duration of the sessions and the packets
				maxDisconnectionDuration: 2 * 60 * 1000,
				// whether to skip middlewares upon successful recovery
				skipMiddlewares: true,
			},
		})
		// 2. Auth middleware
		this.socketServer.use(this.authMiddleware.bind(this))

		await this.connectToRedis()
		// 3. Handle Connection
		this.socketServer.on(SOCKET_EVENTS.CONNECTION, this.onConnection.bind(this))
		// 4. Run Socket Server
		this.server.listen(config.socket.port, () =>
			console.log(`Socket Server is running on port ${config.socket.port}`),
		)
		// this.socketServer.listen(parseInt(config.socket.port))

		this.socketServer.on(SOCKET_EVENTS.CONNECT_ERROR, (err) => {
			console.log('Connect Error: ', err)
		})
	}

	private async connectToRedis(): Promise<void> {
		const pubClient = createClient({
			url: `redis://${process.env.REDIS_REMOTE_URL}:${process.env.REDIS_REMOTE_PORT}`,
		}) //use to publish message
		const subClient = pubClient.duplicate() // use to receive message

		pubClient.on('connect', () => {
			global.console.log('Redis connected')
		})

		await Promise.all([pubClient.connect(), subClient.connect()])

		this.adapterConstructor = createAdapter(pubClient, subClient)
		this.socketServer.adapter(this.adapterConstructor)
		this.socketEmitter = new Emitter(pubClient)
		this.pubClientRedis = pubClient
	}

	private async authMiddleware(socket: io.Socket, next: any) {
		console.log('socket: ', socket)
		try {
			return next()
		} catch (err) {
			return next(err)
		}
	}

	private async onConnection(socket: Socket) {
		console.log('======================================')
		console.log(
			'socket.on: worker_id: ',
			cluster?.worker?.id || 'main',
			' user_id: ',
			_.get(socket, 'uid'),
		)
		const req = socket.request
		const client_ip =
			req.headers['x-forwarded-for'] ||
			req.connection.remoteAddress ||
			req.socket.remoteAddress
		socket.join(_.get(socket, 'uid'))
		// socket.on(SOCKET_EVENTS.DISCONNECT, this.handleSocketEvent(this.onClientDisconnect, socket));
		socket.on('disconnect', (reason) => {
			console.log('disconnect => reason: ', reason) // "ping timeout"
			this.onClientDisconnect(socket)
		})

		this.handleSocketEvents(socket)

		socket.on('emit_testing', async (data) => {
			console.log('emit_testing: ', data)
			if (data.user_id) {
				console.log('hit - socket_emit_testing')
				this.socketServer
					.in(data.user_id)
					.emit('socket_emit_testing', { from: 'socket_room', ...data })
				this.socketEmitter
					.in(data.user_id)
					.emit('socket_emit_testing', { from: 'redis_emitter', ...data })
			}
		})
	}

	public emitToUser(userId: string, key: string, data: any) {
		this.socketServer.in(userId).emit(key, data)
	}
	private onClientDisconnect(socket: io.Socket) {
		// 1. Clear socket
	}

	private handleSocketEvents(socket: Socket) {
		socket.on('online', async (data: any) => {})
	}

	sendToChannel(channel: string, msg: any, event?: string) {
		console.log('send to channel', channel, msg)
		this.socketServer.to(channel).emit(event || 'message', msg)
	}
}
