import logging
log = logging.getLogger(__name__)

from zope.interface import implementer
from pyramid.interfaces import IAuthorizationPolicy
from pyramid.security import Allowed, Denied
from pyramid.security import Authenticated, Everyone


@implementer(IAuthorizationPolicy)
class AuthorizationPolicy:

    def __init__(self, provider):
        log.info('AuthorizationPolicy::__init__()')
        self._provider = provider

    def principals_allowed_by_permission(self, context, permission):
        log.info('AuthorizationPolicy::principals_allowed_by_permission()')

    def permits(self, context, principals, permission):
        log.info('AuthorizationPolicy::permits()')
        if principals is not None:
            for p in principals:
                if (p != Everyone):
                    try:
                        result = self._provider.query(
                            'user.has_permission',
                            (p, permission)
                        )
                        (allowed, ) = result[0]
                        if (allowed):
                            return Allowed('Allowed')
                        else:
                            log.debug('User %s is missing permission %s' % (p, permission))
                            return Denied('Denied')
                    except Exception as e:
                        log.error(e)

        return Denied('Denied')

    