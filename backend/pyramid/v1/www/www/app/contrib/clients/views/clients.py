import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import json


@view_config(
    route_name='clients.list',
    renderer='json',
    request_method=('POST','OPTIONS'),
    permission='clients.list'
)
def clients(request):
    log.info('view: clients.list')

    params = request.json_body
    pager = params['pager'] if 'pager' in params else {'items': 10, 'offset': 0}
    filter = params['filter'] if 'filter' in params else []
    sort = params['sort'] if 'sort' in params else [{'key': 'id', 'direction': 'sort.none'}]

    try:
        provider_name = request.registry.settings['data.provider.clients']
        provider = request.data.get_provider(provider_name)

        result = provider.query(
            'clients.list',
            (pager, filter, sort)
        )
        clients = [{ 'id':r[0], 'name':r[3] } for r in result['result'] ]
        # log.debug(result)
        return {
            'status': True,
            'data': {
                'clients': clients
            },
            'messages': [
                {
                    'type': 'info',
                    'text': 'success'
                }
            ]
        }
    except KeyError as e:
        log.error('missing key: %s', e)
        return {
            'status': False,
            'messages': [
                {
                    'type': 'error',
                    'text': 'An error occured'
                }
            ]
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
    route_name='client.get',
    renderer='json',
    request_method=('POST','OPTIONS'),
    permission='clients.list'
)
def client_get(request):
    log.info('view: client.get')

    params = request.json_body
    client_id = params['client_id'] if 'client_id' in params else -1

    if (client_id == -1):
        return {
            'status': False,
            'messages': [
                {
                    'type': 'error',
                    'text': 'Client id is required'
                }
            ]
        }

    try:
        provider_name = request.registry.settings['data.provider.clients']
        provider = request.data.get_provider(provider_name)

        result = provider.query(
            'client.get',
            (client_id, )
        )
        (client) = result[0]
        return {
            'status': True,
            'data': {
                'client': {
                    'id': client[0],
                    'active': client[1],
                    'created': client[2],
                    'name': client[3],
                    'description': client[4]
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
            



@view_config(
    route_name='clients.add',
    renderer='json',
    request_method=('POST','OPTIONS'),
    permission='clients.add'
)
def clients_add(request):
    log.info('view: clients.add')

    params = request.json_body
    name = params['name'] if 'name' in params else ''
    description = params['description'] if 'description' in params else ''

    if (name == ''):
        return {
            'status': False,
            'messages': [
                {
                    'type': 'error',
                    'text': 'Client name is required'
                }
            ]
        }

    try:
        provider_name = request.registry.settings['data.provider.clients']
        provider = request.data.get_provider(provider_name)

        provider.query(
            'clients.add',
            (name, description)
        )

        return {
            'status': True,
            'messages': [
                {
                    'type': 'info',
                    'text': 'client added'
                }
            ],
            'data': {}
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