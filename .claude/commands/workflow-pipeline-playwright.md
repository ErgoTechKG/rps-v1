# Workflow Pipeline - Fully Automated Continuous Task Execution with E2E Testing

This command orchestrates the complete development workflow from task planning to completion, automatically processing all pending tasks in TASK.md, then running comprehensive E2E tests with automated bug fixing until all tests pass.

## Pipeline Overview

```
┌─→ START
│     ↓
│   Check TASK.md for pending tasks
│     ↓
│   Any pending tasks? ──No──→ Run Playwright E2E Testing
│     ↓                           ↓
│     Yes                    Generate Test Report
│     ↓                           ↓
│   For each pending task:   Tests Pass? ──Yes──→ END
│     1. /new-tasks-md               ↓
│     2. /generate-issue          No
│     3. /generate-prp            ↓
│     4. /execute-prp        Create/Update Bug Tasks in TASK.md
│     5. /close-issue             ↓
│     ↓                           │
│   All tasks completed           │
│     ↓                           │
│   (Continue to E2E Testing)     │
│                                 │
└─────────────────────────────────┘
```

## Execution Steps

### Step 1: Initialize Pipeline
- Read TASK.md to identify pending tasks
- Check current sprint status
- List all High/Medium/Low priority tasks

### Step 2: Task Selection
- Process tasks in priority order: High → Medium → Low
- For each task, extract:
  - Task number (e.g., Task 8, Task 9)
  - Task name and description
  - Any specific requirements

### Step 3: Execute Task Pipeline

For each selected task:

#### 3.1 Planning Phase
Execute: `/new-tasks-md`
- Generate NEXT_STEPS_TASKxx.md based on:
  - @PLANNING.md (architecture and constraints)
  - @TASK.md (current progress and dependencies)
- Output: NEXT_STEPS_TASKxx.md with detailed planning

#### 3.2 Issue Creation
Execute: `/generate-issue NEXT_STEPS_TASKxx.md`
- Update PLANNING.md and TASK.md
- Create GitHub issue with task details
- Create feature branch (e.g., feature/task-8-ai-matching)
- Checkout the new branch

#### 3.3 PRP Generation
Execute: `/generate-prp NEXT_STEPS_TASKxx.md`
- Research codebase patterns
- Research external documentation
- Generate comprehensive PRP
- Output: PRPs/task-xx-[feature-name].md

#### 3.4 Implementation
Execute: `/execute-prp PRPs/task-xx-[feature-name].md`
- Load and understand PRP
- Create implementation plan with TodoWrite
- Execute all code changes
- Run validation commands
- Fix any issues until all tests pass

#### 3.5 Completion
Execute: `/close-issue`
- Update TASK.md (move to completed, add notes)
- Commit all changes
- Create pull request with "Closes #X"
- Merge PR
- Delete feature branch
- Return to main branch

### Step 4: Loop Control
- After completing a task, check for more pending tasks
- If tasks remain, continue with next priority task
- If all tasks completed, proceed to E2E testing phase

### Step 5: Playwright E2E Testing Phase (After All Tasks Complete)

Once all development tasks are completed, the pipeline automatically enters the E2E testing phase:

#### 5.1 Initialize Testing Environment
- Ensure Docker services are running: `docker compose ps`
- Verify health checks: `curl http://localhost:8000/health`
- Confirm frontend is accessible: `curl http://localhost:3000`
- Seed test data if needed

#### 5.2 Execute Comprehensive Test Suite
Run all E2E tests using Playwright:
```bash
cd frontend
npm run test:e2e
```

Test categories executed:
- **Authentication Tests** (`auth/`): Login/logout for all 4 roles
- **Professor Workflows** (`professor/`): Project management, student selection
- **Student Workflows** (`student/`): Applications, progress reporting
- **Secretary Functions** (`secretary/`): Form management, monitoring
- **Admin Operations** (`admin/`): User management, system config
- **Form Automation** (`forms/`): Dynamic forms, document parsing
- **Real-time Features** (`dashboards/`): WebSocket, live updates
- **Mobile/Responsive** (`mobile/`): All viewport sizes
- **Accessibility** (`accessibility/`): WCAG 2.1 AA compliance
- **Internationalization** (`i18n/`): Chinese/English switching

#### 5.3 Generate Test Report
- Playwright generates reports in `frontend/e2e/reports/`
- HTML report: `frontend/e2e/reports/html/index.html`
- JSON results: `frontend/e2e/reports/results.json`
- Screenshots of failures: `frontend/e2e/reports/test-results/`

### Step 6: Bug Tracking and Resolution Loop

After running E2E tests, the pipeline enters an automated bug fixing loop:

#### 6.1 Check Test Results
Parse the test results to determine next action:
```bash
# Check if all tests passed
if all tests pass:
    → Proceed to Step 7 (Final Validation)
else:
    → Continue with bug fixing loop
```

#### 6.2 Create/Update Bug Tasks in TASK.md

**Important Rules**:
- NEVER modify tasks in the "Completed Tasks" section
- Check existing tasks in "To Do", "In Progress", and priority sections
- Merge related bugs with existing tasks when appropriate
- Create new tasks only for bugs not covered by existing tasks

**Process**:
1. Read current TASK.md sections (excluding completed)
2. Analyze each test failure
3. For each bug:
   - Check if it relates to an existing task
   - If yes: Update that task with E2E test details
   - If no: Create new bug fix task

