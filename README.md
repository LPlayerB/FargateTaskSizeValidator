# FargateTaskSizeValidator

Validates CPU units and Memory for a fargate task, it makes sure the combination is supported by AWS.

## Install

```bash
npm install fargatetasksizevalidator
```

## Usage

Simply import the package and call the validateFargateCPUAndMemoryCombination function specifying CPU units and memory. `true` is returned if valid or an error is thrown if the combination is invalid.

```javascript
import { validateFargateCPUAndMemoryCombination } from 'fargatetasksizevalidator';

validateFargateCPUAndMemoryCombination(cpuUnits, memory);
```
