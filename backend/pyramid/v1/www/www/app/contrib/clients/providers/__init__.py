import logging
log = logging.getLogger(__name__)


def get_provider(request):
    log.debug('www.app.contrib.clients.providers.get_provider()')

    store = request.store
    if (not store.provider_exists('data.provider.clients')):
        connection_name = request.registry.settings['data.connections.clients']
        connection = store.get_connection(connection_name)
        connection_type = connection['type']
        if (connection_type == 'postgresql'):
            from www.app.contrib.clients.providers.postgresql import ClientsPostgreSQL
            provider = ClientsPostgreSQL(store.get_connection(connection_name))
            store.add_provider('data.provider.clients', provider)
        else:
            raise RuntimeError('unsupported connection type')
    return store.get_provider('data.provider.clients')