**Example: Updating Existing Task**
```markdown
### To Do 📝

- **Task 15: Fix StudentProfile Model Foreign Key Relationships**
  - Original Issue: Login fails with "AmbiguousForeignKeysError..."
  - E2E Test Failures:
    - auth/login.spec.ts: "Student login" (3 failures)
    - student/dashboard.spec.ts: "Load profile data" (2 failures)
  - Additional bugs discovered:
    - Student dashboard fails to load profile data
    - Research log creation throws relationship error
  - Screenshots: e2e/reports/bugs/task15/
  - Priority: Upgraded from Medium to Critical (blocks core workflows)
```

**Example: Creating New Bug Task**
```markdown
- **Bug Fix: WebSocket Connection Drops After 5 Minutes**
  - Discovered in: dashboards/real-time-updates.spec.ts
  - Test: "should maintain WebSocket connection for extended periods"
  - Error: WebSocket disconnects after 300 seconds
  - Screenshot: e2e/reports/bugs/websocket-timeout.png
  - Impact: Real-time features stop working
  - Priority: Major
```

#### 6.3 Loop Back to Start
After creating/updating bug tasks in TASK.md:
- Return to Step 1 (Check TASK.md for pending tasks)
- The newly created bug tasks will be processed through the standard pipeline
- Each bug fix will go through the full workflow:
  - Create NEXT_STEPS document
  - Generate GitHub issue
  - Create PRP
  - Implement fix
  - Create PR and merge
- This ensures consistent process for all changes

### Step 7: Final Validation and Completion

When all E2E tests pass (100% success rate):

#### 7.1 Generate Success Report
Create comprehensive test completion report:
```markdown
## E2E Testing Complete ✅

### Summary
- Total Test Suites: X
- Total Tests: Y
- Pass Rate: 100%
- Bug Fix Iterations: Z

### Bugs Fixed
- Critical: X bugs
- Major: Y bugs  
- Minor: Z bugs

### Test Coverage
- Authentication: ✅ All roles tested
- Core Workflows: ✅ All user journeys validated
- Form Automation: ✅ Dynamic forms working
- Real-time Features: ✅ WebSocket stable
- Mobile/Responsive: ✅ All viewports tested
- Accessibility: ✅ WCAG 2.1 AA compliant
- Internationalization: ✅ 中文/English working

### Performance Metrics
- Average page load: X ms
- API response time: Y ms
- WebSocket latency: Z ms

### Report Location
- HTML Report: frontend/e2e/reports/html/index.html
- Screenshots: frontend/e2e/reports/screenshots/
```

#### 7.2 Update TASK.md
Add E2E testing completion to task tracking:
```markdown
### ✅ Completed Tasks

- **E2E Testing and Bug Fixes** ✅ (Completed: [Date])
  - Ran comprehensive Playwright E2E test suite
  - Fixed X critical, Y major, Z minor bugs
  - Achieved 100% test pass rate after N iterations
  - All user workflows validated
  - Performance and accessibility standards met
  - Ready for production deployment
```

#### 7.3 Final Commit
Create commit with all bug fixes and test updates:
```bash
git add -A
git commit -m "test: achieve 100% E2E test pass rate

- Fixed all bugs discovered during E2E testing
- Updated test data and fixtures
- Enhanced error handling based on test findings
- All Playwright tests now passing
- Ready for production deployment"
git push
```

#### 7.4 Pipeline Completion
- Display success message with summary
- Show total execution time
- List all completed tasks and bug fixes
- Confirm application is production-ready

## Progress Tracking

Throughout execution:
- Show current task being processed
- Display pipeline stage (1-7)
- Report validation results
- Log any errors or blockers

## Error Recovery

If any step fails:
- Stop at the failed step
- Report the error clearly
- Provide recovery instructions
- Allow resuming from the failed step

## Fully Automated Execution

The pipeline runs continuously without user checkpoints:
- Automatically selects the highest priority pending task
- Executes all 5 pipeline steps without pausing
- Automatically creates and merges pull requests
- Continues to the next task immediately after completion
- Only stops when all tasks are completed or an error occurs

## Example Usage

```
/workflow-pipeline
```

This will:
1. Analyze TASK.md for all pending tasks
2. Start with the highest priority task
3. Execute the complete pipeline for that task automatically (no user confirmation)
4. Continue with the next task immediately
5. After all tasks complete, run comprehensive E2E tests
6. Fix any bugs found until 100% tests pass
7. Generate final report and confirm production readiness

## Example E2E Testing Loop

```
Pipeline Iteration 1:
- Check TASK.md: 5 development tasks pending
- Complete all 5 tasks through standard pipeline
- Run E2E tests: 85/100 pass
- Create 15 bug fix tasks in TASK.md
- Loop back to START

Pipeline Iteration 2:
- Check TASK.md: 15 bug fix tasks pending
- Complete all 15 bug fixes through standard pipeline
- Run E2E tests: 96/100 pass
- Create 4 bug fix tasks in TASK.md
- Loop back to START

Pipeline Iteration 3:
- Check TASK.md: 4 bug fix tasks pending
- Complete all 4 bug fixes through standard pipeline
- Run E2E tests: 100/100 pass ✅
- Generate success report
- Pipeline complete!
```

## Notes

- Each command in the pipeline is executed exactly as defined in its respective .md file
- The pipeline maintains state between steps
- All git operations are performed automatically
- Validation must pass before proceeding to next step
- **FULLY AUTOMATED**: No user confirmations or checkpoints - runs continuously until completion
- User can interrupt the pipeline manually if needed, but it will not pause on its own
- The pipeline will automatically merge PRs and continue to the next task
- **E2E TESTING LOOP**: After development, the pipeline ensures 100% test coverage before completion
- **SMART BUG TRACKING**: Integrates bugs with existing tasks to avoid duplication
- **PRODUCTION READY**: Only completes when all tests pass and application is deployment-ready