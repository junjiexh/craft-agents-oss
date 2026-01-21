/**
 * Claude Code settings reader.
 *
 * Reads environment variables from ~/.claude/settings.json to integrate with
 * the Claude Agent SDK. This allows users to use their existing Claude Code
 * settings with Craft Agent.
 */

import { homedir } from 'os';
import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import { debug } from '../utils/debug';

/** Path to the user's Claude settings file */
const CLAUDE_SETTINGS_PATH = join(homedir(), '.claude', 'settings.json');

/**
 * Get environment variables from ~/.claude/settings.json.
 * Returns an empty object if no settings file exists or no env configured.
 */
export function getClaudeSettingsEnv(): Record<string, string> {
  try {
    if (!existsSync(CLAUDE_SETTINGS_PATH)) {
      return {};
    }

    const content = readFileSync(CLAUDE_SETTINGS_PATH, 'utf-8');
    const settings = JSON.parse(content);

    debug('[claude-settings] Loaded env from:', CLAUDE_SETTINGS_PATH);
    return settings?.env ?? {};
  } catch (error) {
    debug('[claude-settings] Error reading settings:', error);
    return {};
  }
}
