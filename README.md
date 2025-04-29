# HyperCalculator

An advanced scientific calculator built with React and TypeScript, featuring powerful mathematical capabilities powered by mathjs.

## Features

- **Basic Operations**: Standard arithmetic operations with a clean, modern interface
- **Advanced Mathematics**:
  - Matrix Operations (addition, subtraction, multiplication)
  - Complex Number Calculations
  - Taylor Series Expansion
  - Fourier Series Analysis
  - Laurent Series Computation

## Mathematical Functions

### Matrix Operations
- Matrix Addition
- Matrix Subtraction
- Matrix Multiplication
- Dimension validation and error handling

### Complex Number Operations
- Addition and Subtraction
- Multiplication and Division
- Conjugate calculation
- Magnitude computation
- Phase angle determination

### Series Expansions
- **Taylor Series**: Compute Taylor series expansions around any point
- **Fourier Series**: Calculate Fourier series coefficients and expansions
- **Laurent Series**: Generate Laurent series expansions for complex analysis

## Technology Stack

- React 18
- TypeScript 4.9
- Material-UI (MUI) for modern UI components
- Math.js for advanced mathematical computations
- Jest for testing
- ESLint and Prettier for code quality

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd hyper-calculator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`.

### Running Tests

```bash
npm test
```

### Code Quality

- Run linting:
  ```bash
  npm run lint
  ```

- Format code:
  ```bash
  npm run format
  ```

## Usage Examples

### Matrix Operations
```typescript
// Example matrix operations
const matrixA = [[1, 2], [3, 4]];
const matrixB = [[5, 6], [7, 8]];
const result = performMatrixOp(matrixA, matrixB, 'multiply');
```

### Complex Numbers
```typescript
// Complex number operations
const result = performComplexOp(2, 3, 'multiply', 1, 1);  // (2+3i) * (1+i)
```

### Series Expansions
```typescript
// Taylor series expansion
const series = taylorSeries('sin(x)', 'x', 5, 0);  // Around x=0, 5 terms

// Fourier series
const fourier = fourierSeries('x^2', 'x', 3, 2*Math.PI);  // 3 terms

// Laurent series
const laurent = laurentSeries('1/(z-1)', 'z', 3, 0);  // Around z=0
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Math.js library for providing robust mathematical operations
- Material-UI team for the beautiful component library
- React and TypeScript communities for excellent documentation and support 