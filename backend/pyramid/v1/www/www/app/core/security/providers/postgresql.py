import logging
log = logging.getLogger(__name__)

from www.app.core.data.providers.postgresql import PostgreSQL

class SecurityPostgreSQL(PostgreSQL):
    def __init__(self, connection):
        log.debug('SecurityPostgreSQL::__init__()')
        super().__init__(connection)

    def user_authenticate(self, email, password):
        log.debug('SecurityPostgreSQL::user_authenticate()')
        sql = 'select * from security.user_authenticate(%s,%s)'
        try:
            connection = self.get_connection()
            cn = connection['connection']
            c = cn.cursor()
            c.execute(sql, (email, password))
            result = c.fetchall()
            return result[0][0]
        except Exception as e:
            log.error(e)

    def user_get_by_email(self, email):
        log.debug('SecurityPostgreSQL::user_get_by_email()')
        sql = 'select * from security.user_get_id(%s)'
        try:
            connection = self.get_connection()
            cn = connection['connection']
            c = cn.cursor()
            c.execute(sql, (email, ))
            result = c.fetchall()
            return result[0][0]
        except Exception as e:
            log.error(e)

    def user_has_permission(self, user_id, permission):
        log.debug('SecurityPostgreSQL::user_has_permission()')
        sql = 'select * from security.user_has_permission(%s,%s)'
        try:
            connection = self.get_connection()
            cn = connection['connection']
            c = cn.cursor()
            c.execute(sql, (user_id, permission))
            return {
                'result': c.fetchall(),
                'count': c.rowcount
            }
        except Exception as e:
            log.error(e)

    def user_get_clients(self, user_id):
        log.debug('SecurityPostgreSQL::user_get_clients()')
        sql = 'select * from security.user_client_list()'
        try:
            connection = self.get_connection()
            cn = connection['connection']
            c = cn.cursor()
            c.execute(sql, (user_id, ))
            return c.fetchall()
        except Exception as e:
            log.error(e)

    def user_select_client(self, user_id, client_id):
        log.debug('SecurityPostgreSQL::user_select_client()')
        sql = ''
