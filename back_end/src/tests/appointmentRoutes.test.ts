import request from "supertest";
import app from "../app"; // Supposons que votre application Express soit exportée depuis app.ts
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let token: string; // Pour stocker le token d'authentification
let doctorId: string; // Pour stocker l'ID d'un médecin de test

beforeAll(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Connexion pour obtenir un token
    const loginResponse = await request(app).post("/api/auth/login").send({
      email: "test@example.com", // Remplacez par un utilisateur de test
      password: "password123", // Remplacez par le mot de passe de test
    });

    token = loginResponse.body.token;

    // Trouver un médecin pour les tests
    const doctorsResponse = await request(app)
      .get("/api/doctors")
      .set("Authorization", `Bearer ${token}`);

    if (doctorsResponse.body.length > 0) {
      doctorId = doctorsResponse.body[0]._id;
    }
  } catch (error) {
    console.error("Setup failed:", error);
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Appointment Routes", () => {
  test("GET /api/appointments/health-categories should return health categories", async () => {
    const response = await request(app).get(
      "/api/appointments/health-categories"
    );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /api/appointments/health-conditions should return health conditions", async () => {
    const response = await request(app).get(
      "/api/appointments/health-conditions"
    );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /api/appointments/specialists should return specialists for conditions", async () => {
    // Supposons que nous avons un ID de condition
    const conditionId = "..."; // Remplacez par un ID valide

    const response = await request(app).get(
      `/api/appointments/specialists?conditions=${conditionId}`
    );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /api/appointments/doctors should return doctors by speciality", async () => {
    const response = await request(app).get(
      "/api/appointments/doctors?speciality=General%20Practitioner"
    );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /api/appointments/availability/:doctorId should return doctor availability", async () => {
    if (!doctorId) {
      console.warn("No doctor ID available for testing");
      return;
    }

    const response = await request(app).get(
      `/api/appointments/availability/${doctorId}`
    );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /api/appointments should create a new appointment", async () => {
    if (!doctorId || !token) {
      console.warn("No doctor ID or token available for testing");
      return;
    }

    // Date de demain
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const response = await request(app)
      .post("/api/appointments")
      .set("Authorization", `Bearer ${token}`)
      .send({
        doctorId,
        date: tomorrow.toISOString().split("T")[0],
        startTime: "10:00",
        endTime: "10:30",
        conditionIds: [], // Laissez vide ou remplissez avec des IDs valides
        notes: "Test appointment",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
  });
});
