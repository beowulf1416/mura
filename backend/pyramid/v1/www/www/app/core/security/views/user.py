import logging
log = logging.getLogger(__name__)

import secrets

from pyramid.view import view_config
from pyramid.security import remember, forget

from www.app.core.security.providers import get_provider
from www.app.core.security.classes.user import User
from www.app.core.mail.user import UserMail


@view_config(
    route_name='user.register',
    renderer='json',
    request_method='POST'
)
def register(request):
    log.info('view: user.register')

    params = request.json_body
    email = params['email'] if 'email' in params else ''
    password = params['password'] if 'email' in params else ''
    # token = secrets.token_urlsafe(int(request.registry.settings['token.signup.length']))

    if (email == ''):
        return {
            'status': False,
            'messages': [
                {
                    'type': 'error',
                    'text': 'Email address is required'
                }
            ],
            'data': {}
        }

    if (password == ''):
        return {
            'status': False,
            'messages': [
                {
                    'type': 'error',
                    'text': 'Password is required'
                }
            ],
            'data': {}
        }

    try:
        provider_name = request.registry.settings['data.provider.security']
        provider = request.data.get_provider(provider_name)

        result = provider.query(
            'user.register', 
            (email, password)
        )
        (token, ) = result['result'][0]
        
        um = UserMail()
        um.send_verify_mail(token)

        return {
            'status': True,
            'messages': [
                {
                    'type': 'info',
                    'text': "A verification has been sent to '%s'" % (email)
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
                    'text': 'An error occured.'
                }
            ],
            'data': {}
        }


@view_config(
    route_name='user.verify',
    renderer='json',
    request_method='POST'
)
def verify(request):
    log.info('view: user.verify')

    params = request.json_body
    token = params['token'] if 'token' in params else ''

    if (token == ''):
        return {
            'status': False,
            'messages': [
                {
                    'type': 'error',
                    'text': 'Verification token is required'
                }
            ],
            'data': {}
        }

    try:
        provider_name = request.registry.settings['data.provider.security']
        provider = request.data.get_provider(provider_name)
    
        result = provider.query(
            'email.verify', 
            (token, )
        )
        (verified, ) = result['result'][0]
        if (verified):
            return {
                'status': True,
                'messages': [
                    {
                        'type': 'info',
                        'text': 'Email address verified'
                    }
                ],
                'data': {}
            }
        else:
            return {
                'status': False,
                'messages': [
                    {
                        'type': 'error',
                        'text': 'Verification token not found'
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
                    'text': 'An error occured.'
                }
            ],
            'data': {}
        }


@view_config(
    route_name='user.clients',
    renderer='json',
    request_method='POST'
)
def clients(request):
    log.info('view: user.clients')

    try:
        params = request.json_body
        user_id = params['user_id'] if 'user_id' in params else ''

        session = request.session
        user_id = session['user_id']

        provider = get_provider(request)
        user = User(provider)
        result = user.get_clients(user_id)
        clients = [{ 'id': r[0], 'name': r[1] }  for r in result ]

        return {
            'status': True,
            'data': {
                'clients': clients
            }
        }
    except Exception as e:
        log.error(e)
        return {
            'status': False,
            'messages': [
                {
                    'type': 'error',
                    'text': 'An error occured.'
                }
            ],
            'data': {}
        }


@view_config(
    route_name='user.password.reset.request',
    renderer='json',
    request_method='POST'
)
def password_request(request):
    log.info('view: user.password.reset.request')

    params = request.json_body
    email = params['email'] if 'email' in params else ''

    if (email == ''):
        return {
            'status': False,
            'messages': [
                {
                    'type': 'error',
                    'text': 'Email address is required'
                }
            ],
            'data': {}
        }

    try:
        provider_name = request.registry.settings['data.provider.security']
        provider = request.data.get_provider(provider_name)
    
        result = provider.query(
            'user.password.reset.request', 
            (email, )
        )
        (token, ) = result['result'][0]

        um = UserMail()
        um.send_password_reset_mail(token)

        return {
            'status': True,
            'messages': [
                {
                    'type': 'info',
                    'text': 'Password reset request sent'
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
                    'text': 'An error occured.'
                }
            ],
            'data': {}
        }


