import type {Point} from 'vision-camera-dynamsoft-document-normalizer'
import getRectFromPoints from './getRectFromPoints'
import rectIntersectionOverUnion from './rectIntersectionOverUnion'

function intersectionOverUnion(pts1: Point[], pts2: Point[]): number {
  let rect1 = getRectFromPoints(pts1)
  let rect2 = getRectFromPoints(pts2)
  return rectIntersectionOverUnion(rect1, rect2)
}

export default intersectionOverUnion
