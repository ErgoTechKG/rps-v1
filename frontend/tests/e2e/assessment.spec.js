import { test, expect } from '@playwright/test'

test.describe('Professor Assessment and Grading', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login page
    await page.goto('http://localhost:5173/login')
    
    // Login as professor
    await page.fill('input[type="text"]', 'professor1')
    await page.fill('input[type="password"]', 'password123')
    await page.click('button[type="submit"]')
    
    // Wait for dashboard to load
    await page.waitForURL('**/dashboard')
    await expect(page.locator('h1')).toContainText('Professor Dashboard')
  })

  test('should navigate to homework review page', async ({ page }) => {
    // Navigate to homework review
    await page.goto('http://localhost:5173/professor/courses/lab-rotation/course1/assessment/homework-review')
    
    // Check if page loads correctly
    await expect(page.locator('h2')).toContainText('Homework & Assignment Review')
    
    // Check for assignment list
    await expect(page.locator('.assignment-list')).toBeVisible()
    
    // Check for main content area
    await expect(page.locator('.main-content')).toBeVisible()
  })

  test('should display assignment statistics', async ({ page }) => {
    await page.goto('http://localhost:5173/professor/courses/lab-rotation/course1/assessment/homework-review')
    
    // Check statistics cards
    await expect(page.locator('.stats-grid .stat-card')).toHaveCount(4)
    
    // Check that statistics are displayed
    const statCards = page.locator('.stats-grid .stat-card')
    await expect(statCards.first()).toContainText('Total')
    await expect(statCards.nth(1)).toContainText('In Progress')
    await expect(statCards.nth(2)).toContainText('Completed')
    await expect(statCards.nth(3)).toContainText('Overdue')
  })

  test('should open grading modal for homework submission', async ({ page }) => {
    await page.goto('http://localhost:5173/professor/courses/lab-rotation/course1/assessment/homework-review')
    
    // Wait for submissions to load
    await page.waitForSelector('.submission-card')
    
    // Click on first "Grade" button
    await page.click('.submission-card .primary-button')
    
    // Check if grading modal opens
    await expect(page.locator('.modal-overlay')).toBeVisible()
    await expect(page.locator('.modal-content h3')).toContainText('Grade Submission')
    
    // Check for PDF viewer placeholder
    await expect(page.locator('.pdf-viewer-section')).toBeVisible()
    
    // Check for grading form
    await expect(page.locator('.grading-form')).toBeVisible()
  })

  test('should navigate to report evaluation page', async ({ page }) => {
    await page.goto('http://localhost:5173/professor/courses/lab-rotation/course1/assessment/report-evaluation')
    
    // Check if page loads correctly
    await expect(page.locator('h2')).toContainText('Research Report Evaluation')
    
    // Check for statistics
    await expect(page.locator('.stats-grid')).toBeVisible()
    
    // Check for reports list
    await expect(page.locator('.reports-section')).toBeVisible()
  })

  test('should open evaluation modal for report', async ({ page }) => {
    await page.goto('http://localhost:5173/professor/courses/lab-rotation/course1/assessment/report-evaluation')
    
    // Wait for reports to load
    await page.waitForSelector('.report-card')
    
    // Click on "Evaluate" button
    await page.click('.report-card .secondary-button:has-text("Evaluate")')
    
    // Check if evaluation modal opens
    await expect(page.locator('.modal-overlay')).toBeVisible()
    await expect(page.locator('.modal-content h3')).toContainText('Evaluate Report')
    
    // Check for evaluation criteria
    await expect(page.locator('.evaluation-form')).toBeVisible()
    await expect(page.locator('.criterion-section')).toHaveCount(4)
  })

  test('should navigate to defense scoring page', async ({ page }) => {
    await page.goto('http://localhost:5173/professor/courses/lab-rotation/course1/assessment/defense-scoring')
    
    // Check if page loads correctly
    await expect(page.locator('h2')).toContainText('Presentation & Defense Scoring')
    
    // Check for statistics
    await expect(page.locator('.stats-grid')).toBeVisible()
    
    // Check for presentations list
    await expect(page.locator('.presentations-section')).toBeVisible()
  })

  test('should start live scoring for presentation', async ({ page }) => {
    await page.goto('http://localhost:5173/professor/courses/lab-rotation/course1/assessment/defense-scoring')
    
    // Wait for presentations to load
    await page.waitForSelector('.presentation-card')
    
    // Click on "Start Live Scoring" button
    const liveButton = page.locator('.presentation-card .primary-button:has-text("Start Live Scoring")')
    if (await liveButton.count() > 0) {
      await liveButton.first().click()
      
      // Check if live scoring modal opens
      await expect(page.locator('.modal-overlay')).toBeVisible()
      await expect(page.locator('.modal-content h3')).toContainText('Live Scoring')
      
      // Check for timer
      await expect(page.locator('.live-timer')).toBeVisible()
      
      // Check for scoring criteria
      await expect(page.locator('.scoring-form')).toBeVisible()
    }
  })

  test('should navigate to final grading page', async ({ page }) => {
    await page.goto('http://localhost:5173/professor/courses/lab-rotation/course1/assessment/final-grading')
    
    // Check if page loads correctly
    await expect(page.locator('h2')).toContainText('Final Grade Calculation')
    
    // Check for statistics
    await expect(page.locator('.stats-section')).toBeVisible()
    
    // Check for grading configuration
    await expect(page.locator('.config-display')).toBeVisible()
    
    // Check for grades table
    await expect(page.locator('.grades-table')).toBeVisible()
  })

  test('should open grade configuration modal', async ({ page }) => {
    await page.goto('http://localhost:5173/professor/courses/lab-rotation/course1/assessment/final-grading')
    
    // Click on "Configure Weights" button
    await page.click('button:has-text("Configure Weights")')
    
    // Check if configuration modal opens
    await expect(page.locator('.modal-overlay')).toBeVisible()
    await expect(page.locator('.modal-content h3')).toContainText('Configure Grade Weights')
    
    // Check for weight inputs
    await expect(page.locator('.config-form .form-group')).toHaveCount(4)
    
    // Check total weight display
    await expect(page.locator('.total-weight')).toBeVisible()
  })

  test('should display grade distribution chart', async ({ page }) => {
    await page.goto('http://localhost:5173/professor/courses/lab-rotation/course1/assessment/final-grading')
    
    // Check for distribution card
    await expect(page.locator('.distribution-card')).toBeVisible()
    
    // Check for distribution chart
    await expect(page.locator('.distribution-chart')).toBeVisible()
    
    // Check for grade bars
    await expect(page.locator('.distribution-item')).toHaveCount(5) // A, B, C, D, F
  })

  test('should open grade details modal', async ({ page }) => {
    await page.goto('http://localhost:5173/professor/courses/lab-rotation/course1/assessment/final-grading')
    
    // Wait for table to load
    await page.waitForSelector('.grades-table .table-row')
    
    // Click on "Details" button
    await page.click('.table-row .action-button')
    
    // Check if grade details modal opens
    await expect(page.locator('.modal-overlay')).toBeVisible()
    await expect(page.locator('.modal-content h3')).toContainText('Grade Details')
    
    // Check for assessment breakdown
    await expect(page.locator('.assessment-breakdown')).toBeVisible()
    
    // Check for grade override section
    await expect(page.locator('.grade-override-section')).toBeVisible()
    
    // Check for comments section
    await expect(page.locator('.comments-section')).toBeVisible()
  })

  test('should handle grade submission workflow', async ({ page }) => {
    await page.goto('http://localhost:5173/professor/courses/lab-rotation/course1/assessment/final-grading')
    
    // Check for Submit Final Grades button
    const submitButton = page.locator('button:has-text("Submit Final Grades")')
    await expect(submitButton).toBeVisible()
    
    // Click submit button
    await submitButton.click()
    
    // Check for notification or confirmation
    // Note: This would need to be adjusted based on actual notification implementation
    await page.waitForTimeout(500) // Brief wait for any notifications
  })

  test('should export grades functionality', async ({ page }) => {
    await page.goto('http://localhost:5173/professor/courses/lab-rotation/course1/assessment/final-grading')
    
    // Click export button
    await page.click('button:has-text("Export Grades")')
    
    // Check for notification or download
    await page.waitForTimeout(500) // Brief wait for export process
  })

  test('should validate assessment page navigation between components', async ({ page }) => {
    const baseUrl = 'http://localhost:5173/professor/courses/lab-rotation/course1/assessment'
    
    // Test navigation to each assessment page
    const pages = [
      { path: '/homework-review', title: 'Homework & Assignment Review' },
      { path: '/report-evaluation', title: 'Research Report Evaluation' },
      { path: '/defense-scoring', title: 'Presentation & Defense Scoring' },
      { path: '/final-grading', title: 'Final Grade Calculation' }
    ]
    
    for (const pageInfo of pages) {
      await page.goto(`${baseUrl}${pageInfo.path}`)
      await expect(page.locator('h2')).toContainText(pageInfo.title)
      
      // Check that the page has loaded properly
      await expect(page.locator('.component-container')).toBeVisible()
    }
  })

  test('should handle responsive design on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    await page.goto('http://localhost:5173/professor/courses/lab-rotation/course1/assessment/homework-review')
    
    // Check that layout adapts to mobile
    await expect(page.locator('.component-container')).toBeVisible()
    
    // Check that header actions are still accessible
    await expect(page.locator('.header-actions')).toBeVisible()
  })
})

