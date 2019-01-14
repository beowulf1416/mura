import logging
log = logging.getLogger(__name__)

def create_provider(config, connection):
    log.info('create_provider()')
    return PostgreSQL(connection)


class PostgreSQL:

    _cn = {}

    _params = {
        # users
        'user.register': { 'sql': 'select * from security.user_register(%s,%s)', 'commit': True },
        'email.verify': { 'sql': 'select * from security.verify_email(%s)', 'commit': True },
        'user.password.reset.request': { 'sql': 'select * from security.user_password_request(%s)', 'commit': True },
        'user.password.reset': { 'sql': 'select * from security.user_password_reset(%s,%s)', 'commit': True },
        'user.password.token.validate': { 'sql': 'select * from security.user_password_token_validate(%s)', 'commit': False },
        'user.authenticate': { 'sql': 'select * from security.user_authenticate(%s,%s)', 'commit': True },
        'user.get_id': { 'sql': 'select * from security.user_get_id(%s)', 'commit': False },
        'user.permissions': { 'sql': 'select * from security.user_get_permissions(%s)', 'commit': False },
        'user.has_permission': { 'sql': 'select * from security.user_has_permission(%s,%s)', 'commit': False },
        # sessions
        'session.create': { 'sql': 'select * from www.session_create(%s)', 'commit': True },
        'session.set': { 'sql': 'select * from www.session_set(%s,%s,%s)', 'commit': True },
        'session.clear': { 'sql': 'select * from www.session_clear(%s)', 'commit': True },
        # clients
        'clients.list': { 'sql': 'select * from clients.clients(%s,%s)', 'commit': False },
        'clients.add': { 'sql': 'select * from clients.client_add(%s,%s)', 'commit': True }
    }

    def __init__(self, connection):
        log.info('PostgreSQL::__init__()')
        self._cn = connection

        self._methods = {
            # users
            'user.register': self._run_sql,
            'email.verify': self._run_sql,
            'user.password.reset.request': self._run_sql,
            'user.password.reset': self._run_sql,
            'user.password.token.validate': self._run_sql,
            'user.authenticate': self._run_sql,
            'user.get_id': self._run_sql,
            'user.permissions': self._run_sql,
            'user.has_permission': self._run_sql,
            # sessions
            'session.create': self._run_sql,
            'session.set': self._run_sql,
            'session.clear': self._run_sql,
            # clients
            'clients.list': self.get_clients,
            'clients.add': self._run_sql
        }


    def query(self, key, params):
        log.debug('PostgreSQL::query()')

        try:
            method = self._methods[key]
            return method(key, params)
        except KeyError:
            log.error('missing key for method: %s', key)
            return []

    def _run_sql(self, key, params):
        log.debug('PostgreSQL::_run_sql(): %s', key)

        try:
            param = self._params[key]
            commit = param['commit']

            c = self._cn.cursor()
            c.execute(param['sql'], params)
            if (commit):
                self._cn.commit()
            return c.fetchall()
        except KeyError:
            log.error('missing key for sql: %s', key)
            return []
        except Exception as e:
            log.error(e)
            raise e
        finally:
            if (commit):
                self._cn.rollback()


    def get_clients(self, key, params):
        log.debug('PostgreSQL::get_clients(): %s', key)

        pager = params[0]
        filter = params[1]
        sort = params[2]

        log.debug('pager: %s', pager)
        log.debug('filter: %s', filter)
        log.debug('sort: %s', sort)

        return []
