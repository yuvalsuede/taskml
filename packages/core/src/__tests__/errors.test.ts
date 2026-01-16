import { describe, it, expect } from 'bun:test';
import {
  ErrorCode,
  ErrorSeverity,
  ERROR_MESSAGES,
  ERROR_SUGGESTIONS,
  createError,
  formatError,
} from '../errors';

describe('Error Types', () => {
  describe('ErrorCode', () => {
    it('should have lexer error codes (E1xx)', () => {
      expect(ErrorCode.E100_UNEXPECTED_CHARACTER).toBe('E100');
      expect(ErrorCode.E101_INCONSISTENT_INDENTATION).toBe('E101');
      expect(ErrorCode.E104_INVALID_DATE_FORMAT).toBe('E104');
    });

    it('should have parser error codes (E2xx)', () => {
      expect(ErrorCode.E200_EXPECTED_STATUS).toBe('E200');
      expect(ErrorCode.E204_UNEXPECTED_TOKEN).toBe('E204');
      expect(ErrorCode.E209_DUPLICATE_TASK_ID).toBe('E209');
    });

    it('should have semantic error codes (E3xx)', () => {
      expect(ErrorCode.E300_UNKNOWN_DIRECTIVE).toBe('E300');
      expect(ErrorCode.E304_CIRCULAR_DEPENDENCY).toBe('E304');
      expect(ErrorCode.E305_TOKEN_ORDER_VIOLATION).toBe('E305');
    });

    it('should have interchange error codes (E4xx)', () => {
      expect(ErrorCode.E400_INVALID_JSON).toBe('E400');
      expect(ErrorCode.E401_INVALID_YAML).toBe('E401');
    });

    it('should have renderer error codes (E5xx)', () => {
      expect(ErrorCode.E500_UNKNOWN_VIEW).toBe('E500');
      expect(ErrorCode.E501_MISSING_RENDER_OPTION).toBe('E501');
    });
  });

  describe('ERROR_MESSAGES', () => {
    it('should have a message for each error code', () => {
      const codes = Object.values(ErrorCode);
      for (const code of codes) {
        expect(ERROR_MESSAGES[code]).toBeDefined();
        expect(typeof ERROR_MESSAGES[code]).toBe('string');
      }
    });

    it('should have placeholder support in messages', () => {
      expect(ERROR_MESSAGES[ErrorCode.E100_UNEXPECTED_CHARACTER]).toContain('{0}');
      expect(ERROR_MESSAGES[ErrorCode.E209_DUPLICATE_TASK_ID]).toContain('{0}');
    });
  });

  describe('ERROR_SUGGESTIONS', () => {
    it('should have suggestions for common errors', () => {
      expect(ERROR_SUGGESTIONS[ErrorCode.E101_INCONSISTENT_INDENTATION]).toBeDefined();
      expect(ERROR_SUGGESTIONS[ErrorCode.E104_INVALID_DATE_FORMAT]).toBeDefined();
      expect(ERROR_SUGGESTIONS[ErrorCode.E106_INVALID_PRIORITY]).toBeDefined();
    });

    it('should provide actionable suggestions', () => {
      const suggestion = ERROR_SUGGESTIONS[ErrorCode.E104_INVALID_DATE_FORMAT];
      expect(suggestion).toContain('YYYY-MM-DD');
    });
  });

  describe('createError', () => {
    it('should create error with basic fields', () => {
      const error = createError(ErrorCode.E200_EXPECTED_STATUS, 5, 1);
      expect(error.code).toBe(ErrorCode.E200_EXPECTED_STATUS);
      expect(error.line).toBe(5);
      expect(error.column).toBe(1);
      expect(error.severity).toBe(ErrorSeverity.ERROR);
    });

    it('should format message with arguments', () => {
      const error = createError(
        ErrorCode.E100_UNEXPECTED_CHARACTER,
        1,
        5,
        ['$']
      );
      expect(error.message).toContain('$');
      expect(error.message).not.toContain('{0}');
    });

    it('should auto-include suggestion when available', () => {
      const error = createError(ErrorCode.E104_INVALID_DATE_FORMAT, 1, 1, ['2026/01/15']);
      expect(error.suggestion).toBeDefined();
      expect(error.suggestion).toContain('YYYY-MM-DD');
    });

    it('should allow custom suggestion override', () => {
      const customSuggestion = 'Try using a different format';
      const error = createError(
        ErrorCode.E104_INVALID_DATE_FORMAT,
        1,
        1,
        ['2026/01/15'],
        { suggestion: customSuggestion }
      );
      expect(error.suggestion).toBe(customSuggestion);
    });

    it('should support custom severity', () => {
      const error = createError(
        ErrorCode.E305_TOKEN_ORDER_VIOLATION,
        1,
        1,
        [],
        { severity: ErrorSeverity.WARNING }
      );
      expect(error.severity).toBe(ErrorSeverity.WARNING);
    });

    it('should support length field', () => {
      const error = createError(
        ErrorCode.E100_UNEXPECTED_CHARACTER,
        1,
        5,
        ['$'],
        { length: 3 }
      );
      expect(error.length).toBe(3);
    });
  });

  describe('formatError', () => {
    it('should format error for display', () => {
      const error = createError(ErrorCode.E200_EXPECTED_STATUS, 5, 1);
      const formatted = formatError(error);
      expect(formatted).toContain('error[E200]');
      expect(formatted).toContain('5:1');
    });

    it('should include suggestion in output', () => {
      const error = createError(ErrorCode.E104_INVALID_DATE_FORMAT, 1, 1, ['bad']);
      const formatted = formatError(error);
      expect(formatted).toContain('suggestion:');
    });

    it('should format warning differently from error', () => {
      const error = createError(
        ErrorCode.E305_TOKEN_ORDER_VIOLATION,
        1,
        1,
        [],
        { severity: ErrorSeverity.WARNING }
      );
      const formatted = formatError(error);
      expect(formatted).toContain('warning[E305]');
    });

    it('should show source context when provided', () => {
      const error = createError(ErrorCode.E100_UNEXPECTED_CHARACTER, 1, 5, ['$']);
      const source = '[ ] $invalid task';
      const formatted = formatError(error, source);
      expect(formatted).toContain('[ ] $invalid task');
      expect(formatted).toContain('~');
    });
  });

  describe('ErrorSeverity', () => {
    it('should have correct severity levels', () => {
      expect(ErrorSeverity.ERROR).toBe('error');
      expect(ErrorSeverity.WARNING).toBe('warning');
      expect(ErrorSeverity.INFO).toBe('info');
    });
  });
});
