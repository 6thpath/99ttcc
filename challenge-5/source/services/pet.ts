import type { FindManyOptions, FindOptionsOrder, Repository } from 'typeorm'

import type { PetModel } from '../models'

export class PetService {
  constructor(private petRepository: Repository<PetModel>) {}

  async create(data: TypePetCreatePayload): Promise<PetModel> {
    const pet = this.petRepository.create(data)

    return this.petRepository.save(pet)
  }

  async findAll(
    filter: TypePetFilterOptions = {},
    offset = 0,
    limit = 25,
    order: TypePetOrderOptions = { createdAt: 'asc' },
  ): Promise<[PetModel[], number]> {
    const options: FindManyOptions<PetModel> = {
      where: filter,
      skip: offset,
      take: limit,
      order,
    }

    return this.petRepository.findAndCount(options)
  }

  async findById(id: PetModel['id']): Promise<PetModel | null> {
    return this.petRepository.findOne({ where: { id } })
  }

  async update(id: PetModel['id'], data: TypePetUpdatePayload): Promise<PetModel | null> {
    await this.petRepository.update(id, data)

    return this.findById(id)
  }

  async delete(id: PetModel['id']): Promise<boolean> {
    const result = await this.petRepository.delete(id)

    return typeof result.affected === 'number' && result.affected > 0
  }
}

export type TypePetFilterOptions = Partial<Pick<PetModel, 'name' | 'species' | 'breed'>>
export type TypePetOrderOptions = FindOptionsOrder<PetModel>
export type TypePetOrder = { order?: TypePetOrderOptions }
export type TypePetCreatePayload = Optional<Pick<PetModel, 'name' | 'species' | 'breed'>, 'species' | 'breed'>
export type TypePetId = { id: PetModel['id'] }
export type TypePetUpdatePayload = Optional<Pick<PetModel, 'name' | 'species' | 'breed'>, 'species' | 'breed'>
