import { beforeEach, describe, expect, it, test, vi } from "vitest";
import { InMemoryAppointmentRepository } from "@modules/appointments/repositories/in-memory/inMemoryAppointmentsRepository";
import { ListProvaiderDayAvailabilitysUseCase } from "./ListDayAvailabityUseCase";

let inMemoryAppointmentsRepository: InMemoryAppointmentRepository;
let sut: ListProvaiderDayAvailabilitysUseCase;

describe("List Provaiders Day Availability", () => {
  beforeEach(() => {
    inMemoryAppointmentsRepository = new InMemoryAppointmentRepository();
    sut = new ListProvaiderDayAvailabilitysUseCase(
      inMemoryAppointmentsRepository
    );
  });

  it("should be able to list providers the day availability from provaider", async () => {
    await inMemoryAppointmentsRepository.create({
      provider_id: "provaider",
      date: new Date(2023, 10, 22, 8, 0, 0) /* 22/10/2023 8:00 */,
    });

    await inMemoryAppointmentsRepository.create({
      provider_id: "provaider",
      date: new Date(2023, 10, 22, 10, 0, 0) /* 22/10/2023 10:00 */,
    });

    const availability = await sut.execute({
      provider_id: "provaider",
      month: 11,
      year: 2023,
      day: 22,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ])
    );
  });
});
