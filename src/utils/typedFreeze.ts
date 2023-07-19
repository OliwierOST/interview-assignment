type Primitive = string | (() => string)

type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends Primitive ? T[K] : DeepReadonly<T[K]>
}

function typedFreeze(obj: any): DeepReadonly<typeof obj> {
  Object.freeze(obj)

  Object.getOwnPropertyNames(obj).forEach((prop) => {
    const value = obj[prop]
    if (
      value !== null &&
      typeof value === "object" &&
      !Object.isFrozen(value)
    ) {
      typedFreeze(value)
    }
  })

  return obj
}

export { typedFreeze }
