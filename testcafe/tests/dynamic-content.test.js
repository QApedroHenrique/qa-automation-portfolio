import { dynamicLoading, dynamicControls } from '../pages/DynamicPages';

// These pages render elements only after an async request — no fixed sleeps:
// TestCafe's assertions retry until the condition holds or the timeout expires.

fixture('Dynamic loading · The Internet').page(dynamicLoading.url);

test('waits for an element that is rendered after loading', async (t) => {
  await t.click(dynamicLoading.startButton);

  await t
    .expect(dynamicLoading.result.withText('Hello World!').exists).ok({ timeout: 15000 })
    .expect(dynamicLoading.loadingIndicator.visible).notOk();
});

fixture('Dynamic controls · The Internet').page(dynamicControls.url);

test('removes and restores a checkbox', async (t) => {
  await t
    .click(dynamicControls.checkboxToggle)
    .expect(dynamicControls.checkboxMessage.innerText).eql("It's gone!", { timeout: 15000 })
    .expect(dynamicControls.checkbox.exists).notOk();

  await t
    .click(dynamicControls.checkboxToggle)
    .expect(dynamicControls.checkboxMessage.innerText).eql("It's back!", { timeout: 15000 })
    .expect(dynamicControls.checkbox.exists).ok();
});

test('enables a disabled input before typing', async (t) => {
  await t.expect(dynamicControls.textInput.hasAttribute('disabled')).ok();

  await t
    .click(dynamicControls.inputToggle)
    .expect(dynamicControls.inputMessage.innerText).eql("It's enabled!", { timeout: 15000 })
    .expect(dynamicControls.textInput.hasAttribute('disabled')).notOk()
    .typeText(dynamicControls.textInput, 'typed after the field was enabled')
    .expect(dynamicControls.textInput.value).eql('typed after the field was enabled');
});
