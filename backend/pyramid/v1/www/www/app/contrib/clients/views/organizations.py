import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import json

from www.app.contrib.clients.classes.organization import Organization


@view_config(
    route_name='organizations.list',
    renderer='json',
    request_method=('POST','OPTIONS'),
    permission='organizations.list'
)
def organizations(request):
    log.info('view: organizations.list')

    params = request.json_body
    pager = params['pager'] if 'pager' in params else {'items': 10, 'offset': 0}
    filter = params['filter'] if 'filter' in params else []
    sort = params['sort'] if 'sort' in params else [{'key': 'id', 'direction': 'sort.none'}]
    client_id = params['client_id'] if 'client_id' in params else ''

    try:
        provider_name = request.registry.settings['data.provider.clients']
        provider = request.data.get_provider(provider_name)

        result = provider.query(
            'organizations.list',
            (pager, filter, sort, client_id)
        )
        organizations = [{ 'id':r[0], 'name':r[3] } for r in result['result'] ]
        # log.debug(result)
        return {
            'status': True,
            'data': {
                'organizations': organizations
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
    route_name='organizations.add',
    renderer='json',
    request_method=('POST','OPTIONS'),
    permission='organizations.add'
)
def organizations_add(request):
    log.info('view: organizations.add')

    params = request.json_body
    client_id = params['client_id'] if 'client_id' in params else ''
    name = params['name'] if 'name' in params else ''
    description = params['description'] if 'description' in params else ''
    parent_id = params['parent_id'] if 'parent_id' in params else ''

    o = Organization(
        client_id=client_id,
        name=name,
        description=description,
        parent_id=parent_id
    )

    errors = []
    if (client_id == ''):
        errors.append('Client Id is required')

    if (name == ''):
        errors.append('Organization Name is required')

    # if (parent_id == ''):
    #     errors.append('Parent Organization Id is required')

    if (len(errors) > 0):
        messages = [{ 'type': 'error', 'text': e } for e in errors ]
        return {
            'status': False,
            'messages': messages
        }

    try:
        provider_name = request.registry.settings['data.provider.clients']
        provider = request.data.get_provider(provider_name)

        result = provider.query(
            'organizations.add',
            (client_id, name, description)
        )
        # organizations = [{ 'id':r[0], 'name':r[3] } for r in result['result'] ]
        log.debug(result)
        return {
            'status': True,
            'data': {
                'organization': True
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
    route_name='organizations.tree',
    renderer='json',
    request_method=('POST','OPTIONS'),
    permission='organizations.tree'
)
def organizations_tree(request):
    log.info('view: organizations.tree')
