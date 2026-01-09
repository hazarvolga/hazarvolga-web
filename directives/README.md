# Directives

This directory contains Standard Operating Procedures (SOPs) written in Markdown.
These directives serve as the "Directive" layer (Layer 1) of the agent architecture.

## Purpose
- Define goals, inputs, tools, outputs, and edge cases.
- Provide natural language instructions for the orchestrating agent.

## Usage
The orchestrating agent reads these files to understand *what* to do before calling the deterministic scripts in the `execution/` directory.
