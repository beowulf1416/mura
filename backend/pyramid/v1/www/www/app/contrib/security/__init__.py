import logging
log = logging.getLogger(__name__)

from www.app.core.graphql import include_schemas

from www.app.contrib.security.schemas import User, Permission

def includeme(config):
    log.info('included: www.app.contrib.security')

    include_schemas([User, Permission])