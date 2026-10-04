const data = {
  categories: [
    {
      id: 'basics',
      title: 'Basics',
      lessons: [
        {
          id: 'arithmetic-expression',
          title: 'Arithmetic Expressions',
          snippet: 'arithmetic-expression',
        },
        {
          id: 'user-input',
          title: 'User Input',
          snippet: 'user-input',
          requiresHtml: true,
        },
        {
          id: 'type-conversions',
          title: 'Type Conversions',
          snippet: 'type-conversions',
        },
        {
          id: 'const',
          title: 'Const',
          snippet: 'const',
        },
        {
          id: 'math-methods',
          title: 'Math Methods',
          snippet: 'math-methods',
        },
        {
          id: 'string-methods',
          title: 'String Methods',
          snippet: 'string-methods',
        },
        {
          id: 'string-slicing',
          title: 'String Slicing',
          snippet: 'string-slicing',
        },
        {
          id: 'method-chaining',
          title: 'Method Chaining',
          snippet: 'method-chaining',
        },
      ],
    },
    {
      id: 'control-flow',
      title: 'Control Flow',
      lessons: [
        {
          id: 'if-statements',
          title: 'If Statements',
          snippet: 'if-statements',
        },
        {
          id: 'switches',
          title: 'Switches',
          snippet: 'switches',
        },
        {
          id: 'strict-equality',
          title: 'Strict Equality',
          snippet: 'strict-equality',
        },
        {
          id: 'logical-operators',
          title: '&& AND || OR',
          snippet: 'logical-operators',
        },
        {
          id: 'not-operator',
          title: 'NOT Operator',
          snippet: 'not-operator',
        },
        {
          id: 'while-loops',
          title: 'While Loops',
          snippet: 'while-loops',
        },
        {
          id: 'for-loops',
          title: 'For Loops',
          snippet: 'for-loops',
        },
        {
          id: 'break-continue',
          title: 'Break & Continue',
          snippet: 'break-continue',
        },
        {
          id: 'nested-loops',
          title: 'Nested Loops',
          snippet: 'nested-loops',
          requiresHtml: true,
        },
      ],
    },
    {
      id: 'functions',
      title: 'Functions',
      lessons: [
        {
          id: 'functions',
          title: 'Functions',
          snippet: 'functions',
        },
        {
          id: 'return-statements',
          title: 'Return Statements',
          snippet: 'return-statements',
        },
        {
          id: 'ternary-operators',
          title: 'Ternary Operators',
          snippet: 'ternary-operators',
        },
        {
          id: 'template-literals',
          title: 'Template Literals',
          snippet: 'template-literals',
          requiresHtml: true,
        },
        {
          id: 'callbacks',
          title: 'Callbacks',
          snippet: 'callbacks',
          requiresHtml: true,
        },
        {
          id: 'function-expressions',
          title: 'Function Expressions',
          snippet: 'function-expressions',
        },
        {
          id: 'arrow-functions',
          title: 'Arrow Functions',
          snippet: 'arrow-functions',
        },
        {
          id: 'nested-functions',
          title: 'Nested Functions',
          snippet: 'nested-functions',
        },
      ],
    },
    {
      id: 'arrays',
      title: 'Arrays',
      lessons: [
        {
          id: 'arrays',
          title: 'Arrays',
          snippet: 'arrays',
        },
        {
          id: 'loop-through-arrays',
          title: 'Loop Through Arrays',
          snippet: 'loop-through-arrays',
        },
        {
          id: 'sort-strings',
          title: 'Sort an Array of Strings',
          snippet: 'sort-strings',
        },
        {
          id: '2d-arrays',
          title: '2D Arrays',
          snippet: '2d-arrays',
        },
        {
          id: 'spread-operator',
          title: 'Spread Operator',
          snippet: 'spread-operator',
        },
        {
          id: 'array-foreach',
          title: 'Array.forEach()',
          snippet: 'array-foreach',
        },
        {
          id: 'array-map',
          title: 'Array.map()',
          snippet: 'array-map',
        },
        {
          id: 'array-filter',
          title: 'Array.filter()',
          snippet: 'array-filter',
        },
        {
          id: 'array-reduce',
          title: 'Array.reduce()',
          snippet: 'array-reduce',
        },
        {
          id: 'sort-numbers',
          title: 'Sort an Array of Numbers',
          snippet: 'sort-numbers',
        },
        {
          id: 'shuffle-array',
          title: 'Shuffle an Array',
          snippet: 'shuffle-array',
        },
      ],
    },
    {
      id: 'objects-classes',
      title: 'Objects & Classes',
      lessons: [
        {
          id: 'maps',
          title: 'Maps',
          snippet: 'maps',
        },
        {
          id: 'objects',
          title: 'Objects',
          snippet: 'objects',
        },
        {
          id: 'this-keyword',
          title: 'this Keyword',
          snippet: 'this-keyword',
        },
        {
          id: 'classes',
          title: 'Classes',
          snippet: 'classes',
        },
        {
          id: 'constructors',
          title: 'Constructors',
          snippet: 'constructors',
        },
        {
          id: 'inheritance',
          title: 'Inheritance',
          snippet: 'inheritance',
        },
        {
          id: 'objects-as-arguments',
          title: 'Objects as Arguments',
          snippet: 'objects-as-arguments',
        },
        {
          id: 'array-of-objects',
          title: 'Array of Objects',
          snippet: 'array-of-objects',
        },
        {
          id: 'anonymous-objects',
          title: 'Anonymous Objects',
          snippet: 'anonymous-objects',
        },
      ],
    },
    {
      id: 'asynchronous',
      title: 'Asynchronous JavaScript',
      lessons: [
        {
          id: 'settimeout',
          title: 'setTimeout()',
          snippet: 'settimeout',
        },
        {
          id: 'setinterval',
          title: 'setInterval()',
          snippet: 'setinterval',
        },
        {
          id: 'clock',
          title: 'Clock Program',
          snippet: 'clock',
          requiresHtml: true,
        },
        {
          id: 'asynchronous',
          title: 'Asynchronous Code',
          snippet: 'asynchronous',
        },
        {
          id: 'promises',
          title: 'Promises',
          snippet: 'promises',
        },
      ],
    },
    {
      id: 'dom',
      title: 'DOM',
      lessons: [
        {
          id: 'dom-intro',
          title: 'DOM Introduction',
          snippet: 'dom-intro',
        },
        {
          id: 'dom-traversal',
          title: 'DOM Traversal',
          snippet: 'dom-traversal',
        },
        {
          id: 'events',
          title: 'Events',
          snippet: 'events',
          requiresHtml: true,
        },
        {
          id: 'add-event-listener',
          title: 'addEventListener()',
          snippet: 'add-event-listener',
          requiresHtml: true,
        },
        {
          id: 'key-presses',
          title: 'Detect Key Presses',
          snippet: 'key-presses',
          requiresHtml: true,
        },
        {
          id: 'cookies',
          title: 'JavaScript Cookies',
          snippet: 'cookies',
        },
      ],
    },
    {
      id: 'projects',
      title: 'Projects',
      lessons: [
        {
          id: 'stopwatch',
          title: 'Stopwatch',
          snippet: 'stopwatch',
        },
        {
          id: 'rock-paper-scissors',
          title: 'Rock Paper Scissors',
          snippet: 'rock-paper-scissors',
          requiresHtml: true,
        },
      ],
    },
  ],
}
