import { expect, test } from '@playwright/test'

test('the first test', async ({ page }) => {
  await page.goto('http://localhost:4200/')
  await page.getByText('Forms').click()
  await page.getByText('Form Layout').click()
})

test('navigate to datepickerpage', async ({ page }) => {
  await page.goto('http://localhost:4200/')
  await page.getByText('Datepicker').click()
})