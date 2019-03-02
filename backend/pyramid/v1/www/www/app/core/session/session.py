import logging
log = logging.getLogger(__name__)

import secrets
import jwt

from zope.interface import implementer
from pyramid.interfaces import ISession

from www.app.core.session.providers import get_provider


def wrap_changed(wrapped):
    def changed(session, *arg, **kw):
        session.changed()
        return wrapped(session, *arg, **kw)
    return changed


def SessionFactory(
    serializer,
    cookie_name,
    max_age = None,
    path = '/',
    domain = None,
    secure = False,
    httponly = False,
    timeout = 1200,
    reissue_time = 0
):
    @implementer(ISession)
    class Session(dict):

        _dirty = False

        _cookie_name = cookie_name
        _cookie_max_age = max_age
        _cookie_path = path
        _cookie_domain = domain
        _cookie_secure = secure
        _cookie_httponly = httponly

        def __init__(self, request):
            log.info('Session::__init__')

            self._request = request
            if self._cookie_name in request.cookies:
                try:
                    jwt_token = request.cookies[self._cookie_name]
                    decoded = jwt.decode(
                        jwt_token,
                        request.registry.settings['app.jwt.secret'],
                        request.registry.settings['jwt.algorithm']
                    )
                    self._session_id = decoded['session_id']
                    self._new = False
                except KeyError:
                    log.error('Session::__init__() session_id not found in cookie')
                    self._session_id = secrets.token_urlsafe(20)
                    self._new = True
            else:
                self._session_id = secrets.token_urlsafe(20)
                self._new = True

            state = {}
            dict.__init__(self, state)

        # ISession
        def changed(self):
            log.info('Session::changed()')

            if not self._dirty:
                self._dirty = True
                def set_cookie_callback(request, response):
                    log.debug('Session::set_cookie_callback()')
                    self._set_cookie(request, response)
                    self._save_session_data()
                    self._request = None
                self._request.add_response_callback(set_cookie_callback)

        # ISession
        def invalidate(self):
            log.info('Session::invalidate()')
            self.clear()

        def clear(self):
            log.info('Session::clear()')

            try:
                # provider_name = self._request.registry.settings['data.provider.common']
                # provider = self._request.data.get_provider(provider_name)

                # provider.query(
                #     'session.clear', 
                #     (self._session_id, )
                # )
                provider = get_provider(self._request)
                provider.session_clear(self._session_id)

                self._session_id = secrets.token_urlsafe(20)
                log.debug('new session id: %s', self._session_id)
                self._new = True

                def delete_cookie_callback(request, response):
                    log.debug('Session::delete_cookie_callback()')
                    # delete session
                    response.delete_cookie(
                        self._cookie_name,
                        self._cookie_path,
                        self._cookie_domain
                    )

                    # delete email
                    response.delete_cookie(
                        'email',
                        self._cookie_path,
                        self._cookie_domain
                    )

                    self._request = None
                self._request.add_response_callback(delete_cookie_callback)
            except Exception as e:
                log.error(e)


        def create(self):
            log.info('Session::create()')

        def destroy(self):
            log.info('Session::destroy()')


        # dict
        def __setitem__(self, key, value):
            log.info('Session::__setitem__()')
            dict.__setitem__(self, key, value)
            self.changed()

        # dict
        def __get_item__(self, key):
            log.info('Session::__get_item__()')

        def _set_cookie(self, request, response):
            log.info('Session::_set_cookie()')

            try:
                # set session id
                jwt_token = jwt.encode(
                    {
                        'session_id': self._session_id
                    },
                    request.registry.settings['app.jwt.secret'],
                    request.registry.settings['jwt.algorithm']
                )
                cookie_value = jwt_token.decode('utf-8')
                response.set_cookie(
                    self._cookie_name,
                    value = cookie_value,
                    max_age = self._cookie_max_age,
                    path = self._cookie_path,
                    domain = self._cookie_domain,
                    secure = self._cookie_secure,
                    httponly = self._cookie_httponly
                )

                # set email
                response.set_cookie(
                    'email',
                    value = 'test@test.com',
                    max_age = self._cookie_max_age,
                    path = self._cookie_path,
                    domain = self._cookie_domain,
                    secure = self._cookie_secure,
                    httponly = self._cookie_httponly
                )
            except Exception as e:
                log.error(e)

        def _save_session_data(self):
            log.info('Session::_save_session_data()')
            try:
                provider_name = self._request.registry.settings['data.provider.common']
                provider = self._request.data.get_provider(provider_name)

                provider = get_provider(self._request)

                if (self._new):
                    # provider.query(
                    #     'session.create',
                    #     (self._session_id, )
                    # )
                    provider.session_create(self._session_id)

                for key, value in self.items():
                    # provider.query(
                    #     'session.set',
                    #     (self._session_id, key, str(value))
                    # )
                    provider.set_value(self._session_id, key, str(value))
            except Exception as e:
                log.error(e)

        def get_session_id(self):
            return self._session_id


    return Session