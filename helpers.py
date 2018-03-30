import smtplib
import json

def send_mail(subject, text):
    data = json.load(open('/home/ec2-user/text.json'))

    gmail_user = data['gmail_user']
    gmail_passwd = data['gmail_passwd']

    FROM = gmail_user
    TO = ['hellovictorlee@gmail.com']
    SUBJECT = subject
    TEXT = text
    BODY = '\r\n'.join([
            'To: %s' % TO,
            'From: %s' % gmail_user,
            'Subject: %s' % SUBJECT,
            '',
            TEXT
            ])
    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.ehlo()
        server.ehlo
        server.login(gmail_user, gmail_passwd)
        server.sendmail(FROM, TO, BODY)
        server.close()
        print('Email sent')
    except:
        print('Fail sending email')
