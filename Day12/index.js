import { readFileSync } from "fs"
const lines = readFileSync("input.txt", "utf-8").replace(/\r/g, "").trim().split("\n")
const getInput = () => {
  const response = {
    start: {},
    end: {},
    map: [],
  }
  response.map = lines.map((line, y) =>
    [...line].map((value, x) => {
      if (value === "S") {
        response.start = {
          y,
          x,
        }
        return 0
      }
      if (value === "E") {
        response.end = { y, x }
        return 25
      }
      return value.charCodeAt(0) - "a".charCodeAt(0)
    })
  )

  return response
}
const pointToInt = (x, y) => {
  return y * 1e3 + x
}

const intToPoint = (int) => {
  return {
    y: Math.floor(int / 1e3),
    x: int % 1e3,
  }
}

const getNeighbors = (x, y, map) => {
  const res = []
  if (y + 1 < map.length && map[y + 1][x] <= map[y][x] + 1) {
    res.push(pointToInt(x, y + 1))
  }
  if (y - 1 >= 0 && map[y - 1][x] <= map[y][x] + 1) {
    res.push(pointToInt(x, y - 1))
  }
  if (x + 1 < map[y].length && map[y][x + 1] <= map[y][x] + 1) {
    res.push(pointToInt(x + 1, y))
  }
  if (x - 1 >= 0 && map[y][x - 1] <= map[y][x] + 1) {
    res.push(pointToInt(x - 1, y))
  }
  return res
}
const Dijkstra = (map, start, end) => {
  const dist = {}
  const prev = {}
  let queue = []
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const id = pointToInt(x, y)
      dist[id] = Infinity
      queue.push(id)
    }
  }
  dist[pointToInt(start.x, start.y)] = 0

  while (queue.length) {
    let u = null
    for (const current of queue) {
      if (u === null || dist[current] < dist[u]) {
        u = current
      }
    }
    if (u === pointToInt(end.x, end.y)) {
      break
    }
    queue = queue.filter((x) => x !== u)

    const point = intToPoint(u)
    const neighbors = getNeighbors(point.x, point.y, map)
    for (const v of neighbors) {
      if (queue.includes(v)) {
        const alt = dist[u] + 1
        if (alt < dist[v]) {
          dist[v] = alt
          prev[v] = u
        }
      }
    }
  }
  return {
    dist,
    prev,
  }
}

const part1 = () => {
  const input = getInput()
  const data = Dijkstra(input.map, input.start, input.end)
  const distance = data.dist[pointToInt(input.end.x, input.end.y)]
  console.log(distance)
}

const getNeighbors2 = (x, y, map) => {
  const res = []
  if (y + 1 < map.length && map[y + 1][x] >= map[y][x] - 1) {
    res.push(pointToInt(x, y + 1))
  }
  if (y - 1 >= 0 && map[y - 1][x] >= map[y][x] - 1) {
    res.push(pointToInt(x, y - 1))
  }
  if (x + 1 < map[y].length && map[y][x + 1] >= map[y][x] - 1) {
    res.push(pointToInt(x + 1, y))
  }
  if (x - 1 >= 0 && map[y][x - 1] >= map[y][x] - 1) {
    res.push(pointToInt(x - 1, y))
  }
  return res
}

const Dijkstra2 = (map, start, end) => {
  const dist = {}
  const prev = {}
  let queue = []
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const id = pointToInt(x, y)
      dist[id] = Infinity
      queue.push(id)
    }
  }
  dist[pointToInt(start.x, start.y)] = 0

  while (queue.length) {
    let u = null
    for (const current of queue) {
      if (u === null || dist[current] < dist[u]) {
        u = current
      }
    }

    const point = intToPoint(u)
    if (map[point.y][point.x] === 0) {
      return dist[u]
    }

    queue = queue.filter((x) => x !== u)

    const neighbors = getNeighbors2(point.x, point.y, map)
    for (const v of neighbors) {
      if (queue.includes(v)) {
        const alt = dist[u] + 1
        if (alt < dist[v]) {
          dist[v] = alt
          prev[v] = u
        }
      }
    }
  }
}

const part2 = () => {
  const input = getInput()
  const distance = Dijkstra2(input.map, input.end)
  console.log(distance)
}
//part1()

part2()
