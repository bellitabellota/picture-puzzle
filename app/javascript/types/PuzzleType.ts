import type {TargetNameObjectType} from "./TargetNameObjectType"

export type PuzzleType = {
  "id": number,
  "title": string,
  "imageSrc": string,
  "taskDescription": string,
  "resolutionWidth":number,
  "resolutionHeight": number,
  "targets": TargetNameObjectType[],
  "createdAt": string,
  "updatedAt": string,
}