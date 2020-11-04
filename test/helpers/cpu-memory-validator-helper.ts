import { validateFargateCPUAndMemoryCombination } from "../../src/cpu-memory-validator";

/**
 * Helper function that asserts the CPU and memory
 * provided is a valid combination
 * @param memory in mb to be tested
 * @param cpu in cpu units (mb) to be tested
 */
export function assertMemoryShouldBeValid(memory: number, cpu: number) {
  expect(() => {
    let valid = validateFargateCPUAndMemoryCombination(cpu, memory);
    expect(valid).toEqual(true);
  }).not.toThrowError();
}

/**
 * Helper function that asserts an error is thown when
 * the CPU and memory provided is not a valid combination
 * @param memory in mb to be tested
 * @param cpu in cpu units (mb) to be tested
 */
export function assertFargateMemoryCpuValidatorThrowsError(memory: number, cpu: number) {
  expect(() => {
    validateFargateCPUAndMemoryCombination(cpu, memory);
  }).toThrowError(`CPU and Memory combination is not valid. Memory: ${memory} CPU: ${cpu}`);
}
