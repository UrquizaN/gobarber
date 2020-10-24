import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();

interface Appointment {
  id: string;
  provider: string;
  date: Date;
}

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const appointment = {
    id: uuid(),
    provider,
    date: parsedDate,
  };

  const appointmentInSameDate = appointments.find( appointment => isEqual(appointment.date, parsedDate));

  if(appointmentInSameDate){
    return response.status(400).json({ message: 'This date is already booked! '});
  }

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;
