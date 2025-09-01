# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Chrome extension called "Conversor de Horários SIGAA" that converts SIGAA (Brazilian academic system) schedule formats into more readable formats. It processes schedule patterns like "3M12" into human-readable times like "TER 08:00-09:50".

## Architecture

The extension consists of:
- **manifest.json**: Chrome extension manifest with permissions for SIGAA domains
- **popup.html/popup.js**: Extension popup UI with convert/reset buttons  
- **converter.js**: Core conversion logic with schedule processing functions
- **images/**: Extension icons (16px, 48px, 128px)

### Key Components

**converter.js** contains the main conversion logic:
- `WEEKDAY_MAP`: Maps numeric weekdays (1-7) to Portuguese abbreviations (DOM, SEG-SAB)
- `SCHEDULE_MAP`: Maps period codes to official SIGAA times:
  - Manhã (M1-M5): 07:00-07:50 through 11:00-11:50
  - Tarde (T1-T6): 12:00-12:50 through 17:00-17:50  
  - Noite (N1-N6): 18:00-18:50 through 22:10-23:00
- `SCHEDULE_PATTERN`: Regex pattern `/\b([1-7]{1,7})([MTN])([1-6]{1,6})\b/gm` for matching schedules
- `translateSchedule()`: Converts matched patterns to readable format
- `processSchedules()`: Uses TreeWalker to find and replace schedule text in DOM
- `adjustPageLayout()`: Modifies column widths on specific SIGAA pages

**popup.js** handles the extension interface:
- Validates that current tab is on a SIGAA domain
- Injects and executes converter.js on the active tab
- Provides user feedback via status messages

## Development

### Testing the Extension

1. Load the extension in Chrome via chrome://extensions/ (Developer mode)
2. Navigate to a SIGAA page with schedule data
3. Click the extension icon and use "Converter Horários" button

### Code Patterns

The extension uses vanilla JavaScript and Chrome Extensions Manifest V3 APIs:
- `chrome.scripting.executeScript()` for content script injection
- `chrome.tabs.query()` for active tab detection
- DOM TreeWalker for efficient text node traversal
- Regex-based pattern matching and replacement

### URL Patterns Supported

The extension works on SIGAA domains matching `*://*.sigaa.*/sigaa/*` and handles specific page layouts for:
- graduacao/matricula/turmas_curriculo.jsf
- graduacao/matricula/turmas_equivalentes_curriculo.jsf  
- graduacao/matricula/turmas_extra_curriculo.jsf
- portais/discente/discente.jsf
- portais/discente/turmas.jsf
- public/turmas/listar.jsf