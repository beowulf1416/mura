import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config

@view_config(
    route_name='security.roles',
    renderer='json',
    request_method=('POST','OPTIONS'),
    permission='security.users.list'
)
def roles_list(request):
    log.info('view: security.roles')

    params = request.json_body
    item_count = params['items'] if 'items' in params else 10
    offset = params['offset'] if 'offset' in params else 0

    try:
        provider_name = request.registry.settings['data.provider.clients']
        provider = request.data.get_provider(provider_name)

        result = provider.query(
            'security.roles',
            (item_count, offset)
        )
        roles = [{ 
            'id':r[0], 
            'active':r[1], 
            'created':r[2], 
            'name':r[3],
            'description': r[4]
        } for r in result['result'] ]

        return {
            'status': True,
            'data': {
                'roles': roles
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
