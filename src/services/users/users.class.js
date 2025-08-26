import { KnexService } from '@feathersjs/knex'


export class UsersService extends KnexService {}

export const getOptions = app => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'users'
  }
}
