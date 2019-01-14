import logging
log = logging.getLogger(__name__)

import os
import json
import importlib

import www


def get_data(params):
    log.info('data.get_data()')
    return Data()

class Data(object):

    _conf = {}
    _connections = {}
    _providers = {}

    __instance = None

    def __new__(cls):
        if Data.__instance is None:
            Data.__instance = object.__new__(cls)
        return Data.__instance

    def __init__(self):
        log.info('Data::__init__()')

        conf_path = os.path.join(
            os.path.dirname(www.__file__),
            'etc',
            'data.json'
        )
        log.debug('using config: ' + conf_path)

        try:
            if (os.path.isfile(conf_path)):
                self._conf = json.loads(open(conf_path, 'r').read())
                # log.debug(self._conf)
        except IOError as e:
            log.error(e)


    def get_provider(self, name):
        log.info('Data::get_provider()')

        try:
            return self._providers[name]
        except KeyError:
            log.warn('Provider %s is not found. Attempting to create', name)
            self._providers[name] = self._create_provider(name)
            return self._providers[name]
        except Exception as e:
            log.error(e)
            raise e

    def _create_provider(self, name):
        log.info('Data::_create_provider()')

        try:
            provider_config = self._conf['providers'][name]
            connection_name = provider_config['connection']
            connector = self._get_connector(connection_name)

            module_name = provider_config['module']
            package_name = provider_config['package']

            module = importlib.import_module('.' + module_name, package_name)
            return module.create_provider(provider_config, connector)
        except KeyError:
            msg = 'Configuration for provider %s is incomplete or missing' % (name)
            log.error(msg)
            raise RuntimeError(msg)

    def _get_connector(self, name):
        log.info('Data::_get_connector()')

        try:
            return self._connections[name]
        except KeyError:
            log.warn('Connector %s is not found. Attempting to create', name)
            self._connections[name] = self._create_connector(name)
            return self._connections[name]

    def _create_connector(self, name):
        log.info('Data::_create_connector()')

        try:
            connector_config = self._conf['connections'][name]
            connector_type = connector_config['type']
            module = importlib.import_module('.' + connector_type, 'www.app.core.data.connectors')
            return module.create_connector(connector_config)
        except KeyError:
            msg = 'Connector configuration for %s is incomplete or missing' % (name)
            log.error(msg)
            raise RuntimeError(msg)
