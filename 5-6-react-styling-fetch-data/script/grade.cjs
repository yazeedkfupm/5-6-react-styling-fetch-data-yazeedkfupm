// grade.cjs
// Usage: node script/grade.cjs
// Produces: ./script/feedback.txt and ./script/grade.json
// Exit: 0 always (so the workflow can decide pass/fail). Adjust as needed.

const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

const repoRoot = path.resolve(__dirname, '..'); // assumed script is in repo/script
const srcRoot = path.join(repoRoot, 'src');

// Paths the assignment references
const paths = {
  app: path.join(srcRoot, 'App.jsx'),
  searchBar: path.join(srcRoot, 'components', 'SearchBar.jsx'),
  userList: path.join(srcRoot, 'components', 'UserList.jsx'),
  userCard: path.join(srcRoot, 'components', 'UserCard.jsx'),
  userModal: path.join(srcRoot, 'components', 'UserModal.jsx'),
  indexCss: path.join(srcRoot, 'Index.css')
};

function readSafe(p) {
  try {
    return fs.readFileSync(p, 'utf8');
  } catch (e) {
    return null;
  }
}

function exists(p) {
  try {
    return fs.existsSync(p);
  } catch (e) {
    return false;
  }
}

function nowEpoch() { return Math.floor(Date.now() / 1000); }

// Utility: check presence of any of multiple patterns
function anyOf(content, patterns) {
  if (!content) return false;
  return patterns.some(p => {
    if (p instanceof RegExp) return p.test(content);
    return content.includes(p);
  });
}

// Load files
const appSrc = readSafe(paths.app);
const searchBarSrc = readSafe(paths.searchBar);
const userListSrc = readSafe(paths.userList);
const userCardSrc = readSafe(paths.userCard);
const userModalSrc = readSafe(paths.userModal);
const indexCssSrc = readSafe(paths.indexCss);

// Grading rules / checks
const checks = {
  task1: {
    name: 'Task 1 — Apply Bootstrap Components (30 pts)',
    checks: []
  },
  task2: {
    name: 'Task 2 — Apply Custom CSS Styling (20 pts)',
    checks: []
  },
  task3: {
    name: 'Task 3 — Fetch Data with React Hooks (30 pts)',
    checks: []
  }
};

// TASK 1 checks (structure + components)
checks.task1.checks.push({
  id: 'app-container',
  desc: 'App.jsx uses Container tags for header, content, footer',
  weight: 5,
  pass: anyOf(appSrc, [/<Container\b/, /import\s+\{[^}]*Container[^}]*\}\s+from\s+['"]react-bootstrap['"]/])
});

checks.task1.checks.push({
  id: 'header-classes',
  desc: 'Header has Bootstrap classes: bg-primary text-white py-3 mb-4 shadow and header h1 and p class props',
  weight: 7,
  pass: !!appSrc && appSrc.includes('bg-primary') && appSrc.includes('text-white') && appSrc.includes('py-3') && appSrc.includes('mb-4') && appSrc.includes('shadow') && appSrc.includes('h2 mb-0') && appSrc.includes('mb-0 opacity-75')
});

checks.task1.checks.push({
  id: 'searchbar-mb4',
  desc: 'SearchBar.jsx root div has mb-4 class',
  weight: 3,
  pass: !!searchBarSrc && /className\s*=\s*["'][^"']*mb-4[^"']*["']/m.test(searchBarSrc)
});

checks.task1.checks.push({
  id: 'userlist-grid',
  desc: 'UserList uses Alert variant="info", Row and Col and returns after no-users condition and maps users into Col with UserCard',
  weight: 7,
  pass: !!userListSrc && userListSrc.includes('Alert') && /variant\s*=\s*["']info["']/.test(userListSrc) && /<Row\b/.test(userListSrc) && /<Col\b/.test(userListSrc) && /users\.map\s*\(/.test(userListSrc) && /<UserCard\s+user=/.test(userListSrc) && /return\b/.test(userListSrc)
});

checks.task1.checks.push({
  id: 'usercard-button',
  desc: 'UserCard uses Button with text "View Details" and onClick calls onUserClick(user)',
  weight: 4,
  pass: !!userCardSrc && /View Details/.test(userCardSrc) && /onClick\s*=\s*\{\s*\(\)\s*=>\s*onUserClick\(\s*user\s*\)\s*\}/.test(userCardSrc)
});

checks.task1.checks.push({
  id: 'usermodal-structure',
  desc: 'UserModal uses Modal with show/onHide and displays user fields and user-avatar-large and close Button',
  weight: 4,
  pass: !!userModalSrc && /<Modal\b[^>]*show\s*=\s*\{show\}[^>]*onHide\s*=\s*\{onHide\}/.test(userModalSrc) && userModalSrc.includes('user-avatar-large') && /<Modal\.Title>.*User Details.*<\/Modal\.Title>/m.test(userModalSrc) && userModalSrc.includes('<Button') && /onClick\s*=\s*\{onHide\}/.test(userModalSrc)
});

// TASK 2 checks (CSS)
checks.task2.checks.push({
  id: 'css-root-vars',
  desc: ':root variables for theme colors',
  weight: 5,
  pass: !!indexCssSrc && indexCssSrc.includes('--primary-color: #0d6efd') && indexCssSrc.includes('--secondary-color: #6c757d') && indexCssSrc.includes('--light-color: #f8f9fa') && indexCssSrc.includes('--dark-color: #212529')
});

checks.task2.checks.push({
  id: 'css-app',
  desc: '.app background-color and min-height rules',
  weight: 5,
  pass: !!indexCssSrc && /\.app\b[^}]*\{[^}]*var\(--light-color\)[^}]*min-height\s*:\s*100vh[^}]*\}/m.test(indexCssSrc)
});

