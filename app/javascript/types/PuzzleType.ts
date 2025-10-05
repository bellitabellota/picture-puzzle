export type PuzzleType = {
  "id": number,
  "title": string,
  "image_src": string,
  "task_description": string,
  "resolution_width":number,
  "resolution_height": number,
  "targets": TargetNameObject[],
  "created_at": string,
  "updated_at": string,
  "imageSrc": string,
  "taskDescription": string
}

type TargetNameObject = {
    name: string
}