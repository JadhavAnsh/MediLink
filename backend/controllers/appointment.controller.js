const Appointment = require('../models/appointment.model');
const createAppointment = async (req, res) => {
    try {
    const appointment = new Appointment({
      ...req.body,
      patientId: req.user._id
    });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ patientId: req.user._id });
        res.status(200).json(appointments);
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
    cancelAppointment,
    updateAppointment
}