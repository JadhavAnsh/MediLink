const { sendMail } = require("../helpers/sendMail.helper");
const Appointment = require("../models/appointment.model");
const User = require("../models/user.model");

const createAppointment = async (req, res) => {
  try {
    const { doctorId, date, reason } = req.body;
    const patientId = req.user.id;

    if (!doctorId || !date) {
      return res
        .status(400)
        .json({ message: "doctorId and date are required" });
    }

    const appointment = new Appointment({
      patientId,
      doctorId,
      date,
      reason,
    });

    await appointment.save();

    // Fetch both users
    const patient = await User.findById(patientId).select("name email");
    const doctor = await User.findById(doctorId).select("name");

    if (patient && doctor) {
      const appointmentDate = new Date(date).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
      });

      const subject = "Appointment Scheduled Successfully";
      const body = `Dear ${patient.name},\n\nYour appointment with Dr. ${
        doctor.name
      } on ${appointmentDate} has been successfully scheduled.\n\nReason: ${
        reason || "N/A"
      }\n\n- MediLink Team`;

      await sendMail(patient.email, subject, body);
    }

    res.status(201).json({
      message: "Appointment created successfully",
      data: appointment,
    });
  } catch (err) {
    console.error("Appointment creation failed:", err);
    res.status(500).json({
      message: "Failed to create appointment",
      error: err.message,
    });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAppointmentsById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    )
      .populate({ path: "patientId", model: "User", select: "name email" })
      .populate({ path: "doctorId", model: "User", select: "name" });

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    const { name: patientName, email: patientEmail } = appointment.patientId;
    const { name: doctorName } = appointment.doctorId;

    const appointmentDate = new Date(appointment.date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    let subject = "";
    let body = "";

    switch (appointment.status) {
      case "cancelled":
        subject = "Your Appointment has been Cancelled";
        body = `Dear ${patientName},\n\nYour appointment with Dr. ${doctorName} on ${appointmentDate} has been cancelled.\n\n- MediLink Team`;
        break;

      case "completed":
        subject = "Appointment Completed";
        body = `Dear ${patientName},\n\nYour appointment with Dr. ${doctorName} on ${appointmentDate} is marked as completed.\n\nThank you for using MediLink!\n\n- MediLink Team`;
        break;

      case "scheduled":
        subject = "Appointment Scheduled";
        body = `Dear ${patientName},\n\nYour appointment with Dr. ${doctorName} on ${appointmentDate} is scheduled.\n\n- MediLink Team`;
        break;
    }

    if (subject && body && patientEmail) {
      await sendMail(patientEmail, subject, body);
    }

    res.status(200).json(appointment);
  } catch (err) {
    console.error("Appointment update failed:", err);
    res.status(500).json({ error: err.message });
  }
};



module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentsById,
  cancelAppointment,
  updateAppointment,
};
