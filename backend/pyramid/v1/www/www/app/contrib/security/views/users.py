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

    params = request.json_body
    item_count = params['items'] if 'items' in params else 10
    offset = params['offset'] if 'offset' in params else 0

    try:
        provider_name = request.registry.settings['data.provider.clients']
        provider = request.data.get_provider(provider_name)

        result = provider.query(
            'security.users',
            (item_count, offset)
        )
        users = [{ 
            'id':r[0], 
            'active':r[1], 
            'created':r[2], 
            'verified':r[3], 
            'email':r[4], 
            'last_signed':r[5]  
        } for r in result['result'] ]

        return {
            'status': True,
            'data': {
                'users': users
            }
        }
    except Exception as e:
        log.error(e)
        return {
            'status': False,
            'messages': [
                {
                    'type': 'error',
                    'text': 'An error occured'
                }
            ]
        }


@view_config(
    route_name='security.user',
    renderer='json',
    request_method=('POST','OPTIONS'),
    permission='security.user.info'
)
def user(request):
    log.info('view: security.user')

    params = request.json_body
    user_id = params['user_id'] if 'user_id' in params else -1

    try:
        provider_name = request.registry.settings['data.provider.clients']
        provider = request.data.get_provider(provider_name)

        result = provider.query(
            'security.user',
            (user_id, )
        )
        (user) = result[0]

        return {
            'status': True,
            'data': {
                'user': {
                    'id': user[0],
                    'active': user[1],
                    'created': user[2],
                    'verified': user[3],
                    'email': user[4],
                    'last_signed': user[5]
                }
            }
        }
    except Exception as e:
        log.error(e)
        return {
            'status': False,
            'messages': [
                {
                    'type': 'error',
                    'text': 'An error occured'
                }
            ]
        }
