import logging
log = logging.getLogger(__name__)

import os
import json
import importlib

import www

class Store(object):
    __instance = None

    __conf = {}
    __connectors = {}
    __providers = {}


    def __new__(cls):
        if (Store.__instance is None):
            log.debug('Store::__new__()')

            conf_path = os.path.join(
                os.path.dirname(www.__file__),
                'etc',
                'data.json'
            )
            log.debug('using config: ' + conf_path)

            if (os.path.isfile(conf_path)):
                Store.__conf = json.loads(open(conf_path, 'r').read())

            Store.__instance = object.__new__(cls)
        return Store.__instance


    def get_connection(self, key):
        log.debug('Store::get_connection')
        try:
            return self.__connectors[key]
        except KeyError:
            log.warn('Connector %s is not found. Attempting to create.', key)
            c = self._create_connection(key)
            if (c is None):
                raise RuntimeError('Unable to create %s connector' % (key))
            else:
                self.__connectors[key] = c
                return self.__connectors[key]
    

    def _create_connection(self, key):
        log.debug('Store::_create_connection()')
        try:
            connector_config = self.__conf['connections'][key]
            connector_type = connector_config['type']
            module = importlib.import_module('.' + connector_type, 'www.app.core.data.connectors')
            connection = module.create_connector(connector_config)
            return {
                'connection': connection,
                'type': connector_type
            }
        except KeyError:
            raise RuntimeError('Connector configuration for %s is incomplete or missing' % (key))


    def add_provider(self, key, provider):
        log.debug('Store::add_provider()')
        if key in self.__providers.keys():
            log.warn('Provider %s already exists', key)
        else:
            self.__providers[key] = provider


    def provider_exists(self, key):
        log.debug('Store::provider_exists()')
        return key in self.__providers.keys()


    def get_provider(self, key):
        log.debug('Store::get_provider()')
        return self.__providers[key]
