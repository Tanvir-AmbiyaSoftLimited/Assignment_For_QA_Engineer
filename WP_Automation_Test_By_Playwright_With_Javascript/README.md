# WordPress Dark Mode Automation Test Suite

## Description
This test suite automates the following scenarios for a WordPress site using the WP Dark Mode plugin.

## Requirements
- Node.js
- Playwright

## Setup
1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd wordpress-dark-mode-tests
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory with the following contents:
    ```ini
    WP_URL=http://your-wordpress-site.com
    WP_USERNAME=your-username
    WP_PASSWORD=your-password
    ```

## Running Tests
Run the test suite with:
```bash
node tests/test-suite.spec.js

## Test Scenarios

   - Log in to your WordPress site.
   - Check whether the “WP Dark Mode” Plugin is Active or not.
   - If Active, navigate to the WP Dark Mode & continue. Otherwise, Install the Plugin and Activate it.
   - Enable Admin Dashboard Dark Mode from Controls → Admin Panel Dark Mode.
   - Validate whether the dark mode is working or not on the Admin Dashboard.
   - Navigate to the WP Dark Mode.
   - From Customization → Switch Settings → Change the “Floating Switch Style” from the default selections.
   - From Customization → Switch Settings → Switch Customization - Select Custom Switch size & Scale it to 220.
   - From Customization → Switch Settings - Change the Floating Switch Position (Left).
   - Disable the Keyboard Shortcut from the Accessibility Settings.
   - From Customization → Site Animation → “Enable Page-Transition Animation” & change the Animation Effect from the default selections.
   - Validate whether the dark mode is working or not from the front end