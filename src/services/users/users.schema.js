import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

export const usersSchema = {
  $id: 'Users',
  type: 'object',
  additionalProperties: false,
  required: ['name', 'email'],
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
    gender: { type: 'string' },
    deleted: { type: 'boolean' }
  }
}
export const usersValidator = getValidator(usersSchema, dataValidator)
export const usersResolver = resolve({})

export const usersExternalResolver = resolve({})

// Schema for creating new data
export const usersDataSchema = {
  $id: 'UsersData',
  type: 'object',
  additionalProperties: false,
  required: ['name', 'email'],
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
    gender: { 
      type: 'string',
      enum: ['M', 'F', 'O']   // ✅ restrict to M, F, O
    },
    deleted: { type: 'boolean' }
  }
}
export const usersDataValidator = getValidator(usersDataSchema, dataValidator)
export const usersDataResolver = resolve({})

// Schema for updating existing data
export const usersPatchSchema = {
  $id: 'UsersPatch',
  type: 'object',
  additionalProperties:false,
  required:[],
  properties: {
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
    gender: { type: 'string', enum: ['M', 'F', 'O']  },
    deleted: { type: 'boolean' }  
  }
};

export const usersPatchValidator = getValidator(usersPatchSchema, dataValidator)
export const usersPatchResolver = resolve({})

// Schema for allowed query properties
export const usersQuerySchema = {
  $id: 'UsersQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(usersSchema.properties)
  }
}
export const usersQueryValidator = getValidator(usersQuerySchema, queryValidator)
export const usersQueryResolver = resolve({})
