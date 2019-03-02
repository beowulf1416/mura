import logging
log = logging.getLogger(__name__)


def get_provider(request):
    log.debug('www.app.core.security.providers.get_provider()')

    store = request.store
    if (not store.provider_exists('data.provider.security')):
        connection_name = request.registry.settings['data.connections.security']
        connection = store.get_connection(connection_name)
        connection_type = connection['type']
        if (connection_type == 'postgresql'):
            from www.app.core.security.providers.postgresql import SecurityPostgreSQL
            provider = SecurityPostgreSQL(store.get_connection(connection_name))
            store.add_provider('data.provider.security', provider)
        else:
            raise RuntimeError('unsupported connection type')
    return store.get_provider('data.provider.security')