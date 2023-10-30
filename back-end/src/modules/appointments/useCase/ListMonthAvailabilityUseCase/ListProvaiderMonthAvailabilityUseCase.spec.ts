import { beforeEach, describe, expect, it, vi } from "vitest";
import { ListProvaiderMonthAvailabilitysUseCase } from "./ListProvaiderMonthAvailabilityUseCase";
import { InMemoryAppointmentRepository } from "@modules/appointments/repositories/in-memory/inMemoryAppointmentsRepository";

let inMemoryAppointmentsRepository: InMemoryAppointmentRepository;
let sut: ListProvaiderMonthAvailabilitysUseCase;

describe("List Provaiders Month Availability", () => {
  beforeEach(() => {
    inMemoryAppointmentsRepository = new InMemoryAppointmentRepository();
    sut = new ListProvaiderMonthAvailabilitysUseCase(
      inMemoryAppointmentsRepository
    );
  });

  it("should be able to list providers the month availability from provaider", async () => {
    await inMemoryAppointmentsRepository.create({
      provider_id: "provaider",
      date: new Date(2023, 10, 22, 8, 0, 0) /* 22/10/2023 8:00 */,
    });

    await inMemoryAppointmentsRepository.create({
      provider_id: "provaider",
      date: new Date(2023, 10, 22, 10, 0, 0) /* 22/11/2023 10:00 */,
    });

    await inMemoryAppointmentsRepository.create({
      provider_id: "provaider",
      date: new Date(2023, 10, 23, 9, 0, 0) /* 23/11/2023 9:00 */,
    });

    await inMemoryAppointmentsRepository.create({
      provider_id: "provaider",
      date: new Date(2023, 11, 13, 9, 0, 0) /* 13/12/2023 9:00 */,
    });

    const availability = await sut.execute({
      provider_id: "provaider",
      month: 12,
      year: 2023,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 1, available: true },
        { day: 2, available: false },
        { day: 3, available: false },
        { day: 4, available: true },
      ])
    );
  });
});
