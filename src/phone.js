export const defaultContactPhone = "(540) 667-6300"

export function toTelHref(phone = defaultContactPhone) {
  const digits = String(phone).replace(/[^\d+]/g, "")
  const normalized = digits.startsWith("+") ? digits : `+1${digits}`

  return `tel:${normalized}`
}
