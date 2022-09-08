/**
 * @jest-environment jsdom
 */
import { findAllByAltText, findByTestId, screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import { localStorageMock } from "../__mocks__/localStorage.js"
import userEvent from '@testing-library/user-event'
import {fireEvent, waitFor} from "@testing-library/dom"
import { bills } from "../fixtures/bills.js"
import { ROUTES, ROUTES_PATH } from "../constants/routes"
import mockStore from "../__mocks__/store.js"
import router from "../app/Router";
import Store from "../app/Store.js"

jest.mock("../app/store", () => mockStore)

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page and I click on the send form button", () => {
    test("Then form should have been sent", () => {
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
      const submitBtn = screen.getByTestId('btn-send-bill')
      const datePicker = screen.getByTestId('datepicker')
      newBill.handleSubmit = jest.fn()
      submitBtn.addEventListener("click", newBill.handleSubmit )
      fireEvent.click(submitBtn)
      expect(submitBtn).toBeTruthy()
      expect(datePicker).toBeTruthy()
      expect(html).toBeTruthy()
      expect(newBill.handleSubmit).toHaveBeenCalled()

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
     
      const store = null
      const html = NewBillUI()
      document.body.innerHTML = html
      const newBill = new NewBill({ document, onNavigate, store, localeStorage : window.localStorage })
      const inputChangeFile = screen.getByTestId('file')
      newBill.handleChangeFile = jest.fn()
      inputChangeFile.addEventListener("change", newBill.handleChangeFile )
      fireEvent.change(inputChangeFile, {
        target: {
          files: [new File(["hello.txt"], {type: 'text/txt'})]
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
})
