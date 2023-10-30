import { beforeEach, describe, expect, it, test, vi } from "vitest";
import { ListProvaiderMonthAvailabilitysUseCase } from "./ListProvaiderMonthAvailabilityUseCase";
import { InMemoryAppointmentRepository } from "@modules/appointments/repositories/in-memory/inMemoryAppointmentsRepository";
import { getHours, getSeconds, setHours, setSeconds } from "date-fns";

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
    const teste = [];

    let date = new Date(2023, 10, 22, 5, 0, 0);

    for (let i = 0; i < 10; i++) {
      let hour = getHours(date);
      date.setHours(hour + 1);

      const value = await inMemoryAppointmentsRepository.create({
        provider_id: "provaider",
        date: new Date(2023, 10, 22, hour, 0, 0) /* 22/10/2023 8:00 */,
      });

      teste.push(value);
    }

    await inMemoryAppointmentsRepository.create({
      provider_id: "provaider",
      date: new Date(2023, 10, 23, 9, 0, 0) /* 13/12/2023 9:00 */,
    });

    const availability = await sut.execute({
      provider_id: "provaider",
      month: 11,
      year: 2023,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 21, available: true },
        { day: 22, available: false },
        { day: 23, available: true },
      ])
    );
  });
});
