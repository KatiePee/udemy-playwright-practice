import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/')
  await page.getByText('Forms').click()
})

test('the first test', async ({ page }) => {
  await page.getByText('Form Layout').click()
})

test('navigate to datepickerpage', async ({ page }) => {
  await page.getByText('Datepicker').click()
})

test.describe.only('Locators: ', () => {
  //before each tst click the forms layout page
  test.beforeEach(async ({ page }) => {
    await page.getByText('Form Layout').click()
  })

  //page locator accepts two arguments - the first is a string and its the html element attribute on the page, the second is an obj - the options that locator has

  //you can use the tag itself like input:
  test('Combining selectors to get to child elementsgit a', async ({ page }) => {
    //find the element with the text "using the grid"
    // the '+' mean a sibling element, only matchs the next sibling that directly follows the element
    // the '*' wild card, when used directly with + * then it selects the immediate next sibling regarless of type
    // input[placeholder="Email"] - selcts the input that is a child of the sibling element selected by + *
    await page.locator(':text-is("Using the Grid") + * input[placeholder="Email"]').click()
    //try to avoid using this way because sometimes the order of the elements can be changed
    //its best to try to find unique elements by selectors not indexies 
    await page.locator('nb-card').nth(1).getByRole('button', { name: "Sign In" }).click()
  })

  test('Locating parent elements ', async ({ page }) => {
    await page.locator("nb-card", { hasText: "Using the Grid" }).getByRole('textbox', { name: 'Email' }).click()
    //first we can find the parent element using locators that make it uniwue - then we can chain on the child element that we are looking for
    // we can also filter the parent elements by something that makes it unique. 
    await page.locator('nb-card').filter({ hasText: 'Check me out' }).getByRole('textbox', { name: 'Email' }).click()
    //seems like we should work down.. not up - so find something uniwue about the parent element then do something with its children
  })

  test('Resusing locators', async ({ page }) => {
    //find the unique parent element that we are going to reuse and asign it to a constant
    const basicForm = page.locator('nb-card', { hasText: 'Basic form' })
    //chain on the rest for the locators using that const
    await basicForm.getByRole('textbox', { name: 'Email' }).fill('email@email.com')
    await basicForm.getByRole('textbox', { name: 'Password' }).fill('password123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    //assert that check box is checked
    await expect(basicForm.getByRole('checkbox')).toBeChecked()
  })

  test('Extracting Values', async ({ page }) => {
    //testing a single value
    const basicForm = page.locator('nb-card', { hasText: 'Basic form' });
    //use textContent method to get the content of that element
    const buttonValue = await basicForm.getByRole('button').textContent();
    //assert that the button has the right content
    await expect(buttonValue).toEqual('Submit');

    //testing multiple values
    const usingTheGrid = page.locator("nb-card", { hasText: "Using the Grid" });
    //get ALL the values of the the non unqie elements - note the getbyrole locator only returns the actual rado button, not the lables associated with them... thats a bummer
    // const allRadioButtonValues = await usingTheGrid.getByRole('radio').allTextContents(); //this does not work... returns array of empty strings
    const allRadioButtonValues = await usingTheGrid.locator('nb-radio').allTextContents()
    //assert that one of the button values has the text option
    console.log('🐞~~🐞~~🐞~~ all radio values ~~~> ', allRadioButtonValues)
    //note - toContain does not support regex
    expect(allRadioButtonValues).toContain('Option 1');

    //testing input values
    const emailInput = basicForm.getByRole('textbox', { name: 'Email' })
    await emailInput.fill('email')
    expect(emailInput).toHaveValue('email')

    //testing element attributes
    //expect(emailInput).toHaveAttribute('placeholder', { name: "Email" })// this doesnt work because name isnt the attribute and we need to extract the value
    const placeholderValue = await emailInput.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')
  })

})