checks.task2.checks.push({
  id: 'css-user-card',
  desc: '.user-card rules border:none, background-color:white, transitions',
  weight: 4,
  pass: !!indexCssSrc && /\.user-card\b[^}]*\{[^}]*border\s*:\s*none[^}]*background-color\s*:\s*white[^}]*transition\s*:/m.test(indexCssSrc)
});

checks.task2.checks.push({
  id: 'css-user-card-hover',
  desc: '.user-card:hover transform and box-shadow',
  weight: 3,
  pass: !!indexCssSrc && /\.user-card:hover\b[^}]*\{[^}]*transform\s*:\s*translateY\(-?2px\)[^}]*box-shadow\s*:\s*0\s*4px\s*8px\s*rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\.15\s*\)/m.test(indexCssSrc)
});

checks.task2.checks.push({
  id: 'css-avatars',
  desc: '.user-avatar and .user-avatar-large rules present',
  weight: 3,
  pass: !!indexCssSrc && /\.user-avatar\b/.test(indexCssSrc) && /\.user-avatar-large\b/.test(indexCssSrc) && indexCssSrc.includes('border-radius: 50%') && indexCssSrc.includes('font-size: 2rem') // basic heuristics
});

checks.task2.checks.push({
  id: 'css-media-query',
  desc: 'responsive media query for .user-avatar at max-width: 768px',
  weight: 0, // included as quality/completeness elsewhere; keep small
  pass: !!indexCssSrc && /@media\s*\(\s*max-width\s*:\s*768px\s*\)[\s\S]*\.user-avatar/.test(indexCssSrc)
});

// TASK 3 checks (React hooks + fetch)
checks.task3.checks.push({
  id: 'hooks-import',
  desc: 'App.jsx imports useState and useEffect',
  weight: 3,
  pass: !!appSrc && /useState[\s,]*useEffect|useEffect[\s,]*useState/.test(appSrc) || /import\s+\{[^}]*useState[^}]*\}/.test(appSrc)
});

checks.task3.checks.push({
  id: 'state-vars',
  desc: 'State variables users/filteredUsers/loading/error/searchTerm/showModal/selectedUser exist',
  weight: 7,
  pass: !!appSrc && ['users','filteredUsers','loading','error','searchTerm','showModal','selectedUser'].every(v => new RegExp(`const\\s+\\[\\s*${v}\\s*,`).test(appSrc))
});

