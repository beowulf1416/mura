import logging
log = logging.getLogger(__name__)

import psycopg2


def create_connector(config):
    log.info('create_connector()', config)

    try:
        return psycopg2.connect("host='{0}' port='{1}' dbname='{2}' user='{3}' password='{4}'".format(
            config['host'],
            config['port'],
            config['db'],
            config['user'],
            config['password']
        ))
    except KeyError:
        raise RuntimeError('Incorrect configuration. Required parameters should be: host, port, db, user, and password')
    except Exception as e:
        log.error(e)
        raise e