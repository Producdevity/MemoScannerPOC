import type {Point, Rect} from 'vision-camera-dynamsoft-document-normalizer'

function getRectFromPoints(points: Point[]): Rect {
  if (points[0]) {
    let left = points[0].x
    let top = points[0].y
    let right = 0
    let bottom = 0

    points.forEach(point => {
      left = Math.min(point.x, left)
      top = Math.min(point.y, top)
      right = Math.max(point.x, right)
      bottom = Math.max(point.y, bottom)
    })

    return {
      left,
      top,
      right,
      bottom,
      width: right - left,
      height: bottom - top,
    }
  } else {
    throw new Error('Invalid number of points')
  }
}

export default getRectFromPoints
