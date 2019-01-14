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
        log.debug(result)
        return {
            'status': False,
            'messages': [
                {
                    'type': 'error',
                    'text': 'clients.list'
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