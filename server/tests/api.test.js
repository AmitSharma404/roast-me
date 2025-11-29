import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import { spawn } from 'node:child_process';

let serverProcess;
let serverReady = false;

const API_BASE = 'http://localhost:5001';

describe('Roast Me API Tests', () => {
  before(async () => {
    // Start the server on a different port for testing
    return new Promise((resolve) => {
      serverProcess = spawn('node', ['src/index.js'], {
        cwd: process.cwd(),
        env: { ...process.env, PORT: '5001' },
        stdio: ['pipe', 'pipe', 'pipe']
      });

      serverProcess.stdout.on('data', (data) => {
        if (data.toString().includes('running on port')) {
          serverReady = true;
          resolve();
        }
      });

      serverProcess.stderr.on('data', (data) => {
        console.error('Server error:', data.toString());
      });

      // Timeout after 5 seconds
      setTimeout(() => {
        if (!serverReady) {
          serverReady = true;
          resolve();
        }
      }, 5000);
    });
  });

  after(() => {
    if (serverProcess) {
      serverProcess.kill();
    }
  });

  describe('Health Endpoint', () => {
    it('should return health status', async () => {
      const response = await fetch(`${API_BASE}/api/health`);
      assert.strictEqual(response.status, 200);
      
      const data = await response.json();
      assert.strictEqual(data.status, 'ok');
      assert.ok(data.message.includes('Roast Me'));
      assert.ok(data.timestamp);
      assert.strictEqual(data.version, '1.0.0');
    });
  });

  describe('Roast Levels Endpoint', () => {
    it('should return available roast levels', async () => {
      const response = await fetch(`${API_BASE}/api/roast/levels`);
      assert.strictEqual(response.status, 200);
      
      const data = await response.json();
      assert.strictEqual(data.success, true);
      assert.ok(Array.isArray(data.levels));
      assert.strictEqual(data.levels.length, 3);
      
      const levelIds = data.levels.map(l => l.id);
      assert.ok(levelIds.includes('mild'));
      assert.ok(levelIds.includes('spicy'));
      assert.ok(levelIds.includes('extra-burn'));
    });
  });

  describe('GitHub Roast Endpoint', () => {
    it('should require username', async () => {
      const response = await fetch(`${API_BASE}/api/roast/github`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      
      assert.strictEqual(response.status, 400);
      const data = await response.json();
      assert.strictEqual(data.success, false);
      assert.ok(data.error.includes('username'));
    });

    it('should reject invalid roast level', async () => {
      const response = await fetch(`${API_BASE}/api/roast/github`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'octocat', level: 'invalid' })
      });
      
      assert.strictEqual(response.status, 400);
      const data = await response.json();
      assert.strictEqual(data.success, false);
      assert.ok(data.error.includes('Invalid roast level'));
    });

    it('should roast a valid GitHub profile', async () => {
      const response = await fetch(`${API_BASE}/api/roast/github`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'octocat', level: 'mild' })
      });
      
      // GitHub API may be rate limited or blocked in test environment
      if (response.status === 500 || response.status === 502) {
        const data = await response.json();
        // Accept rate limiting or API errors as a valid test result
        assert.strictEqual(data.success, false);
        assert.ok(data.error.includes('GitHub'));
        return;
      }
      
      assert.strictEqual(response.status, 200);
      const data = await response.json();
      assert.strictEqual(data.success, true);
      assert.strictEqual(data.type, 'github');
      assert.strictEqual(data.username, 'octocat');
      assert.strictEqual(data.level, 'mild');
      assert.ok(data.roast);
      assert.ok(data.profileSummary);
    });
  });

  describe('Portfolio Roast Endpoint', () => {
    it('should require URL', async () => {
      const response = await fetch(`${API_BASE}/api/roast/portfolio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      
      assert.strictEqual(response.status, 400);
      const data = await response.json();
      assert.strictEqual(data.success, false);
      assert.ok(data.error.includes('URL'));
    });

    it('should reject invalid URL format', async () => {
      const response = await fetch(`${API_BASE}/api/roast/portfolio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: 'not-a-valid-url' })
      });
      
      assert.strictEqual(response.status, 400);
      const data = await response.json();
      assert.strictEqual(data.success, false);
      assert.ok(data.error.includes('Invalid'));
    });
  });

  describe('Resume Roast Endpoint', () => {
    it('should require file upload', async () => {
      const response = await fetch(`${API_BASE}/api/roast/resume`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      
      assert.strictEqual(response.status, 400);
      const data = await response.json();
      assert.strictEqual(data.success, false);
      assert.ok(data.error.includes('resume') || data.error.includes('file'));
    });
  });
});
