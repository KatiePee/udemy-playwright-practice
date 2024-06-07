import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/')
})

test('the first test', async ({ page }) => {
  await page.getByText('Forms').click()
  await page.getByText('Form Layout').click()
})

test('navigate to datepickerpage', async ({ page }) => {
  await page.getByText('Forms').click()
  await page.getByText('Datepicker').click()
})

test.describe.only('Locators: ', () => {
  //before each tst click the forms layout page
  test.beforeEach(async ({ page }) => {
    await page.getByText('Forms').click()
    await page.getByText('Form Layout').click()
  })

  //page locator accepts two arguments - the first is a string and its the html element attribute on the page, the second is an obj - the options that locator has

  //you can use the tag itself like input:
  test('HTML Tag', async ({ page }) => {
    await page.locator('input').first().click()

    //since an input eement is not unique the locator will return an array of elements... which means we cnanot performa an action or assertion on them
    //first we must choose the element to use.... we can use .first() or something like that
    //locator returns the locator object not the elements -- we have to do some other stuff to get to the elements themselves... 
  })

})