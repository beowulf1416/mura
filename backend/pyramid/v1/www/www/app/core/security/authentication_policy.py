import logging
log = logging.getLogger(__name__)

from zope.interface import implementer
from pyramid.interfaces import IAuthenticationPolicy
from pyramid.security import Authenticated, Everyone


@implementer(IAuthenticationPolicy)
class AuthenticationPolicy:

    def __init__(self):
        log.info('AuthenticationPolicy::__init__()')

    def authenticated_userid(self, request):
        log.info('AuthenticationPolicy::authenticated_userid()')

    def effective_principals(self, request):
        log.info('AuthenticationPolicy::effective_principals')
        effective_principals = [Everyone]
        session = request.session
        session_id = session.get_session_id()
        effective_principals.append(session_id)
        return effective_principals

    def unauthenticated_userid(self, request):
        log.info('AuthenticationPolicy::unauthenticated_userid')

    def remember(self, request, user_id, **kw):
        session = request.session
        session['user_id'] = user_id
        return []

    def forget(self, request):
        session = request.session
        session.clear()
        return []