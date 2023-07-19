import { typedFreeze } from "../utils/typedFreeze"

interface TestIds1 {
  a: string
  b: {
    c: () => string
  }
}

interface TestIds2 {
  x: string
  y: TestIds1
}

describe("typedFreeze", () => {
  const testObject: TestIds2 = {
    x: "foo",
    y: {
      a: "bar",
      b: {
        c: () => "inner function",
      },
    },
  }

  const testArray = ["baz", testObject]

  const frozenObject = typedFreeze(testObject)

  const frozenArray = typedFreeze(testArray)

  it("works for non-nested objects", () => {
    expect(() => {
      // @ts-expect-error
      frozenObject.x = "bar"
    }).toThrow(TypeError)
  })

  it("works for nested objects", () => {
    expect(() => (frozenObject.y.a = "foo")).toThrow(TypeError)
    expect(() => (frozenObject.y.b.c = () => "new function")).toThrow(TypeError)
  })

  it("works for arrays", () => {
    // @ts-expect-error
    expect(() => (frozenArray[0] = "foo")).toThrow(TypeError)
    // @ts-expect-error
    expect(() => (frozenArray[1] = "bar").toThrow(TypeError))
  })
})
