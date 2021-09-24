function areNotesEqual(a, b) {
  if (!(Array.isArray(a) && Array.isArray(b))) return false

  return a.flat(Infinity).join('') === b.flat(Infinity).join('')
}

export default areNotesEqual
