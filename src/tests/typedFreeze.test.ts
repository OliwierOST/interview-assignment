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
})