checks.task3.checks.push({
  id: 'fetch-effect',
  desc: 'useEffect that fetches https://jsonplaceholder.typicode.com/users and sets state (setUsers & setFilteredUsers)',
  weight: 8,
  pass: !!appSrc && /useEffect\s*\(\s*\(\)\s*=>|useEffect\s*\(\s*\(\s*async/.test(appSrc) && appSrc.includes('jsonplaceholder.typicode.com/users') && appSrc.includes('setUsers(') && appSrc.includes('setFilteredUsers(')
});

checks.task3.checks.push({
  id: 'filter-effect',
  desc: 'useEffect that filters users when searchTerm or users change',
  weight: 5,
  pass: !!appSrc && /useEffect\s*\(\s*\(\)\s*=>[\s\S]*(searchTerm|users)[\s\S]*\)/m.test(appSrc) && appSrc.includes('setFilteredUsers(')
});

checks.task3.checks.push({
  id: 'modal-handlers',
  desc: 'handleUserClick and handleCloseModal functions set selected user and show/hide modal',
  weight: 4,
  pass: !!appSrc && /function\s+handleUserClick|const\s+handleUserClick\s*=/.test(appSrc) && /setSelectedUser\(|setShowModal\(/.test(appSrc) && /handleCloseModal/.test(appSrc)
});

checks.task3.checks.push({
  id: 'loading-error-render',
  desc: 'loading and error conditional rendering with Spinner and Alert present before user list',
  weight: 3,
  pass: !!appSrc && /(Spinner|<Spinner\b)/.test(appSrc) && /<Alert\b/.test(appSrc) && /loading/.test(appSrc)
});

checks.task3.checks.push({
  id: 'render-components',
  desc: 'Renders <UserList users={filteredUsers} onUserClick={handleUserClick} /> and <UserModal show={showModal} user={selectedUser} onHide={handleCloseModal} />',
  weight: 0, // will be counted in completeness quality cluster
  pass: !!appSrc && /<UserList\b[^>]*users\s*=\s*\{filteredUsers\}[^>]*onUserClick\s*=\s*\{handleUserClick\}/.test(appSrc) && /<UserModal\b[^>]*show\s*=\s*\{showModal\}[^>]*user\s*=\s*\{selectedUser\}/.test(appSrc)
});

// Scoring function
function scoreTask(taskChecks, maxPoints, breakdown) {
  // breakdown: { correctness: max, completeness: max, quality: max } - but the user-specified weights are already captured above.
  const totalWeight = taskChecks.reduce((s, c) => s + (c.weight || 0), 0) || 1;
  const achievedWeight = taskChecks.reduce((s, c) => s + ((c.pass ? c.weight : 0)), 0);

  // Map weight proportion to points of maxPoints
  const points = (achievedWeight / totalWeight) * maxPoints;
  return { points: Math.round(points * 100) / 100, achievedWeight, totalWeight };
}

// Compute per-task raw scores
const task1Max = 30;
const task2Max = 20;
const task3Max = 30;

const t1 = scoreTask(checks.task1.checks, task1Max);
const t2 = scoreTask(checks.task2.checks, task2Max);
const t3 = scoreTask(checks.task3.checks, task3Max);

// Additional rule enforcement described by user:
// - If student implements some tasks -> 60/80 baseline? The user's phrasing: "If student try to implement task he will get 60/80 and submission marks as per grading policy."
// Interpret: If at least one task implemented partially, give minimum 60/80? But also earlier said "If student will do all the tasks he will get full mark for tasks out of 80 and 20 marks as per submission policy. If student will not implement any task he will get 0/80 and submission marks as per policy. If student try to implement task he will get 60/80 and submission marks as per grading policy."
// We'll implement this rule as:
let rawTasksScore = t1.points + t2.points + t3.points;
const tasksPossible = task1Max + task2Max + task3Max; // 80

const anyTaskImplemented = (t1.points > 0) || (t2.points > 0) || (t3.points > 0);
const allTasksFull = (Math.round(t1.points + t2.points + t3.points) >= tasksPossible - 0.01);
const noneImplemented = !anyTaskImplemented;

// Apply the special "attempt" rule: if anyTaskImplemented but total < 60, set to >=60 (minimum)
if (anyTaskImplemented && rawTasksScore < 60) {
  rawTasksScore = 60;
}

// If none implemented, rawTasksScore stays 0 (as required)
if (noneImplemented) rawTasksScore = 0;

// Submission time scoring: default due date is read from env DUE_DATE (ISO string). If absent fallback to a placeholder.
// The workflow will set DUE_DATE env var. Compare git last commit epoch vs due epoch.
function lastCommitEpoch() {
  try {
    // prefer GITHUB_SHA context when available, but easier: use last commit time from git
    const out = child_process.execSync('git log -1 --format=%ct', { cwd: repoRoot }).toString().trim();
    return parseInt(out, 10) || nowEpoch();
  } catch (e) {
    return nowEpoch();
  }
}

const dueDateEnv = process.env.DUE_DATE || process.env.INPUT_DUE_DATE || '2025-12-31T23:59:59Z'; // default due date (instructor should set)
const dueEpoch = Math.floor(new Date(dueDateEnv).getTime() / 1000) || Math.floor(new Date('2025-12-31T23:59:59Z').getTime() / 1000);
const commitEpoch = lastCommitEpoch();

let submissionPoints = 0;
let submissionNote = '';

if (commitEpoch <= dueEpoch) {
  submissionPoints = 20;
  submissionNote = `On time (commit ${new Date(commitEpoch * 1000).toISOString()} <= due ${new Date(dueEpoch*1000).toISOString()})`;
} else {
  submissionPoints = 10;
  submissionNote = `Late submission (commit ${new Date(commitEpoch * 1000).toISOString()} > due ${new Date(dueEpoch*1000).toISOString()})`;
}

// Final score out of 100
const finalScore = Math.round((rawTasksScore + submissionPoints) * 100) / 100;

// Build detailed feedback
const lines = [];
lines.push('AUTOGRADER FEEDBACK REPORT');
lines.push('=========================');
lines.push('');
lines.push(`Checked repository root: ${repoRoot}`);
lines.push('');
lines.push('SUMMARY SCORES');
lines.push('--------------');
lines.push(`Task 1 (Components & Layout): ${t1.points}/${task1Max}`);
lines.push(`Task 2 (CSS Styling): ${t2.points}/${task2Max}`);
lines.push(`Task 3 (Hooks & Fetch): ${t3.points}/${task3Max}`);
lines.push('');
lines.push(`Raw tasks score: ${rawTasksScore}/${tasksPossible}`);
lines.push(`Submission points: ${submissionPoints}/20`);
lines.push(`Submission note: ${submissionNote}`);
lines.push('');
lines.push(`FINAL SCORE: ${finalScore}/100`);
lines.push('');
lines.push('DETAILED CHECKS');
lines.push('---------------');

function plural(b) { return b ? 'PASS' : 'FAIL'; }

for (const tKey of ['task1','task2','task3']) {
  const t = checks[tKey];
  lines.push('');
  lines.push(`${t.name}`);
  for (const c of t.checks) {
    const status = c.pass ? 'PASS' : 'FAIL';
    lines.push(` - [${status}] ${c.desc} (${c.weight} pts)`);
  }
}

// Provide suggestions actionable for student
lines.push('');
lines.push('ACTIONABLE FEEDBACK / SUGGESTIONS');
lines.push('--------------------------------');
if (!exists(paths.app)) {
  lines.push(`- Missing file: src/App.jsx. The grader couldn't locate it.`);
} else {
  if (!checks.task1.checks.find(c=>c.id==='app-container').pass) {
    lines.push('- In App.jsx: wrap header, content and footer in <Container> tags and import/use Container from react-bootstrap.');
  }
  if (!checks.task1.checks.find(c=>c.id==='header-classes').pass) {
    lines.push('- In App.jsx: ensure header element has these classes: "bg-primary text-white py-3 mb-4 shadow". Also set h1 class to "h2 mb-0" and p class to "mb-0 opacity-75".');
  }
  if (!checks.task3.checks.find(c=>c.id==='fetch-effect').pass) {
    lines.push('- In App.jsx: add a useEffect that fetches from https://jsonplaceholder.typicode.com/users and updates setUsers and setFilteredUsers within try/catch/finally and uses setLoading(true/false).');
  }
}

if (!exists(paths.indexCss)) {
  lines.push('- Missing: src/Index.css. Add required variables and styles as specified in the assignment.');
} else {
  if (!checks.task2.checks.find(c=>c.id==='css-root-vars').pass) {
    lines.push('- In Index.css: add :root variables (--primary-color, --secondary-color, --light-color, --dark-color).');
  }
  if (!checks.task2.checks.find(c=>c.id==='css-user-card').pass) {
    lines.push('- .user-card CSS: ensure border:none, background-color:white, and transition properties are present.');
  }
}

// If nothing implemented:
if (noneImplemented) {
  lines.push('');
  lines.push('NOTE: The grader detected no implementation of Task 1/2/3. If you implemented code in other files or used different filenames, place them at the expected paths and re-run.');
}

// Save outputs
const outDir = path.join(repoRoot, 'script');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const feedbackPath = path.join(outDir, 'feedback.txt');
const gradeJsonPath = path.join(outDir, 'grade.json');

fs.writeFileSync(feedbackPath, lines.join('\n'), 'utf8');

const gradeJson = {
  score: finalScore,
  submissionPoints,
  submissionNote,
  tasks: {
    task1: { score: t1.points, max: task1Max },
    task2: { score: t2.points, max: task2Max },
    task3: { score: t3.points, max: task3Max }
  },
  rawTasksScore,
  details: checks
};

fs.writeFileSync(gradeJsonPath, JSON.stringify(gradeJson, null, 2), 'utf8');

console.log('--- AUTOGRADER RUN SUMMARY ---');
console.log(`Final Score: ${finalScore}/100`);
console.log(`Feedback written to: ${feedbackPath}`);
console.log(`Grade JSON written to: ${gradeJsonPath}`);
console.log('');
console.log('To include in GitHub Actions artifact: script/feedback.txt');
console.log('-------------------------------');

// export summary for actions if desired
try {
  // GitHub Actions: set output (works if run via actions/github-script or actions/checkout -> node)
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `score=${finalScore}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `feedback=${feedbackPath}\n`);
  }
} catch (e) { /* ignore */ }

// Exit normally
process.exit(0);
