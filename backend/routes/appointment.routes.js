const express = require("express");
const { allowRoles } = require("../middlewares/role.middleware");
const { createAppointment, getAllAppointments, cancelAppointment, updateAppointment } = require("../controllers/appointment.controller");
const { verifyAccessToken } = require("../middlewares/auth.middleware");
const appointmentRouter = express.Router();

// Patient Routes
appointmentRouter.post('/', allowRoles('patient'), verifyAccessToken, createAppointment)
appointmentRouter.get('/', allowRoles('patient'), verifyAccessToken, getAllAppointments)
appointmentRouter.put('/:id/cancel', allowRoles('patient'), verifyAccessToken, cancelAppointment)

// Doctor Routes
appointmentRouter.put('/:id/status', allowRoles('doctor'), verifyAccessToken, updateAppointment)

module.exports = appointmentRouter;