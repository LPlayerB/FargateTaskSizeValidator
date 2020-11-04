/**
 * Object that enables a minimum and maximum memory to
 * be set for a specific CPU value
 */
class FargateCPU {
  /**
   * Constructor for FargateCPU
   * @param cpuValue Number of CPU units
   * @param minimumMemoryInGB Minimum memory for a Fargate task definition based on CPU
   * @param maximumMemoryInGB Maximum memory for a Fargate task definition based on CPU
   */
  constructor(public cpuValue: number, public minimumMemoryInGB: number, public maximumMemoryInGB: number) {}
}

/* Create a FargateCpu object with max and min memory for 256 CPU units */
const QUARTER_CPU = new FargateCPU(256, 1, 2);

/* Create a FargateCpu object with max and min memory for 512 CPU units */
const HALF_CPU = new FargateCPU(512, 1, 4);

/* Create a FargateCpu object with max and min memory for 1024 CPU units */
const ONE_CPU = new FargateCPU(1024, 2, 8);

/* Create a FargateCpu object with max and min memory for 2048 CPU units */
const TWO_CPU = new FargateCPU(2048, 4, 16);

/* Create a FargateCpu object with max and min memory for 4096 CPU units */
const FOUR_CPU = new FargateCPU(4096, 8, 30);

/**
 * Creates an array of acceptable memory based on the number of
 * CPU units, max and min memory
 * @param minMemory minimum amount of memory allowed in GB
 * @param maxMemory maximum amount of memory allowed in GB
 */
function getAllowedMemory(minMemory: number, maxMemory: number) {
  return [...Array(maxMemory - minMemory + 1).keys()].map((i) => (i + minMemory) * 1024);
}

/**
 * Validates the memory CPU combination, compares them to predefined combinations.
 * @param cpu in cpu units (mb)
 * @param memory in mb
 * @throws Error if combination is not valid
 */
export function validateFargateCPUAndMemoryCombination(cpu: number, memory: number) {
  let isValid = true;
  let allowedMemory: number[] = [];

  switch (true) {
    case cpu === QUARTER_CPU.cpuValue: {
      allowedMemory = getAllowedMemory(QUARTER_CPU.minimumMemoryInGB, QUARTER_CPU.maximumMemoryInGB);
      allowedMemory.push(512);
      break;
    }
    case cpu === HALF_CPU.cpuValue: {
      allowedMemory = getAllowedMemory(HALF_CPU.minimumMemoryInGB, HALF_CPU.maximumMemoryInGB);
      break;
    }
    case cpu === ONE_CPU.cpuValue: {
      allowedMemory = getAllowedMemory(ONE_CPU.minimumMemoryInGB, ONE_CPU.maximumMemoryInGB);
      break;
    }
    case cpu === TWO_CPU.cpuValue: {
      allowedMemory = getAllowedMemory(TWO_CPU.minimumMemoryInGB, TWO_CPU.maximumMemoryInGB);
      break;
    }
    case cpu === FOUR_CPU.cpuValue: {
      allowedMemory = getAllowedMemory(FOUR_CPU.minimumMemoryInGB, FOUR_CPU.maximumMemoryInGB);
      break;
    }
    default: {
      break;
    }
  }

  if (!allowedMemory.includes(memory)) {
    isValid = false;
    throw Error('CPU and Memory combination is not valid. Memory: ' + memory + ' CPU: ' + cpu);
  }

  return isValid;
}
