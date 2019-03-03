import logging
log = logging.getLogger(__name__)

def includeme(config):
    log.info('included: www.app.contrib.clients.views')

    config.add_route(
        'clients.list',
        '/api/v1/clients'
    )

    config.add_route(
        'client.get',
        '/api/v1/clients/view'
    )

    config.add_route(
        'clients.add',
        '/api/v1/clients/add'
    )

    config.add_route(
        'organizations.list',
        '/api/v1/clients/organizations'
    )

    config.add_route(
        'organizations.add',
        '/api/v1/clients/organizations/add'
    )

    config.add_route(
        'organizations.tree',
        '/api/v1/clients/organizations/tree'
    )