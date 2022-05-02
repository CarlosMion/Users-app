import { descendingComparator, getComparator } from '.';

describe('results page utils', () => {
  describe('descendingComparator', () => {
    it('returns negative result', async () => {
      const result = descendingComparator(
        { login: 'b' },
        { login: 'a' },
        'login'
      );
      expect(result).toEqual(-1);
    });

    it('returns positive result', async () => {
      const result = descendingComparator(
        { login: 'a' },
        { login: 'b' },
        'login'
      );
      expect(result).toEqual(1);
    });

    it('returns neutral result', async () => {
      const result = descendingComparator(
        { login: 'a' },
        { login: 'a' },
        'login'
      );
      expect(result).toEqual(0);
    });
  });
  describe('getComparator', () => {
    it('returns negative result for descending sorting with bigger key value first', async () => {
      const result = getComparator('desc', 'login');
      expect(result({ login: 'b' }, { login: 'a' })).toEqual(-1);
    });

    it('returns positive result for descending sorting with bigger key value first', async () => {
      const result = getComparator('asc', 'login');
      expect(result({ login: 'b' }, { login: 'a' })).toEqual(1);
    });

    it('returns negative result for descending sorting with smaller key value first', async () => {
      const result = getComparator('desc', 'login');
      expect(result({ login: 'a' }, { login: 'b' })).toEqual(1);
    });

    it('returns positive result for descending sorting with smaller key value first', async () => {
      const result = getComparator('asc', 'login');
      expect(result({ login: 'a' }, { login: 'b' })).toEqual(-1);
    });
  });
});
