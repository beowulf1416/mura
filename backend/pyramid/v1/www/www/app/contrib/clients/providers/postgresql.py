import logging
log = logging.getLogger(__name__)

from www.app.core.data.providers.postgresql import PostgreSQL


class ClientsPostgreSQL(PostgreSQL):

    def __init__(self, connection):
        log.debug('ClientsPostgreSQL::__init__()')
        super().__init__(connection)

    def get_clients_paged(self, items, offset):
        log.debug('ClientsPostgreSQL::get_clients_paged()')
        sql = 'select * from clients.clients_list(%s,%s)'
        try:
            connection = self.get_connection()
            cn = connection['connection']
            c = cn.cursor()
            c.execute(sql, (items, offset))
            return {
                'result': c.fetchall(),
                'count': c.rowcount
            }
        except Exception as e:
            log.error(e)

    def get_clients_list(self):
        log.debug('ClientsPostgreSQL::get_clients_list()')
        sql = 'select * from clients.clients_list(%s,%s)'
        try:
            connection = self.get_connection()
            cn = connection['connection']
            c = cn.cursor()
            c.execute(sql, )
            return {
                'result': c.fetchall(),
                'count': c.rowcount
            }
        except Exception as e:
            log.error(e)

    def get_client(self, id):
        log.debug('ClientsPostgreSQL::get_client()')
        sql = 'select * from clients.client_get(%s)'
        try:
            connection = self.get_connection()
            cn = connection['connection']
            c = cn.cursor()
            c.execute(sql, (id, ))
            return {
                'result': c.fetchall()
            }
        except Exception as e:
            log.error(e)


    def add_client(self, name, description):
        log.debug('ClientsPostgreSQL::add_client()')
        sql = 'select * from clients.client_add(%s,%s)'
        connection = self.get_connection()
        cn = connection['connection']
        try:
            c = cn.cursor()
            c.execute(sql, (name, description))
            cn.commit()
        except Exception as e:
            cn.rollback()
            log.error(e)
