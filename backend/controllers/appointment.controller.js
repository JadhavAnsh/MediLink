const Appointment = require('../models/appointment.model');

const createAppointment = async (req, res) => {
  try {
    const { doctorId, date, reason } = req.body;

    const patientId = req.user.id;

    if (!doctorId || !date) {
      return res.status(400).json({ message: 'doctorId and date are required' });
    }

    const appointment = new Appointment({
      patientId,
      doctorId,
      date,
      reason,
    });

    await appointment.save();

    res.status(201).json({ message: 'Appointment created successfully', data: appointment });

  } catch (err) {
    console.error("Appointment creation failed:", err);
    res.status(500).json({ message: 'Failed to create appointment', error: err });
  }
};


const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getAppointmentsById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({error: 'Appointment not found'});
        }
        res.status(200).json(appointment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const cancelAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status: 'cancelled' },
            { new: true }
        );
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.status(200).json(appointment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const updateAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.status(200).json(appointment);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    createAppointment,
    getAllAppointments,
    getAppointmentsById,
    cancelAppointment,
    updateAppointment
}