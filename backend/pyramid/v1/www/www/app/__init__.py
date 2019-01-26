import logging
log = logging.getLogger(__name__)

from pyramid.config import Configurator
import json

from www.app.core.session import SessionFactory
from www.app.core.security.authentication_policy import AuthenticationPolicy
from www.app.core.security.authorization_policy import AuthorizationPolicy

import json
from pyramid.renderers import JSON
import datetime

from www.app.core.data.data import Data


def includeme(config):
    log.info('included: www.app')

    settings = config.get_settings()
    cookie_name = settings['app.cookie']

    provider_name = settings['data.provider.security']
    data = Data()
    provider = data.get_provider(provider_name)

    config.set_session_factory(SessionFactory(
        json,
        cookie_name
    ))

    config.set_authentication_policy(AuthenticationPolicy())
    config.set_authorization_policy(AuthorizationPolicy(provider))

    # include json datetime renderer
    json_renderer = JSON()
    def datetime_adapter(obj, request):
        return obj.isoformat()
    json_renderer.add_adapter(datetime.datetime, datetime_adapter)
    config.add_renderer('json', json_renderer)

    config.include('www.app.core')
    
    config.include('www.app.core.security')
    config.include('www.app.core.security.views')

    # config.include('www.app.core.session')

    config.include('www.app.core.data')

    config.scan()