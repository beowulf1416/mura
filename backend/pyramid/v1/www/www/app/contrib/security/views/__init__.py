import logging
log = logging.getLogger(__name__)

from www.app.core.graphql import include_schemas


def includeme(config):
    log.info('included: www.app.contrib.security.views')

    # users
    config.add_route(
        'security.users',
        '/api/v1/security/users'
    )

    config.add_route(
        'security.user',
        '/api/v1/security/user'
    )

    # roles
    config.add_route(
        'security.roles',
        '/api/v1/security/roles'
    )

    # permissions
    config.add_route(
        'security.permissions',
        '/api/v1/security/permissions'
    )

    config.add_route(
        'security.permission',
        '/api/v1/security/permission'
    )

