import logging
log = logging.getLogger(__name__)

def includeme(config):
    log.info('included: www.app.contrib.security.views')

    config.add_route(
        'security.users',
        '/api/v1/security/users'
    )