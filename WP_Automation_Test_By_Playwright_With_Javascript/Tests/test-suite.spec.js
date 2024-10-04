const path = require ('path');
require('dotenv').config({path: path.resolve(__dirname, '../env')});
console.log("WP_URL:", process.env.WP_URL);
console.log("WP_USERNAME:",process.env.WP_USERNAME);
console.log("WP_PASSWORD:",process.env.WP_PASSWORD);

const { chromium } =require ( 'playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Define WordPress login credentials
    const wpUrl = process.env.WP_URL;
    const username = process.env.WP_USERNAME;
    const password = process.env.WP_PASSWORD;

    if (!wpUrl ||!username || !password) {
        console.error ('Environment variables not loaded Properly.');
        process.exit(1);
    }

    // Log in to WordPress
    await page.goto(wpUrl);
    await page.fill('#user_login', username);
    await page.fill('#user_pass', password);
    await page.click('#wp-submit');


/*(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const { WP_URL, WP_USERNAME, WP_PASSWORD } = process.env;

  // Helper function to log in
  async function login() {
    await page.goto(`${WP_URL}/wp-login.php`);
    await page.fill('#user_login', WP_USERNAME);
    await page.fill('#user_pass', WP_PASSWORD);
    await page.click('#wp-submit');
    await page.waitForLoadState('load');
  }

  // Log in to WordPress
  await login();

  */

  // Check if WP Dark Mode plugin is active
  await page.goto(`${WP_URL}/wp-admin/plugins.php`);
  const pluginActive = await page.isVisible('text="Deactivate"');

  if (!pluginActive) {
    // Install and activate the WP Dark Mode plugin
    await page.goto(`${WP_URL}/wp-admin/plugin-install.php?s=WP%20Dark%20Mode&tab=search`);
    await page.click('text="Install Now"');
    await page.click('text="Activate"');
  }

  // Enable Admin Dashboard Dark Mode
  await page.goto(`${WP_URL}/wp-admin/admin.php?page=wp-dark-mode-settings`);
  await page.click('text="Enable Admin Dashboard Dark Mode"');
  await page.click('text="Save Settings"');

  // Validate dark mode is working on Admin Dashboard
  await page.reload();
  // Add your validation logic here

  // Navigate to WP Dark Mode customization
  await page.goto(`${WP_URL}/wp-admin/admin.php?page=wp-dark-mode-settings`);
  await page.click('text="Customization"');

  // Change Floating Switch Style
  await page.selectOption('#floating_switch_style', 'option_value'); // Replace 'option_value' with actual value
  await page.click('text="Save Settings"');

  // Switch Customization - Select Custom Switch size & Scale it to 220
  await page.fill('#switch_custom_size', '220');
  await page.click('text="Save Settings"');

  // Change Floating Switch Position (Left)
  await page.selectOption('#floating_switch_position', 'left');
  await page.click('text="Save Settings"');

  // Disable Keyboard Shortcut from Accessibility Settings
  await page.click('text="Accessibility Settings"');
  await page.uncheck('#keyboard_shortcut');
  await page.click('text="Save Settings"');

  // Enable Page-Transition Animation & change the Animation Effect
  await page.click('text="Site Animation"');
  await page.check('#enable_page_transition_animation');
  await page.selectOption('#page_transition_animation_effect', 'new_effect'); // Replace 'new_effect' with actual value
  await page.click('text="Save Settings"');

  // Validate dark mode is working on front end
  await page.goto(WP_URL);
  // Add your validation logic here

  await browser.close();
})();

