import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ContactController } from './contacts.controller';
import { ContactValidation } from './contacts.validation';

const router = Router();

router
  .route('/')
  .post(
    validateRequest(ContactValidation.createContactZodSchema),
    ContactController.createContact
  )
  .get(ContactController.getAllContacts);

router
  .route('/:id')
  .get(ContactController.getSingleContact)
  .delete(ContactController.deleteContact);

export const ContactRoutes = router;
