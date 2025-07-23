import { body, param, query, type ValidationChain } from 'express-validator'

import type { TypePetOrderOptions } from '../services/pet'
import { validationExecution } from './generic'
import { validateLimit, validateOffset } from './pagination'

const validatePetId = (input: ValidationChain) => input.isInt({ min: 1 })
const validatePetName = (input: ValidationChain) => input.optional().isString().isLength({ min: 1, max: 255 })
const validatePetSpecies = (input: ValidationChain) => input.optional().isString().isLength({ max: 50 })
const validatePetBreed = (input: ValidationChain) => input.optional().isString().isLength({ max: 255 })

// ? pagination
const validatePetListOrder = query('order')
  .custom((input: string | undefined) => {
    if (typeof input === 'string' && !/^([a-zA-Z0-9_]+:(asc|desc))(,([a-zA-Z0-9_]+:(asc|desc)))*$/i.test(input.trim())) {
      return false
    }

    return true
  })
  .customSanitizer((input: string): TypePetOrderOptions | undefined => {
    if (!input) {
      return undefined
    }

    return Object.fromEntries(
      input.split(',').map((pair) => {
        const [field, dir] = pair.split(':')
        return [field, dir.toUpperCase()]
      }),
    )
  })

export const validatePetList = [
  validatePetName(query('name')),
  validatePetSpecies(query('species')),
  validatePetBreed(query('breed')),
  validateOffset,
  validateLimit,
  validatePetListOrder,
  validationExecution,
]
export const validatePetFind = [validatePetId(param('id')), validationExecution]
export const validatePetCreate = [
  validatePetName(body('name')),
  validatePetSpecies(body('species')),
  validatePetBreed(body('breed')),
  validationExecution,
]
export const validatePetUpdate = [
  validatePetId(param('id')),
  validatePetName(body('name')),
  validatePetSpecies(body('species')),
  validatePetBreed(body('breed')),
  validationExecution,
]
export const validatePetDelete = [validatePetId(param('id')), validationExecution]
