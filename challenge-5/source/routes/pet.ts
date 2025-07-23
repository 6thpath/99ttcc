import { Router } from 'express'

import { AppDataSource } from '../config/db'
import { PetController } from '../controllers/pet'
import { validatePetCreate, validatePetFind, validatePetList, validatePetUpdate } from '../middlewares/pet'
import { PetModel } from '../models'
import { PetService } from '../services/pet'

const router = Router()

// ? repositories
const petRepository = AppDataSource.getRepository(PetModel)

// ? services
const petService = new PetService(petRepository)

// ? controllers
const petController = new PetController(petService)

// ?
router.get('/', validatePetList, petController.list.bind(petController))
router.get('/:id', validatePetFind, petController.get.bind(petController))
router.post('/', validatePetCreate, petController.create.bind(petController))
router.put('/:id', validatePetUpdate, petController.update.bind(petController))
router.delete('/:id', validatePetFind, petController.delete.bind(petController))

export default router
