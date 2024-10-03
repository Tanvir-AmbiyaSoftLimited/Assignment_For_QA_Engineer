import os
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Environment variables
WP_URL = os.getenv('WP_URL')
WP_USERNAME = os.getenv('WP_USERNAME')
WP_PASSWORD = os.getenv('WP_PASSWORD')

# Initialize WebDriver
driver = webdriver.Chrome()

def login_to_wordpress():
    driver.get(WP_URL)
    driver.find_element(By.ID, 'user_login').send_keys(WP_USERNAME)
    driver.find_element(By.ID, 'user_pass').send_keys(WP_PASSWORD)
    driver.find_element(By.ID, 'wp-submit').click()

def check_and_activate_plugin():
    driver.get(WP_URL + '/wp-admin/plugins.php')
    try:
        driver.find_element(By.XPATH, "//tr[contains(@class, 'active') and .//strong[text()='WP Dark Mode']]")
    except:
        driver.find_element(By.XPATH, "//tr[.//strong[text()='WP Dark Mode']]//a[text()='Activate']").click()

def enable_admin_dashboard_dark_mode():
    driver.get(WP_URL + '/wp-admin/admin.php?page=wp-dark-mode')
    driver.find_element(By.XPATH, "//input[@id='wp_dark_mode_admin']").click()
    driver.find_element(By.XPATH, "//button[text()='Save Settings']").click()

def validate_dark_mode_admin():
    driver.refresh()
    body_class = driver.find_element(By.TAG_NAME, 'body').get_attribute('class')
    assert 'wp-dark-mode' in body_class

def customize_switch_settings():
    driver.get(WP_URL + '/wp-admin/admin.php?page=wp-dark-mode#customize')
    driver.find_element(By.XPATH, "//select[@id='wp_dark_mode_switch_style']").send_keys(Keys.DOWN)
    driver.find_element(By.XPATH, "//button[text()='Save Settings']").click()

def disable_keyboard_shortcut():
    driver.get(WP_URL + '/wp-admin/admin.php?page=wp-dark-mode#accessibility')
    driver.find_element(By.XPATH, "//input[@id='wp_dark_mode_keyboard_shortcut']").click()
    driver.find_element(By.XPATH, "//button[text()='Save Settings']").click()

def enable_page_transition_animation():
    driver.get(WP_URL + '/wp-admin/admin.php?page=wp-dark-mode#animation')
    driver.find_element(By.XPATH, "//input[@id='wp_dark_mode_page_transition']").click()
    driver.find_element(By.XPATH, "//select[@id='wp_dark_mode_page_transition_effect']").send_keys(Keys.DOWN)
    driver.find_element(By.XPATH, "//button[text()='Save Settings']").click()

def validate_dark_mode_frontend():
    driver.get(WP_URL)
    body_class = driver.find_element(By.TAG_NAME, 'body').get_attribute('class')
    assert 'wp-dark-mode' in body_class

def run_tests():
    login_to_wordpress()
    check_and_activate_plugin()
    enable_admin_dashboard_dark_mode()
    validate_dark_mode_admin()
    customize_switch_settings()
    disable_keyboard_shortcut()
    enable_page_transition_animation()
    validate_dark_mode_frontend()
    driver.quit()

if __name__ == "__main__":
    run_tests()