@view_config(
    route_name='user.password.reset',
    renderer='json',
    request_method='POST'
)
def password_reset(request):
    log.info('view: user.password.reset')

    params = request.json_body
    token = params['token'] if 'token' in params else ''
    password = params['password'] if 'password' in params else ''

    if (token == ''):
        return {
            'status': False,
            'messages': [
                {
                    'type': 'error',
                    'text': 'Password reset token is required'
                }
            ],
            'data': {}
        }

    if (password == ''):
        return {
            'status': False,
            'messages': [
                {
                    'type': 'error',
                    'text': 'Password is required'
                }
            ],
            'data': {}
        }

    try:
        provider_name = request.registry.settings['data.provider.security']
        provider = request.data.get_provider(provider_name)
    
        provider.query(
            'user.password.reset', 
            (token, password)
        )

        return {
            'status': True,
            'messages': [
                {
                    'type': 'info',
                    'text': 'success'
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
                    'text': 'An error occured.'
                }
            ],
            'data': {}
        }



@view_config(
    route_name='user.password.token.validate',
    renderer='json',
    request_method='POST'
)
def password_token_validate(request):
    log.info('view: user.password.token.validate')

    params = request.json_body
    token = params['token'] if 'token' in params else ''

    if (token == ''):
        return {
            'status': False,
            'messages': [
                {
                    'type': 'error',
                    'text': 'Password token is required'
                }
            ],
            'data': {}
        }

    try:
        provider_name = request.registry.settings['data.provider.security']
        provider = request.data.get_provider(provider_name)
    
        result = provider.query(
            'user.password.token.validate', 
            (token, )
        )
        (email, ) = result['result'][0]
        return {
            'status': False if email == '' else True,
            'messages': [
                {
                    'type': 'info',
                    'text': 'Password token is not valid' if email == '' else 'Password token is valid'
                }
            ],
            'data': {
                'email': email
            }
        }
    except Exception as e:
        log.error(e)
        return {
            'status': False,
            'messages': [
                {
                    'type': 'error',
                    'text': 'An error occured.'
                }
            ],
            'data': {}
        }


@view_config(
    route_name='user.signin',
    renderer='json',
    request_method='POST'
)
def signin(request):
    log.info('view: user.signin')

    params = request.json_body
    email = params['email'] if 'email' in params else ''
    password = params['password'] if 'email' in params else ''

    try:
        provider = get_provider(request)
        user = User(provider)
        authentic = user.authenticate(email, password)
        if (authentic):
            user_id = user.get_by_email(email)
            remember(request, user_id)

            return {
                'status': True,
                'messages': [
                    {
                        'type': 'info',
                        'text': "User successfully authenticated"
                    }
                ],
                'data': {
                    'authenticated': True,
                    # 'permissions': permissions
                }
            }
        else:
            return {
                'status': False,
                'messages': [
                    {
                        'type': 'info',
                        'text': "Email and password combination incorrect"
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
            ],
            'data': {}
        }


@view_config(
    route_name='user.signout',
    renderer='json',
    request_method='POST'
)
def signout(request):
    log.info('view: user.signout')

    try:
        forget(request)

        return {
            'status': True,
            'messages': [
                {
                    'type': 'info',
                    'text': 'Signed out'
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
                    'text': 'An error occured while processing your request'
                }
            ],
            'data': {}
        }



@view_config(
    route_name='user.permissions',
    renderer='json',
    request_method=('POST','OPTIONS'),
    # permission='user.authenticated'
)
def permissions(request):
    log.info('view: user.permissions')

    try:
        session = request.session
        # session_id = session.get_session_id()
        user_id = session['user_id']
        client_id = session['client_id']

        # provider_name = request.registry.settings['data.provider.security']
        # provider = request.data.get_provider(provider_name)
    
        # result = provider.query(
        #     'user.permissions', 
        #     (session_id, )
        # )
        # log.debug(result)
        provider = get_provider(request)
        user = User(provider)
        result = user.get_permissions(user_id, client_id)
        permissions = [ r[0] for r in result ]

        return {
            'status': True,
            'messages': [],
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
            ],
            'data': {}
        }


@view_config(
    route_name='user.client.select',
    renderer='json',
    request_method=('POST','OPTIONS')
)
def client_select(request):
    log.info('view: user.client.select')

    params = request.json_body
    client_id = params['client_id'] if 'client_id' in params else ''

    if (client_id == ''):
        return {
            'status': False,
            'messages': [
                {
                    'type': 'error',
                    'text': 'Client Id is required'
                }
            ],
            'data': {}
        }

    try:
        session = request.session
        session['client_id'] = client_id

        return {
            'status': True,
            'messages': [],
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
            ],
            'data': {}
        }
