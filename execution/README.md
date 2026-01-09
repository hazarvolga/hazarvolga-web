# Execution

This directory contains deterministic Python scripts.
These scripts serve as the "Execution" layer (Layer 3) of the agent architecture.

## Purpose
- Handle API calls, data processing, file operations, and database interactions.
- Provide reliable, testable, and fast execution tools.

## Usage
The orchestrating agent calls these scripts based on the instructions found in the `directives/` directory.
Scripts should be runnable from the root of the repository or this directory, and may rely on environment variables in `../.env`.
