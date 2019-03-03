import logging
log = logging.getLogger(__name__)

class Organization:

    def __init__(self, **kwargs):
        log.debug('Organization::__init__()')

        if (kwargs is not None):
            for k, v in kwargs.iteritems():
                if (k == 'id'):
                    self._id = v
                elif (k == 'name'):
                    self._name = v
                elif (k == 'description'):
                    self._description = v
                elif (k == 'client_id'):
                    self._client_id = v
                elif (k == 'parent_id'):
                    self._parent_id == v

    def save(self, provider):
        log.debug('Organization::save()')
    
    def get_by_id(self, id):
        log.debug('Organization::get_by_id()')

        self._id == id