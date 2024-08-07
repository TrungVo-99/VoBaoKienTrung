export interface IConnection {
	uid: string
	sockets: string[]

	conversation_ids: string[]
}
export interface IRoom {
	sockets: string[]
	uids: string[]
}
export interface ISocket {
	socketId: string
	room: string
	callerId: string
	receiverId: string

	caller?: any
	receiver?: any
	connectedTime: number
	allowToReceiveCash: boolean
	isTollFree: boolean
}
