export class GaragePage {
  constructor(page) {
    this.page = page;
    this.addCarButton = page.getByRole('button', { name: 'Add car' })
    this.addMillage = page.getByRole('spinbutton', { name: 'Mileage' })
    this.createNewCar = page.getByRole('button', { name: 'Add' })
    this.createdEntity = page.getByText('Audi TTAdd fuel expenseUpdate').first()
  }
}
