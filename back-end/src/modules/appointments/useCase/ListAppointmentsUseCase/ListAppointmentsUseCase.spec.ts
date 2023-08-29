import { InMemoryAppointmentRepository } from "@modules/appointments/repositories/in-memory/inMemoryAppointmentsRepository";
import { beforeEach, describe, expect, it } from "vitest";
import { ListAppointmentsUseCase } from "./ListAppointmentsUseCase";
import CreateAppointmentsUseCase from "../CreateAppointmentsUseCase/CreateAppointmentsUseCase";


let inMemoryAppointmentRepository: InMemoryAppointmentRepository
let sut: ListAppointmentsUseCase

describe('List Appointments Use Case', () => {

  beforeEach(() => {
    inMemoryAppointmentRepository = new InMemoryAppointmentRepository();
    sut = new ListAppointmentsUseCase(inMemoryAppointmentRepository)
  })

  it('Should be able to list  appointments', async () => {

    const createAppointemntUsecase = new CreateAppointmentsUseCase(inMemoryAppointmentRepository)

    await createAppointemntUsecase.execute({
      provider_id: 'provider-id-teste-01',
      date: new Date()
    })

    await createAppointemntUsecase.execute({
      provider_id: 'provider-id-teste-02',
      date: new Date()
    })

    await createAppointemntUsecase.execute({
      provider_id: 'provider-id-teste-03',
      date: new Date()
    })

    const appointements = await sut.execute()

    expect(appointements).toHaveLength(3)

  })

  it('Should not be able to create two appointment on the same time', async () => { })
})