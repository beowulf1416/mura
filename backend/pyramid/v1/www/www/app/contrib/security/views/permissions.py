import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config


def permissions_list(request):
    log.info('view: security.permissions')

    params = request.json_body
    item_count = params['items'] if 'items' in params else 10
    offset = params['offset'] if 'offset' in params else 0

    try:
        provider_name = request.registry.settings['data.provider.clients']
        provider = request.data.get_provider(provider_name)

        result = provider.query(
            'security.permissions',
            (item_count, offset)
        )
        permissions = [{ 
            'id':r[0], 
            'active':r[1], 
            'created':r[2], 
            'name':r[3], 
            'description':r[4]  
        } for r in result['result'] ]

        return {
            'status': True,
            'data': {
                'permissions': permissions
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