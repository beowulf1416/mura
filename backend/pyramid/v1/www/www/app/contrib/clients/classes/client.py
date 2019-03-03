import logging
log = logging.getLogger(__name__)


class Client:

    def __init__(self, provider, **kwargs):
        log.debug('Client::__init__()')
        self.__provider = provider

        self.__id = ''
        self.__name = ''
        self.__description = ''

        if (kwargs is not None):
            for k, v in kwargs.items():
                if (k == 'id'):
                    self.__id = v
                elif (k == 'name'):
                    self.__name = v
                elif (k == 'description'):
                    self.__description = v


    def get_by_id(self, id):
        log.debug('Client::get_by_id()')
        result = self.__provider.get_client(id)
        r = result['result'][0]
        
        self.__id = r[0]
        self.__active = r[1]
        self.__created = r[2]
        self.__name = r[3]
        self.__description = r[4]

    def get_id(self):
        return self.__id

    def is_active(self):
        return self.__active

    def get_created(self):
        return self.__created

    def get_name(self):
        return self.__name

    def get_description(self):
        return self.__description

    def add(self, name, description):
        log.debug('Client::add()')
        self.__name = name
        self.__description = description

        errors = []
        if self.__name == '':
            errors.append('Client name is required')

        if len(errors) > 0:
            message = '. '.join(errors)
            raise RuntimeError(message)
        else:
            self.__provider.add_client(self.__name, self.__description)

    def get_all_paged(self, items, offset):
        log.debug('Client::get_all_paged()')
        results = self.__provider.get_clients_paged(items, offset)
        clients = [{
            'id': r[0],
            'active': r[1],
            'created': r[2],
            'name': r[3],
            'description': r[4]
        } for r in results['result'] ]
        count = results['count']
        return {
            'clients': clients,
            'count': count
        }

    
    def get_list(self):
        log.debug('Client::get_list()')
        results = self.__provider.get_clients_list()
        clients = [{
            'id': r[0],
            'name': r[1]
        } for r in results ]
        return clients