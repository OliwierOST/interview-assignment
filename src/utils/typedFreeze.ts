type StringFunction = () => string

type ReturnTypeString<T extends (...args: any[]) => any> =
  ReturnType<T> extends string ? T : never

type ConstrainedPrimitive = string | ReturnTypeString<StringFunction>

type DeepReadonlyConstrained<T> = {
  readonly [K in keyof T]: T[K] extends ConstrainedPrimitive
    ? T[K]
    : T[K] extends object
    ? Exclude<T[K], {}> extends never
      ? never
      : DeepReadonlyConstrained<T[K]>
    : never
}

function typedFreeze(obj: any): DeepReadonlyConstrained<any> {
  for (const prop in obj) {
    const value = obj[prop]
    if (
      typeof value !== "string" &&
      (typeof value !== "function" ||
        typeof (value as Function)() !== "string") &&
      (typeof value !== "object" || Object.keys(value).length === 0)
    ) {
      throw new TypeError(
        `Invalid leaf property '${prop}'. Expected 'string' or '() => string', and non-empty object.`
      )
    }
  }

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

  return obj as DeepReadonlyConstrained<any>
}

export { typedFreeze }
