import logging
log = logging.getLogger(__name__)

def includeme(config):
    log.info('included: www.app.core.data')

    config.add_request_method(
        callable='www.app.core.data.data.get_data',
        name='data',
        reify=True
    )