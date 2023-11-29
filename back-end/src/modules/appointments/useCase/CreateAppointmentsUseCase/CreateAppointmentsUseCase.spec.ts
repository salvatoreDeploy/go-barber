import { InMemoryAppointmentRepository } from "@modules/appointments/repositories/in-memory/inMemoryAppointmentsRepository";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CreateAppointmentsUseCase from "./CreateAppointmentsUseCase";
import { AppError } from "@shared/error/AppError";

let inMemoryAppointmentRepository: InMemoryAppointmentRepository;
let sut: CreateAppointmentsUseCase;

describe("Create Appointments Use Case", () => {
  beforeEach(() => {
    inMemoryAppointmentRepository = new InMemoryAppointmentRepository();
    sut = new CreateAppointmentsUseCase(inMemoryAppointmentRepository);
  });

  it("Should be able to create new appointment", async () => {
    const appointment = await sut.execute({
      provider_id: "provider-id-teste-01",
      user_id: "user-id-teste-01",
      date: new Date(),
    });

    expect(appointment.id).toEqual(expect.any(String));
    expect(appointment).toHaveProperty("provider_id");
    expect(appointment).toHaveProperty("date");
    expect(appointment).toEqual(
      expect.objectContaining({ provider_id: "provider-id-teste-01" })
    );
  });

  it("Should not be able to create two appointment on the same time", async () => {
    vi.setSystemTime(new Date(2022, 0, 3, 2, 0, 0));

    await sut.execute({
      provider_id: "provider-id-teste-01",
      user_id: "user-id-teste-01",
      date: new Date(),
    });

    await expect(() =>
      sut.execute({
        provider_id: "provider-id-teste-01",
        user_id: "user-id-teste-01",
        date: new Date(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
