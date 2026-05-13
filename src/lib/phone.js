export function formatBulgarianPhoneForMessaging(phone) {
  const digits = phone?.replace(/\D/g, "") || "";

  if (!digits) {
    return "";
  }

  return `359${digits.replace(/^0/, "")}`;
}