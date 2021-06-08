const priorities = {
  'Minimum': 0,
  'Ideal': 1,
  'Extreme': 2,
  'Special Case': 3
}

export default (a, b) => priorities[a] - priorities[b]