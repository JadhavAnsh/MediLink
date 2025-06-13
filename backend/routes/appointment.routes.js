const express = require("express");
const { allowRoles } = require("../middlewares/role.middleware");
const { createAppointment, getAllAppointments, cancelAppointment, updateAppointment, getAppointments, getAppointmentsById } = require("../controllers/appointment.controller");
const { verifyAccessToken } = require("../middlewares/auth.middleware");
const appointmentRouter = express.Router();

// Patient Routes
appointmentRouter.post('/', verifyAccessToken, allowRoles('patient'), createAppointment)
appointmentRouter.get('/', verifyAccessToken, allowRoles('patient'), getAllAppointments)
appointmentRouter.get('/:id', verifyAccessToken, allowRoles('patient'), getAppointmentsById)
appointmentRouter.put('/:id/cancel', verifyAccessToken, allowRoles('patient'), cancelAppointment)

// Doctor Routes
appointmentRouter.put('/:id/status', verifyAccessToken, allowRoles('doctor'), updateAppointment)

module.exports = appointmentRouter;