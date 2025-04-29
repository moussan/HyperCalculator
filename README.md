# Advanced Scientific Calculator

A modern web-based scientific calculator capable of performing integration and differentiation operations.

## Features

- Differentiation of mathematical expressions
- Integration of mathematical expressions
- Clean and intuitive user interface
- Real-time calculation
- Error handling for invalid expressions

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser

## Usage

1. Select the operation (Differentiate or Integrate)
2. Enter your mathematical expression (e.g., "x^2 + 2x + 1")
3. Specify the variable (default is 'x')
4. Click "Calculate" to see the result

### Examples

- Differentiation:
  - Expression: x^2 + 2x + 1
  - Result: 2x + 2

- Integration:
  - Expression: 2x + 2
  - Result: x^2 + 2x + C

## Built With

- React - JavaScript library for building user interfaces
- Material-UI - React UI framework
- Math.js - Extensive math library for JavaScript
- TypeScript - Typed superset of JavaScript

## License

This project is licensed under the MIT License. 