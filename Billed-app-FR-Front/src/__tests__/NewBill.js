/**
 * @jest-environment jsdom
 */
import { screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import { localStorageMock } from "../__mocks__/localStorage.js"
import {fireEvent } from "@testing-library/dom"
import mockStore from "../__mocks__/store.js"
import { ROUTES } from "../constants/routes"

jest.mock("../app/store", () => mockStore)
describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page and I click on the send form button", () => {
    test("Then form should have been sent", () => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
    const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }            
      document.body.innerHTML = NewBillUI()
      const newBill = new NewBill({ document, onNavigate, localeStorage : window.localStorage })
      const submitBtn = screen.getByTestId('btn-send-bill')
      newBill.handleSubmit = jest.fn()

      document.querySelector(`input[data-testid="expense-name"]`).value = "ExpenseTest"
      document.querySelector(`input[data-testid="datepicker"]`).value = "18/02/2022"
      document.querySelector(`select[data-testid="expense-type"]`).value = "ExpenseType"
      document.querySelector(`input[data-testid="amount"]`).value = "400"
      document.querySelector(`input[data-testid="vat"]`).value = "71"
      document.querySelector(`input[data-testid="pct"]`).value = "21"
      document.querySelector(`textarea[data-testid="commentary"]`).value = "CommentaryTest"
      newBill.fileUrl = "https://firebasestorage.googleapis.com/v0/b/billable-677b6.a…f-1.jpg?alt=media&token=c1640e12-a24b-4b11-ae52-529112e9602a" 
      newBill.fileName = "preview-facture-free-201801-pdf-1.jpg"

      submitBtn.addEventListener("click", newBill.handleSubmit )
      fireEvent.click(submitBtn)
      expect(submitBtn).toBeTruthy()
      expect(newBill.handleSubmit).toHaveBeenCalled()
    })
  })
})
  describe("When I am on NewBill Page and choose a file in the input file section", () => {
    test("Then file should  have been chosen ", () => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
     const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }

      const html = NewBillUI()
      document.body.innerHTML = html
      const newBill = new NewBill({ document, onNavigate, localeStorage : window.localStorage })
      const inputChangeFile = screen.getByTestId('file')
      newBill.handleChangeFile = jest.fn()
      inputChangeFile.addEventListener("change", newBill.handleChangeFile )
      fireEvent.change(inputChangeFile, {
        target: {
          files: [new File(["hello.jpg"], {type: 'text/txt'})]
        }
    })
      expect(inputChangeFile).toBeTruthy()
      expect(html).toBeTruthy()
      expect(newBill.handleChangeFile).toHaveBeenCalled()
    })
  }) 
  

  describe("When I am on NewBill Page and choose a non-image file in the input section", () => {
    test("Then a error message should appear in the input file section", () => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
     const store = null
     const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      const html = NewBillUI()
      document.body.innerHTML = html
      const newBill = new NewBill({ document, onNavigate, store, localeStorage : window.localStorage })
      const inputChangeFile = screen.getByTestId('file')
      expect(inputChangeFile.getAttribute("class")).toBe("form-control blue-border")
      newBill.handleChangeFile = jest.fn()
      inputChangeFile.addEventListener("change", newBill.handleChangeFile )
      fireEvent.change(inputChangeFile, {
        target: {
          files: [new File(["hello.abc"], {type: 'text/txt'})]
        }
    })
      expect(inputChangeFile).toBeTruthy()
      expect(inputChangeFile.getAttribute("class")).toBe("form-control red-border")
      expect(html).toBeTruthy()
      expect(newBill.handleChangeFile).toHaveBeenCalled()
    })
  })

