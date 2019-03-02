import logging
log = logging.getLogger(__name__)

from www.app.core.data.providers.postgresql import PostgreSQL

class SessionPostgreSQL(PostgreSQL):
    def __init__(self, connection):
        log.debug('SessionPostgreSQL::__init__()')
        super().__init__(connection)


    def session_create(self, session_id):
        log.debug('SessionPostgreSQL::session_create()')
        sql = 'select * from www.session_create(%s)'
        connection = self.get_connection()
        cn = connection['connection']
        try:
            c = cn.cursor()
            c.execute(sql, (session_id, ))
            cn.commit()
        except Exception as e:
            cn.rollback()
            log.error(e)

    
    def set_value(self, session_id, key, value):
        log.debug('SessionPostgreSQL::set_value()')
        sql = 'select * from www.session_set(%s,%s,%s)'
        connection = self.get_connection()
        cn = connection['connection']
        try:
            c = cn.cursor()
            c.execute(sql, (session_id, key, value))
            cn.commit()
        except Exception as e:
            cn.rollback()
            log.error(e)

    
    def session_clear(self, session_id):
        log.debug('SessionPostgreSQL::session_clear()')
        sql = 'select * from www.session_clear(%s)'
        connection = self.get_connection()
        cn = connection['connection']
        try:
            c = cn.cursor()
            c.execute(sql, (session_id, ))
            cn.commit()
        except Exception as e:
            cn.rollback()
            log.error(e)