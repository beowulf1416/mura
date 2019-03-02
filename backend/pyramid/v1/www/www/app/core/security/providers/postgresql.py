import logging
log = logging.getLogger(__name__)

from www.app.core.data.providers.postgresql import PostgreSQL

class SecurityPostgreSQL(PostgreSQL):
    def __init__(self, connection):
        log.debug('SecurityPostgreSQL::__init__()')
        super().__init__(connection)

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