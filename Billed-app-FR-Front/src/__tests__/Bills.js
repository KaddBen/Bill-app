/**
 * @jest-environment jsdom
 */

import {screen, waitFor} from "@testing-library/dom"
import BillsUI from "../views/BillsUI.js"
import { bills } from "../fixtures/bills.js"
import { ROUTES, ROUTES_PATH } from "../constants/routes.js";
import {localStorageMock} from "../__mocks__/localStorage.js";
import mockStore from "../__mocks__/store.js"
import router from "../app/Router";
import userEvent from '@testing-library/user-event'
import  Bills  from "../containers/Bills.js";

jest.mock("../app/store", () => mockStore)

describe("Given I am connected as an employee", () => {
  describe("When I am on Bills Page", () => {
    test("Then bill icon in vertical layout should be highlighted", async () => {

      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.append(root)
      router()
      window.onNavigate(ROUTES_PATH.Bills)
      await waitFor(() => screen.getByTestId('icon-window'))
      const windowIcon = screen.getByTestId('icon-window')
      expect(windowIcon).toBeTruthy()
    })
    test("Then bills should be ordered from earliest to latest", () => {
      document.body.innerHTML = BillsUI({ data: bills })
      const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML)
      const antiChrono = (a, b) => ((a < b) ? 1 : -1)
      const datesSorted = [...dates].sort(antiChrono)
      expect(dates).toEqual(datesSorted)
    }) 
    })
  })


// test d'intégration GET
describe("Given I am a user connected as Employee", () => {
  describe("When I am on the Bills page", () => {
test("fetches bills from mock API GET", async () => {
  const root = document.createElement("div")
  root.setAttribute("id", "root")
  document.body.append(root)
  router()
  window.onNavigate(ROUTES_PATH.Bills)
  await waitFor(() => screen.getByText("Mes notes de frais"))
  const textTransport  = await screen.getAllByText("Transports")
  expect(textTransport).toBeTruthy()
  const textHotel  = await screen.getAllByText("Hôtel et logement")
  expect(textHotel).toBeTruthy()
})
describe("When an error occurs on API", () => {
beforeEach(() => {
  jest.spyOn(mockStore, "bills")
  Object.defineProperty(
      window,
      'localStorage',
      { value: localStorageMock }
  )
  window.localStorage.setItem('user', JSON.stringify({
    type: 'Employee',
    email: "a@a"
  }))
  const root = document.createElement("div")
  root.setAttribute("id", "root")
  document.body.appendChild(root)
  router()
})
test("fetches bills from an API and fails with 404 message error", async () => {

  mockStore.bills.mockImplementationOnce(() => {
    return {
      list : () =>  {
      return Promise.reject(new Error("Erreur 404"))
      }
    }})
  window.onNavigate(ROUTES_PATH.Bills)
  await new Promise(process.nextTick);
  const message = await screen.getByText(/Erreur 404/)
  expect(message).toBeTruthy()
})
test("fetches bills from an API and fails with 500 message error", async () => {

  mockStore.bills.mockImplementationOnce(() => {
    return {
      list : () =>  {
        return Promise.reject(new Error("Erreur 500"))
      }
    }})

  window.onNavigate(ROUTES_PATH.Bills)
  await new Promise(process.nextTick);
  const message = await screen.getByText(/Erreur 500/)
  expect(message).toBeTruthy()
})

describe("When I'm the bills page", () => {
test("Then the page should be rendered correctly", async () => {


  window.onNavigate(ROUTES_PATH.Bills)
  const bills = new Bills({ document, onNavigate, localStorage  }) 
  bills.handleClickNewBill() 
  const message = await screen.getAllByText("Envoyer une note de frais")
  expect(message).toBeTruthy() 

})
describe("When I'm the bills page and I click on the eye icon", () => {
test("Then a modal should pop-up", async () => {
      $.fn.modal = jest.fn()
   document.body.innerHTML = BillsUI({data: bills})
   const bill = new Bills({ document, localStorage: window.localStorage})   
   const btnIconeye = await screen.getAllByTestId('icon-eye')[0]
   const handleClickIconEye = jest.fn(bill.handleClickIconEye(btnIconeye))
   expect(btnIconeye).toBeTruthy()
     btnIconeye.addEventListener('click',handleClickIconEye(btnIconeye))
      userEvent.click(btnIconeye)
      expect(handleClickIconEye).toHaveBeenCalled() 
})
})
})
})
  })
})




