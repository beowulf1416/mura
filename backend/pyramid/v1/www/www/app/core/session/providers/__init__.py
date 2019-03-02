import logging
log = logging.getLogger(__name__)


def get_provider(request):
    log.debug('www.app.core.session.providers.get_provider()')

    store = request.store
    if (not store.provider_exists('data.provider.common')):
        connection_name = request.registry.settings['data.connections.common']
        connection = store.get_connection(connection_name)
        connection_type = connection['type']
        if (connection_type == 'postgresql'):
            from www.app.core.session.providers.postgresql import SessionPostgreSQL
            provider = SessionPostgreSQL(store.get_connection(connection_name))
            store.add_provider('data.provider.common', provider)
        else:
            raise RuntimeError('unknown connection type')
    return store.get_provider('data.provider.common')