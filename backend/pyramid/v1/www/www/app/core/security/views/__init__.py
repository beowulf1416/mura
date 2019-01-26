import logging
log = logging.getLogger(__name__)

def includeme(config):
    log.info('included: www.app.core.security.views')

    # user management
    config.add_route(
        'user.register',
        '/api/v1/user/register'
    )

    config.add_route(
        'user.verify',
        '/api/v1/user/verify'
    )

    config.add_route(
        'user.clients',
        '/api/v1/user/clients'
    )

    # password management
    config.add_route(
        'user.password.reset.request',
        '/api/v1/user/password/request'
    )

    config.add_route(
        'user.password.token.validate',
        '/api/v1/user/password/token'
    )

    config.add_route(
        'user.password.reset',
        '/api/v1/user/password/reset'
    )

    config.add_route(
        'user.signin',
        '/api/v1/user/signin'
    )

    config.add_route(
        'user.signout',
        '/api/v1/user/signout'
    )

    config.add_route(
        'user.permissions',
        '/api/v1/user/permissions'
    )