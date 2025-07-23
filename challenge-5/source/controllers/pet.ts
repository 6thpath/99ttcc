import type { NextFunction, Request, Response } from 'express'
import { matchedData } from 'express-validator'

import { type PetModel } from '../models'
import type {
  PetService,
  TypePetCreatePayload,
  TypePetFilterOptions,
  TypePetId,
  TypePetOrder,
  TypePetUpdatePayload,
} from '../services/pet'

export class PetController {
  constructor(private petService: PetService) {}

  async list(
    req: Request<TypeRequestParamsGeneric, unknown, unknown, TypePetFilterOptions & TypeListFilterOptions & TypePetOrder>,
    res: Response<TypeApiSuccessResponse>,
    next: NextFunction,
  ) {
    const data = matchedData<TypePetFilterOptions & TypeListFilterOptions & TypePetOrder>(req, { locations: ['query'] })

    const filter: TypePetFilterOptions = {}
    if (data.name) filter.name = data.name
    if (data.species) filter.species = data.species
    if (data.breed) filter.breed = data.breed

    const offset = data.offset ?? 0
    const limit = data.limit ?? 25
    const order = data.order ?? { createdAt: 'desc' }

    try {
      const [pets, total] = await this.petService.findAll(filter, offset, limit, order)

      res.json({
        data: pets,
        pagination: { offset, limit, order, total },
      })
    } catch (error) {
      next(error)
    }
  }

  async get(req: Request, res: Response<TypeApiResponse>, next: NextFunction) {
    const data = matchedData<Pick<PetModel, 'id'>>(req, { locations: ['params'] })

    try {
      const pet = await this.petService.findById(data.id)
      if (!pet) {
        return res.status(204).json({ error: { message: 'Pet not found' } })
      }

      res.json({ data: pet })
    } catch (error) {
      next(error)
    }
  }

  async create(req: Request, res: Response<TypeApiResponse>) {
    const data = matchedData<TypePetCreatePayload>(req, { locations: ['body'] })

    try {
      const pet = await this.petService.create(data)

      res.status(201).json({ data: pet })
    } catch {
      res.status(400).json({ error: { message: 'Failed to create pet' } })
    }
  }

  async update(req: Request, res: Response<TypeApiResponse>, next: NextFunction) {
    const { id, ...data } = matchedData<TypePetUpdatePayload & TypePetId>(req, { locations: ['body', 'params'] })

    try {
      const pet = await this.petService.update(id, data)
      if (!pet) {
        return res.status(404).json({ error: { message: 'Pet not found' } })
      }

      res.json({ data: pet })
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response<TypeApiResponse>, next: NextFunction) {
    const data = matchedData<TypePetId>(req, { locations: ['params'] })

    try {
      const success = await this.petService.delete(data.id)
      if (!success) {
        return res.status(404).json({ error: { message: 'Pet not found' } })
      }

      res.status(204).json({ data: true })
    } catch (error) {
      next(error)
    }
  }
}
