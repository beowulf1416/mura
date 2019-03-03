import logging
log = logging.getLogger(__name__)


class User:
    def __init__(self, provider, **kwargs):
        log.debug('User::__init__()')
        self.__provider = provider

        self.__id = ''

        if (kwargs is not None):
            for k, v in kwargs.items():
                if (k == 'id'):
                    self.__id = v


    def get_id(self):
        return self.__id

    def authenticate(self, email, password):
        log.debug('User::authenticate()')
        
        errors = []
        if email == '':
            errors.append('Email is required')

        if password == '':
            errors.append('Password is required')

        if len(errors) > 0:
            message = '. '.join(errors)
            raise RuntimeError(message)
        else:
            return self.__provider.user_authenticate(email, password)

    
    def get_by_email(self, email):
        log.debug('User::get_by_email()')

        errors = []
        if email == '':
            errors.append('Email is required')

        if len(errors) > 0:
            message = '. '.join(errors)
            raise RuntimeError(message)
        else:
            user_id = self.__provider.user_get_by_email(email)
            self._id = user_id
            return self._id


    def get_clients(self, user_id):
        log.debug('User::get_clients()')

        errors = []
        if user_id == '':
            errors.append('User Id is required')

        if len(errors) > 0:
            message = '. '.join(errors)
            raise RuntimeError(message)
        else:
            self._id = user_id
            clients = self.__provider.user_get_clients(user_id)
            return clients

    def select_client(self, user_id, client_id):
        log.debug('User::select_client()')

        errors = []
        if user_id == '':
            errors.append('User Id is required')

        if client_id == '':
            errors.append('Client Id is required')

        if len(errors) > 0:
            message = '. '.join(errors)
            raise RuntimeError(message)
        else:
            self._id = user_id
            self._client_id = client_id
            self.__provider.user_select_client(user_id, client_id)