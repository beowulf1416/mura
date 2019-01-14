import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config


@view_config(
    route_name='security.users',
    renderer='json',
    request_method=('POST','OPTIONS'),
    permission='security.users.list'
)
def users_list(request):
    log.info('view: security.users')

    return {
        'status': False,
        'messages': [],
        'data': {}
    }