test.describe('Assessment Error Handling', () => {
  test('should handle invalid course ID gracefully', async ({ page }) => {
    // Navigate to login page
    await page.goto('http://localhost:5173/login')
    
    // Login as professor
    await page.fill('input[type="text"]', 'professor1')
    await page.fill('input[type="password"]', 'password123')
    await page.click('button[type="submit"]')
    
    // Navigate to invalid course
    await page.goto('http://localhost:5173/professor/courses/lab-rotation/invalid-course/assessment/homework-review')
    
    // Should still load the page (with empty or placeholder data)
    await expect(page.locator('.component-container')).toBeVisible()
  })

  test('should handle loading states properly', async ({ page }) => {
    // Navigate to login page
    await page.goto('http://localhost:5173/login')
    
    // Login as professor
    await page.fill('input[type="text"]', 'professor1')
    await page.fill('input[type="password"]', 'password123')
    await page.click('button[type="submit"]')
    
    // Navigate to assessment page
    await page.goto('http://localhost:5173/professor/courses/lab-rotation/course1/assessment/homework-review')
    
    // Check for either loading state or loaded content
    const hasLoadingText = await page.locator('text=Loading homework review...').count() > 0
    const hasContent = await page.locator('.assignment-list').count() > 0
    
    expect(hasLoadingText || hasContent).toBeTruthy()
  })
})