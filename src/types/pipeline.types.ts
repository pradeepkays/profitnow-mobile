export interface RespPipeline {
  status: string
  title: string
  stages: Stage[]
}

export interface Stage {
  stage: string
  title: string
}
