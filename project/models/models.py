from sqlalchemy import Column, Integer, String, ForeignKey, Date
from .database import Base

class Contact(Base):
    __tablename__ = 'Contact'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=False, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    message = Column(String(1000), unique=False, nullable=False)

    def __init__(self, name=None, email=None, message=None):
        self.name = name
        self.email = email
        self.message = message

    # define a way to represent data
    def __repr__(self):
        return '<Contact %r>' % self.name

class Data(Base):
    __tablename__ = 'Data'
    id = Column(Integer, primary_key=True)
    mail_username = Column(String(50), unique=False, nullable=False)
    mail_password = Column(String(50), unique=False, nullable=False)

    def __init__(self, mail_username=None, mail_password=None):
        self.mail_username = mail_username
        self.mail_password = mail_password
