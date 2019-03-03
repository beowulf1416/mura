import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import json

from www.app.contrib.clients.providers import get_provider
from www.app.contrib.clients.classes.client import Client


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
        provider = get_provider(request)
        client = Client(provider)
        result = client.get_all_paged(pager['items'], pager['offset'])
        clients = result['clients']
        count = result['count']
        return {
            'status': True,
            'data': {
                'clients': clients,
                'count': count
            },
            'messages': [
                {
                    'type': 'info',
                    'text': 'success'
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
        provider = get_provider(request)
        client = Client(provider)
        client.get_by_id(client_id)
        return {
            'status': True,
            'data': {
                'client': {
                    'id': client.get_id(),
                    'active': client.is_active(),
                    'created': client.get_created(),
                    'name': client.get_name(),
                    'description': client.get_description()
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

    try:
        provider = get_provider(request)
        client = Client(provider)
        client.add(name, description)

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
                    'text': str(e)
                }
            ]
        }