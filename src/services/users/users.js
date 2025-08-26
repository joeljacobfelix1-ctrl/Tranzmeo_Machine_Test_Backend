// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  usersDataValidator,
  usersPatchValidator,
  usersQueryValidator,
  usersResolver,
  usersExternalResolver,
  usersDataResolver,
  usersPatchResolver,
  usersQueryResolver
} from './users.schema.js'
import { UsersService, getOptions } from './users.class.js'

export const usersPath = '/users'
export const usersMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './users.class.js'
export * from './users.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const users = app => {
  // Register our service on the Feathers application
  app.use(usersPath, new UsersService(getOptions(app)), {
    methods: usersMethods,
    events: []
  })

  // Initialize hooks
  app.service(usersPath).hooks({
  around: {
    all: [
      schemaHooks.resolveExternal(usersExternalResolver),
      schemaHooks.resolveResult(usersResolver)
    ]
  },
  before: {
    all: [],
    find: [
      async context => {
        if (!context.params.query) {
          context.params.query = {};
        }
        context.params.query = {
          ...context.params.query,
          deleted: false
        };

        return context;
      }
    ],
    create: [
      schemaHooks.validateData(usersDataValidator),
      schemaHooks.resolveData(usersDataResolver),
      async context => {

        if (context.data.deleted === undefined) {
          context.data.deleted = false;
        }
        return context;
      }
    ],
    patch: [
      schemaHooks.validateData(usersPatchValidator),
      schemaHooks.resolveData(usersPatchResolver),
      async context => {
        // Allow frontend to patch deleted:true for soft delete
        // But prevent changing deleted back to false externally
        if ('deleted' in context.data && !context.params.isInternal) {
          if (context.data.deleted === false) {
            delete context.data.deleted;
          }
        }
        return context;
      }
    ],
    remove: [
      async context => {
        const { id, service } = context;

        // Soft delete by patching deleted=true
        await service.patch(id, { deleted: true }, { isInternal: true });

        // Return updated user
        context.result = await service.get(id);
        return context;
      }
    ]
  },
  after: {
    all: []
  },
  error: {
    all: []
  }
});

}
