/**
 * 전화번호 자동 하이픈 포맷팅
 * @param value - 입력된 전화번호 문자열
 * @returns 포맷팅된 전화번호 (000-0000-0000)
 */
export function formatPhoneNumber(value: string): string {
  const numbers = value.replace(/[^\d]/g, "");

  const truncated = numbers.slice(0, 11);

  if (truncated.length <= 3) {
    return truncated;
  } else if (truncated.length <= 7) {
    return `${truncated.slice(0, 3)}-${truncated.slice(3)}`;
  } else {
    return `${truncated.slice(0, 3)}-${truncated.slice(3, 7)}-${truncated.slice(
      7
    )}`;
  }
}

/**
 * 전화번호 숫자만 추출
 * @param value - 전화번호 문자열
 * @returns 숫자만 추출된 문자열
 */
export function extractPhoneNumbers(value: string): string {
  return value.replace(/[^\d]/g, "");
}
/**
 * 전화번호 유효성 검사
 * @param value - 전화번호 문자열
 * @returns 유효 여부
 */
export function isValidPhoneNumber(value: string): boolean {
  const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
  return phoneRegex.test(value);
}
