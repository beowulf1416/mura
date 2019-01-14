import logging
log = logging.getLogger(__name__)

class UserMail:
    def __init__(self):
        log.info('UserMail::__init__()')

    def send_verify_mail(self, token):
        log.info('UserMail::send_verify_mail()')

    def send_password_reset_mail(self, token):
        log.info('UserMail::send_password_reset_mail()')