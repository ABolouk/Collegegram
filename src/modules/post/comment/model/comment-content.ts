import { Brand } from "../../../../utility/brand";
import z from 'zod'

export type Content = Brand<string, "Content">


export module Content {
  export const is = (value: string): value is Content =>
    typeof value === 'string'  
  export const zod = z.string ().nonempty().max(255).refine(is)
}
