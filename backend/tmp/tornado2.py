from tornado import web
from tornadio2 import SocketConnection, TornadioRouter, SocketServer

# Declare connection class
class MyConnection(SocketConnection):
    def on_open(self, info):
        print('Client connected')

    def on_message(self, msg):
        print('Got', msg)
        self.send(msg)

    def on_close(self):
        print('Client disconnected')

# Create TornadIO2 router
router = TornadioRouter(MyConnection)

# Create Tornado application with urls from router
app = web.Application(router.urls, socket_io_port=8001)

# Start server
if __name__ == '__main__':
    SocketServer(app)