import {
  assertFargateMemoryCpuValidatorThrowsError,
  assertMemoryShouldBeValid,
} from "./helpers/cpu-memory-validator-helper";

/**
 * Test all cases in the Fargate memory and cpu validator so that if any changes are made
 * the tests will fail. These tests were written based on Fargate memory and CPU combinations
 * at the time of writing. See docs here -
 * https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html
 */

/* Test for all cased when the CPU units are 256 */
describe("CPU and Memory combination test", () => {
  afterAll(() => {
    console.log("Tests complete");
  });

  describe("When calling the FargateCPUMemoryValidator with CPU value of 256", () => {
    let cpu: number;
    beforeAll(() => {
      cpu = 256;
    });

    test("memory of 512mb should be valid", () => {
      assertMemoryShouldBeValid(512, cpu);
    });

    test("memory of 1024mb should be valid", () => {
      assertMemoryShouldBeValid(1024, cpu);
    });

    test("memory of 2048mb should be valid", () => {
      assertMemoryShouldBeValid(2048, cpu);
    });

    test("memory of 4096mb should be invalid and throw and error", () => {
      assertFargateMemoryCpuValidatorThrowsError(4096, cpu);
    });
  });

  /* Test for all cased when the CPU units are 512 */
  describe("When calling the FargateCPUMemoryValidator with CPU value of 512", () => {
    let cpu: number;
    beforeAll(() => {
      cpu = 512;
    });

    // cpu of 512 can have 1-4 GB of memory, test all options
    for (let i = 1; i <= 4; i++) {
      test(`memory of ${i * 1024}mb should be valid`, () => {
        assertMemoryShouldBeValid(i * 1024, cpu);
      });
    }

    test("memory of 5120mb should be invalid and throw and error", () => {
      assertFargateMemoryCpuValidatorThrowsError(5120, cpu);
    });
  });

  /* Test for all cased when the CPU units are 1024 */
  describe("When calling the FargateCPUMemoryValidator with CPU value of 1024", () => {
    let cpu: number;
    beforeAll(() => {
      cpu = 1024;
    });

    // cpu of 1024 can have 2-8 GB of memory, test all options
    for (let i = 2; i <= 8; i++) {
      test(`memory of ${i * 1024}mb should be valid`, () => {
        assertMemoryShouldBeValid(i * 1024, cpu);
      });
    }

    test("memory of 9216mb should be invalid and throw and error", () => {
      assertFargateMemoryCpuValidatorThrowsError(9216, cpu);
    });
  });

  /* Test for all cased when the CPU units are 2048 */
  describe("When calling the FargateCPUMemoryValidator with CPU value of 2048", () => {
    let cpu: number;
    beforeAll(() => {
      cpu = 2048;
    });

    // cpu of 2048 can have 4-16 GB of memory, test all options
    for (let i = 4; i <= 16; i++) {
      test(`memory of ${i * 1024}mb should be valid`, () => {
        assertMemoryShouldBeValid(i * 1024, cpu);
      });
    }

    test("memory of 17408mb should be invalid and throw and error", () => {
      assertFargateMemoryCpuValidatorThrowsError(17408, cpu);
    });
  });

  /* Test for all cased when the CPU units are 4096 */
  describe("When calling the FargateCPUMemoryValidator with CPU value of 4096", () => {
    let cpu: number;
    beforeAll(() => {
      cpu = 4096;
    });

    // cpu of 4096 can have 8-30 GB of memory, test all options
    for (let i = 8; i <= 30; i++) {
      test(`memory of ${i * 1024}mb should be valid`, () => {
        assertMemoryShouldBeValid(i * 1024, cpu);
      });
    }

    test("memory of 31744mb should be invalid and throw and error", () => {
      assertFargateMemoryCpuValidatorThrowsError(31744, cpu);
    });
  });
});
