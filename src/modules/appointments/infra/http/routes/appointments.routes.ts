import { Router } from 'express';
import { parseISO } from 'date-fns';

import ensureAutenticated from '@modules/users/infra/http/middlewares/ensureAutenticated';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAutenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointmentRepository = getCustomRepository(AppointmentsRepository);

//   const appointments = await appointmentRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const appointmentRepository = new AppointmentsRepository();
  const createAppointment = new CreateAppointmentService(appointmentRepository);

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
