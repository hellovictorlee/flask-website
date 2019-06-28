import os
from project import application

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8080))
    socketio.run(application)
