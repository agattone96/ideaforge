# Debug Audit Report
**Date**: Tue Jul  1 11:03:18 EDT 2025

## ESLint Issues


> ideaforge-ascension@1.0.0 lint
> eslint . --report-unused-disable-directives --max-warnings 0


/Users/allisongattone/Documents/GitHub/ideaforge/__mocks__/fileMock.js
  0:0  error  Parsing error: ESLint was configured to run on `<tsconfigRootDir>/__mocks__/fileMock.js` using `parserOptions.project`: <tsconfigRootDir>/tsconfig.json
However, that TSConfig does not include this file. Either:
- Change ESLint's list of included files to not include this file
- Change that TSConfig to include this file
- Create a new TSConfig that includes this file and include it in your parserOptions.project
See the typescript-eslint docs for more info: https://typescript-eslint.io/troubleshooting/typed-linting#i-get-errors-telling-me-eslint-was-configured-to-run--however-that-tsconfig-does-not--none-of-those-tsconfigs-include-this-file

/Users/allisongattone/Documents/GitHub/ideaforge/scripts/cleanup-unused.ts
  0:0  error  Parsing error: ESLint was configured to run on `<tsconfigRootDir>/scripts/cleanup-unused.ts` using `parserOptions.project`: <tsconfigRootDir>/tsconfig.json
However, that TSConfig does not include this file. Either:
- Change ESLint's list of included files to not include this file
- Change that TSConfig to include this file
- Create a new TSConfig that includes this file and include it in your parserOptions.project
See the typescript-eslint docs for more info: https://typescript-eslint.io/troubleshooting/typed-linting#i-get-errors-telling-me-eslint-was-configured-to-run--however-that-tsconfig-does-not--none-of-those-tsconfigs-include-this-file

/Users/allisongattone/Documents/GitHub/ideaforge/scripts/performance-stress-test.ts
  0:0  error  Parsing error: ESLint was configured to run on `<tsconfigRootDir>/scripts/performance-stress-test.ts` using `parserOptions.project`: <tsconfigRootDir>/tsconfig.json
However, that TSConfig does not include this file. Either:
- Change ESLint's list of included files to not include this file
- Change that TSConfig to include this file
- Create a new TSConfig that includes this file and include it in your parserOptions.project
See the typescript-eslint docs for more info: https://typescript-eslint.io/troubleshooting/typed-linting#i-get-errors-telling-me-eslint-was-configured-to-run--however-that-tsconfig-does-not--none-of-those-tsconfigs-include-this-file

/Users/allisongattone/Documents/GitHub/ideaforge/setupTests.ts
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-cycle
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-duplicates
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-unresolved
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-extraneous-dependencies
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-self-import
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-relative-packages
   1:1   error    File has too many classes (2). Maximum allowed is 1                  max-classes-per-file
   1:8   error    Unable to resolve path to module '@testing-library/jest-dom'         import/no-unresolved
  55:31  error    Unary operator '++' used                                             no-plusplus
  73:34  error    'options' is defined but never used                                  @typescript-eslint/no-unused-vars
  73:44  error    Unexpected any. Specify a different type                             @typescript-eslint/no-explicit-any
  74:9   error    Unexpected dangling '_' in '_shouldThrow'                            no-underscore-dangle
  74:18  error    Unexpected any. Specify a different type                             @typescript-eslint/no-explicit-any
  81:5   error    Unexpected dangling '_' in '_shouldThrow'                            no-underscore-dangle
  81:14  error    Unexpected any. Specify a different type                             @typescript-eslint/no-explicit-any

/Users/allisongattone/Documents/GitHub/ideaforge/src/App.test.tsx
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-cycle
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/namespace
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-duplicates
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-unresolved
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/default
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-extraneous-dependencies
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/order
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-self-import
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-relative-packages
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-named-as-default
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-named-as-default-member
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/extensions
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-useless-path-segments
   1:8   error    'React' is defined but never used                                    @typescript-eslint/no-unused-vars
   1:34  error    Unable to resolve path to module 'react'                             import/no-unresolved
   2:37  error    Unable to resolve path to module '@testing-library/react'            import/no-unresolved
   3:8   error    Unable to resolve path to module '@testing-library/jest-dom'         import/no-unresolved
   4:69  error    Unable to resolve path to module '@jest/globals'                     import/no-unresolved
   5:17  error    Missing file extension for "./App"                                   import/extensions
   5:17  error    Unable to resolve path to module './App'                             import/no-unresolved
   6:27  error    Missing file extension for "./components/ErrorBoundary"              import/extensions
   6:27  error    Unable to resolve path to module './components/ErrorBoundary'        import/no-unresolved
  12:5   warning  Unexpected unnamed function                                          func-names
  12:5   error    Component definition is missing display name                         react/display-name
  19:5   warning  Unexpected unnamed function                                          func-names
  19:5   error    Component definition is missing display name                         react/display-name
  41:38  error    Return values from promise executor functions cannot be read         no-promise-executor-return
  51:38  error    Return values from promise executor functions cannot be read         no-promise-executor-return
  61:38  error    Return values from promise executor functions cannot be read         no-promise-executor-return
  74:38  error    Return values from promise executor functions cannot be read         no-promise-executor-return

/Users/allisongattone/Documents/GitHub/ideaforge/src/App.tsx
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-cycle
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/namespace
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-duplicates
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-unresolved
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/default
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-extraneous-dependencies
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/order
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-self-import
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-relative-packages
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-named-as-default
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-named-as-default-member
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/extensions
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-useless-path-segments
   1:73  error    Unable to resolve path to module 'react'                             import/no-unresolved
   2:33  error    Unable to resolve path to module 'framer-motion'                     import/no-unresolved
   3:54  error    Missing file extension for "@/hooks/useUndoRedo"                     import/extensions
   3:54  error    Unable to resolve path to module '@/hooks/useUndoRedo'               import/no-unresolved
   4:39  error    Missing file extension for "@/components/icons"                      import/extensions
   4:39  error    Unable to resolve path to module '@/components/icons'                import/no-unresolved
   5:19  error    Missing file extension for "@/components/Modal"                      import/extensions
   5:19  error    Unable to resolve path to module '@/components/Modal'                import/no-unresolved
   6:20  error    Missing file extension for "@/components/Button"                     import/extensions
   6:20  error    Unable to resolve path to module '@/components/Button'               import/no-unresolved
   7:23  error    Missing file extension for "@/components/AppHeader"                  import/extensions
   7:23  error    Unable to resolve path to module '@/components/AppHeader'            import/no-unresolved
   9:38  error    Missing file extension for "@/services/localStorageService"          import/extensions
   9:38  error    Unable to resolve path to module '@/services/localStorageService'    import/no-unresolved
  10:49  error    Missing file extension for "@/types"                                 import/extensions
  10:49  error    Unable to resolve path to module '@/types'                           import/no-unresolved
  11:8   error    'ErrorBoundary' is defined but never used                            @typescript-eslint/no-unused-vars
  11:27  error    Missing file extension for "./components/ErrorBoundary"              import/extensions
  11:27  error    Unable to resolve path to module './components/ErrorBoundary'        import/no-unresolved
  14:26  error    Missing file extension for "@/hooks/useTheme"                        import/extensions
  14:26  error    Unable to resolve path to module '@/hooks/useTheme'                  import/no-unresolved
  15:27  error    Missing file extension for "@/styles/theme"                          import/extensions
  15:27  error    Unable to resolve path to module '@/styles/theme'                    import/no-unresolved
  17:40  error    Missing file extension for "@/rendering/CosmicCanvas"                import/extensions
  17:40  error    Unable to resolve path to module '@/rendering/CosmicCanvas'          import/no-unresolved
  18:44  error    Missing file extension for "@/components/NotificationArea"           import/extensions
  18:44  error    Unable to resolve path to module '@/components/NotificationArea'     import/no-unresolved
  21:39  error    Missing file extension for "@/components/LandingPage"                import/extensions
  21:39  error    Unable to resolve path to module '@/components/LandingPage'          import/no-unresolved
  22:37  error    Missing file extension for "@/components/Workbench"                  import/extensions
  22:37  error    Unable to resolve path to module '@/components/Workbench'            import/no-unresolved
  23:36  error    Missing file extension for "@/components/IdeaList"                   import/extensions
  23:36  error    Unable to resolve path to module '@/components/IdeaList'             import/no-unresolved
  24:38  error    Missing file extension for "@/components/IdeaEditor"                 import/extensions
  24:38  error    Unable to resolve path to module '@/components/IdeaEditor'           import/no-unresolved
  25:41  error    Missing file extension for "@/components/SettingsModal"              import/extensions
  25:41  error    Unable to resolve path to module '@/components/SettingsModal'        import/no-unresolved
  26:40  error    Missing file extension for "@/components/ContactPanel"               import/extensions
  26:40  error    Unable to resolve path to module '@/components/ContactPanel'         import/no-unresolved
  28:23  error    Function component is not a function declaration                     react/function-component-definition

/Users/allisongattone/Documents/GitHub/ideaforge/src/components/AppHeader.tsx
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-cycle
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/namespace
  1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-duplicates
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-unresolved
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/default
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-extraneous-dependencies
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/order
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-self-import
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-relative-packages
  1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-named-as-default
  1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-named-as-default-member
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/extensions
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-useless-path-segments
  1:19  error    Unable to resolve path to module 'react'                             import/no-unresolved
  2:26  error    Missing file extension for "@/hooks/useTheme"                        import/extensions
  2:26  error    Unable to resolve path to module '@/hooks/useTheme'                  import/no-unresolved
  3:20  error    Missing file extension for "./Button"                                import/extensions
  3:20  error    Unable to resolve path to module './Button'                          import/no-unresolved
  4:35  error    Missing file extension for "./icons"                                 import/extensions
  4:35  error    Unable to resolve path to module './icons'                           import/no-unresolved
  6:29  error    Function component is not a function declaration                     react/function-component-definition

/Users/allisongattone/Documents/GitHub/ideaforge/src/components/BlueprintCard.tsx
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                               import/no-cycle
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                               import/namespace
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                                               import/no-duplicates
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                               import/no-unresolved
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                               import/default
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                               import/no-extraneous-dependencies
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                               import/order
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                               import/no-self-import
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                               import/no-relative-packages
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                                               import/no-named-as-default
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                                               import/no-named-as-default-member
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                               import/extensions
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                               import/no-useless-path-segments
    2:65  error    Unable to resolve path to module 'react'                                                                          import/no-unresolved
    3:75  error    Unable to resolve path to module 'framer-motion'                                                                  import/no-unresolved
    4:31  error    Missing file extension for "@/types"                                                                              import/extensions
    4:31  error    Unable to resolve path to module '@/types'                                                                        import/no-unresolved
    5:20  error    Missing file extension for "./Button"                                                                             import/extensions
    5:20  error    Unable to resolve path to module './Button'                                                                       import/no-unresolved
   13:8   error    Missing file extension for "./icons"                                                                              import/extensions
   13:8   error    Unable to resolve path to module './icons'                                                                        import/no-unresolved
   18:3   error    propType "onSelect" is not required, but has no corresponding defaultProps declaration                            react/require-default-props
   19:3   error    propType "onQuickNewIdea" is not required, but has no corresponding defaultProps declaration                      react/require-default-props
   20:3   error    propType "onDelete" is not required, but has no corresponding defaultProps declaration                            react/require-default-props
   21:3   error    propType "onToggleFavorite" is not required, but has no corresponding defaultProps declaration                    react/require-default-props
   22:3   error    propType "className" is not required, but has no corresponding defaultProps declaration                           react/require-default-props
   25:53  error    Function component is not a function declaration                                                                  react/function-component-definition
   71:5   error    React Hook useCallback has missing dependencies: 'x' and 'y'. Either include them or remove the dependency array  react-hooks/exhaustive-deps
   78:6   error    React Hook useCallback has missing dependencies: 'x' and 'y'. Either include them or remove the dependency array  react-hooks/exhaustive-deps
  115:5   error    Do not nest ternary expressions                                                                                   no-nested-ternary
  141:13  error    Visible, non-interactive elements with click handlers must have at least one keyboard listener                    jsx-a11y/click-events-have-key-events
  141:13  error    Non-interactive elements should not be assigned mouse or keyboard event listeners                                 jsx-a11y/no-noninteractive-element-interactions
  148:17  error    Do not nest ternary expressions                                                                                   no-nested-ternary
  356:48  error    Function component is not a function declaration                                                                  react/function-component-definition

/Users/allisongattone/Documents/GitHub/ideaforge/src/components/BlueprintLogoUploader.tsx
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                 import/no-cycle
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                 import/namespace
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                 import/no-duplicates
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                 import/no-unresolved
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                 import/default
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                 import/no-extraneous-dependencies
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                 import/order
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                 import/no-self-import
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                 import/no-relative-packages
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                 import/no-named-as-default
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                 import/no-named-as-default-member
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                 import/extensions
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                 import/no-useless-path-segments
   1:47  error    Unable to resolve path to module 'react'                                            import/no-unresolved
   2:20  error    Missing file extension for "./Button"                                               import/extensions
   2:20  error    Unable to resolve path to module './Button'                                         import/no-unresolved
   3:55  error    Missing file extension for "./icons"                                                import/extensions
   3:55  error    Unable to resolve path to module './icons'                                          import/no-unresolved
   5:7   error    'MAX_BLUEPRINT_LOGO_SIZE_MB' is assigned a value but never used                     @typescript-eslint/no-unused-vars
   9:3   error    propType "logo" is not required, but has no corresponding defaultProps declaration  react/require-default-props
  16:69  error    Function component is not a function declaration                                    react/function-component-definition

/Users/allisongattone/Documents/GitHub/ideaforge/src/components/Button.test.tsx
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-cycle
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/namespace
  1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-duplicates
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-unresolved
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/default
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-extraneous-dependencies
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/order
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-self-import
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-relative-packages
  1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-named-as-default
  1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-named-as-default-member
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/extensions
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-useless-path-segments
  1:8   error    'React' is defined but never used                                    @typescript-eslint/no-unused-vars
  1:19  error    Unable to resolve path to module 'react'                             import/no-unresolved
  2:43  error    Unable to resolve path to module '@testing-library/react'            import/no-unresolved
  4:46  error    Unable to resolve path to module '@jest/globals'                     import/no-unresolved
  5:20  error    Missing file extension for "./Button"                                import/extensions
  5:20  error    Unable to resolve path to module './Button'                          import/no-unresolved

/Users/allisongattone/Documents/GitHub/ideaforge/src/components/Button.tsx
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                 import/no-cycle
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                 import/namespace
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                                 import/no-duplicates
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                 import/no-unresolved
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                 import/default
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                 import/no-extraneous-dependencies
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                 import/order
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                 import/no-self-import
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                 import/no-relative-packages
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                                 import/no-named-as-default
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                                 import/no-named-as-default-member
    1:19  error    Unable to resolve path to module 'react'                                                            import/no-unresolved
    2:24  error    Unable to resolve path to module 'framer-motion'                                                    import/no-unresolved
    5:3   error    propType "variant" is not required, but has no corresponding defaultProps declaration               react/require-default-props
    5:3   error    propType "variant" is not required, but has no corresponding defaultProps declaration               react/require-default-props
    6:3   error    propType "size" is not required, but has no corresponding defaultProps declaration                  react/require-default-props
    6:3   error    propType "size" is not required, but has no corresponding defaultProps declaration                  react/require-default-props
    7:3   error    propType "leftIcon" is not required, but has no corresponding defaultProps declaration              react/require-default-props
    7:3   error    propType "leftIcon" is not required, but has no corresponding defaultProps declaration              react/require-default-props
    8:3   error    propType "rightIcon" is not required, but has no corresponding defaultProps declaration             react/require-default-props
    8:3   error    propType "rightIcon" is not required, but has no corresponding defaultProps declaration             react/require-default-props
    9:3   error    propType "isLoading" is not required, but has no corresponding defaultProps declaration             react/require-default-props
    9:3   error    propType "isLoading" is not required, but has no corresponding defaultProps declaration             react/require-default-props
   10:3   error    propType "prefersReducedMotion" is not required, but has no corresponding defaultProps declaration  react/require-default-props
   10:3   error    propType "prefersReducedMotion" is not required, but has no corresponding defaultProps declaration  react/require-default-props
   11:3   error    propType "aria-label" is not required, but has no corresponding defaultProps declaration            react/require-default-props
   11:3   error    propType "aria-label" is not required, but has no corresponding defaultProps declaration            react/require-default-props
   14:39  error    Function component is not a function declaration                                                    react/function-component-definition
   92:7   error    Prop spreading is forbidden                                                                         react/jsx-props-no-spreading
   93:7   error    Prop spreading is forbidden                                                                         react/jsx-props-no-spreading
   93:21  error    Unexpected any. Specify a different type                                                            @typescript-eslint/no-explicit-any
  138:52  error    Function component is not a function declaration                                                    react/function-component-definition
  139:3   error    Missing an explicit type attribute for button                                                       react/button-has-type
  141:5   error    Prop spreading is forbidden                                                                         react/jsx-props-no-spreading

/Users/allisongattone/Documents/GitHub/ideaforge/src/components/ContactPanel.tsx
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver     import/no-cycle
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver     import/namespace
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver     import/no-duplicates
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver     import/no-unresolved
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver     import/default
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver     import/no-extraneous-dependencies
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver     import/order
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver     import/no-self-import
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver     import/no-relative-packages
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver     import/no-named-as-default
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver     import/no-named-as-default-member
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver     import/extensions
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver     import/no-useless-path-segments
    2:33  error    Unable to resolve path to module 'react'                                import/no-unresolved
    3:51  error    Unable to resolve path to module 'framer-motion'                        import/no-unresolved
    4:20  error    Missing file extension for "./Button"                                   import/extensions
    4:20  error    Unable to resolve path to module './Button'                             import/no-unresolved
    5:23  error    Missing file extension for "./TextInput"                                import/extensions
    5:23  error    Unable to resolve path to module './TextInput'                          import/no-unresolved
    6:22  error    Missing file extension for "./TextArea"                                 import/extensions
    6:22  error    Unable to resolve path to module './TextArea'                           import/no-unresolved
    7:46  error    Missing file extension for "./icons"                                    import/extensions
    7:46  error    Unable to resolve path to module './icons'                              import/no-unresolved
    8:25  error    Missing file extension for "@/services/logger"                          import/extensions
    8:25  error    Unable to resolve path to module '@/services/logger'                    import/no-unresolved
   23:51  error    Function component is not a function declaration                        react/function-component-definition
   35:36  error    Return values from promise executor functions cannot be read            no-promise-executor-return
   96:63  error    `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`         react/no-unescaped-entities
  146:89  error    Comments inside children section of tag should be placed inside braces  react/jsx-no-comment-textnodes
  157:47  error    Function component is not a function declaration                        react/function-component-definition

/Users/allisongattone/Documents/GitHub/ideaforge/src/components/CosmicForgeLogo.tsx
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-cycle
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/namespace
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-duplicates
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-unresolved
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/default
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-extraneous-dependencies
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/order
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-self-import
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-relative-packages
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-named-as-default
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-named-as-default-member
   1:19  error    Unable to resolve path to module 'react'                             import/no-unresolved
   2:24  error    Unable to resolve path to module 'framer-motion'                     import/no-unresolved
   4:73  error    Function component is not a function declaration                     react/function-component-definition
   5:40  error    Prop spreading is forbidden                                          react/jsx-props-no-spreading
  12:43  error    Function component is not a function declaration                     react/function-component-definition

/Users/allisongattone/Documents/GitHub/ideaforge/src/components/ErrorBoundary.tsx
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-cycle
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/namespace
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-duplicates
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-unresolved
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/default
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-extraneous-dependencies
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/order
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-self-import
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-relative-packages
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-named-as-default
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-named-as-default-member
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/extensions
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-useless-path-segments
   3:8   error    'React' is defined but never used                                    @typescript-eslint/no-unused-vars
   3:56  error    Unable to resolve path to module 'react'                             import/no-unresolved
   4:20  error    Missing file extension for "./Button"                                import/extensions
   4:20  error    Unable to resolve path to module './Button'                          import/no-unresolved
   5:41  error    Missing file extension for "./icons"                                 import/extensions
   5:41  error    Unable to resolve path to module './icons'                           import/no-unresolved
  23:35  error    '_' is defined but never used                                        @typescript-eslint/no-unused-vars
  33:3   error    Expected 'this' to be used by class method 'handleReload'            class-methods-use-this
  38:9   error    Must use destructuring state assignment                              react/destructuring-assignment
  56:54  error    Must use destructuring state assignment                              react/destructuring-assignment
  62:18  error    Must use destructuring state assignment                              react/destructuring-assignment
  63:18  error    Must use destructuring state assignment                              react/destructuring-assignment
  71:12  error    Must use destructuring props assignment                              react/destructuring-assignment

/Users/allisongattone/Documents/GitHub/ideaforge/src/components/GlowCard.tsx
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                 import/no-cycle
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                 import/namespace
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                                 import/no-duplicates
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                 import/no-unresolved
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                 import/default
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                 import/no-extraneous-dependencies
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                 import/order
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                 import/no-self-import
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                 import/no-relative-packages
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                                 import/no-named-as-default
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                                 import/no-named-as-default-member
   2:19  error    Unable to resolve path to module 'react'                                                            import/no-unresolved
   3:34  error    Unable to resolve path to module 'framer-motion'                                                    import/no-unresolved
   7:3   error    propType "className" is not required, but has no corresponding defaultProps declaration             react/require-default-props
   8:3   error    propType "glowColor" is not required, but has no corresponding defaultProps declaration             react/require-default-props
   9:3   error    propType "hoverEffect" is not required, but has no corresponding defaultProps declaration           react/require-default-props
  10:3   error    propType "borderRadius" is not required, but has no corresponding defaultProps declaration          react/require-default-props
  11:3   error    propType "padding" is not required, but has no corresponding defaultProps declaration               react/require-default-props
  12:3   error    propType "prefersReducedMotion" is not required, but has no corresponding defaultProps declaration  react/require-default-props
  15:43  error    Function component is not a function declaration                                                    react/function-component-definition
  71:43  error    Function component is not a function declaration                                                    react/function-component-definition

/Users/allisongattone/Documents/GitHub/ideaforge/src/components/IdeaEditor.test.tsx
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-cycle
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/namespace
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-duplicates
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-unresolved
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/default
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-extraneous-dependencies
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/order
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-self-import
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-relative-packages
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-named-as-default
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-named-as-default-member
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/extensions
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-useless-path-segments
   1:8   error    'React' is defined but never used                                    @typescript-eslint/no-unused-vars
   1:19  error    Unable to resolve path to module 'react'                             import/no-unresolved
   2:57  error    Unable to resolve path to module '@testing-library/react'            import/no-unresolved
   3:8   error    Unable to resolve path to module '@testing-library/jest-dom'         import/no-unresolved
   4:58  error    Unable to resolve path to module '@jest/globals'                     import/no-unresolved
   5:24  error    Missing file extension for "./IdeaEditor"                            import/extensions
   5:24  error    Unable to resolve path to module './IdeaEditor'                      import/no-unresolved
   6:25  error    'Attachment' is defined but never used                               @typescript-eslint/no-unused-vars
   6:43  error    Missing file extension for "@/types"                                 import/extensions
   6:43  error    Unable to resolve path to module '@/types'                           import/no-unresolved
   7:38  error    Missing file extension for "@/services/localStorageService"          import/extensions
   7:38  error    Unable to resolve path to module '@/services/localStorageService'    import/no-unresolved
   8:33  error    Missing file extension for "@/services/localStorageService"          import/extensions
   8:33  error    Unable to resolve path to module '@/services/localStorageService'    import/no-unresolved
   9:30  error    Missing file extension for "@/services/fileService"                  import/extensions
   9:30  error    Unable to resolve path to module '@/services/fileService'            import/no-unresolved
  32:5   warning  Unexpected unnamed function                                          func-names
  32:5   error    Component definition is missing display name                         react/display-name
  32:39  error    Unexpected any. Specify a different type                             @typescript-eslint/no-explicit-any
  33:14  error    Missing an explicit type attribute for button                        react/button-has-type
  33:22  error    Prop spreading is forbidden                                          react/jsx-props-no-spreading
  39:5   warning  Unexpected unnamed function                                          func-names
  39:5   error    Component definition is missing display name                         react/display-name
  39:69  error    Unexpected any. Specify a different type                             @typescript-eslint/no-explicit-any
  41:9   error    A form label must be associated with a control                       jsx-a11y/label-has-associated-control
  44:64  error    Prop spreading is forbidden                                          react/jsx-props-no-spreading
  52:5   warning  Unexpected unnamed function                                          func-names
  52:5   error    Component definition is missing display name                         react/display-name
  52:69  error    Unexpected any. Specify a different type                             @typescript-eslint/no-explicit-any
  54:9   error    A form label must be associated with a control                       jsx-a11y/label-has-associated-control
  57:67  error    Prop spreading is forbidden                                          react/jsx-props-no-spreading

/Users/allisongattone/Documents/GitHub/ideaforge/src/components/IdeaEditor.tsx
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/no-cycle
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/namespace
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/no-duplicates
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/no-unresolved
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/default
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/no-extraneous-dependencies
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/order
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/no-self-import
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/no-relative-packages
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/no-named-as-default
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/no-named-as-default-member
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/extensions
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/no-useless-path-segments
    1:81  error    Unable to resolve path to module 'react'                                                                                                                                   import/no-unresolved
    2:24  error    Unable to resolve path to module 'framer-motion'                                                                                                                           import/no-unresolved
    3:8   error    'Button' is defined but never used                                                                                                                                         @typescript-eslint/no-unused-vars
    3:20  error    Missing file extension for "./Button"                                                                                                                                      import/extensions
    3:20  error    Unable to resolve path to module './Button'                                                                                                                                import/no-unresolved
    4:8   error    'TextArea' is defined but never used                                                                                                                                       @typescript-eslint/no-unused-vars
    4:22  error    Missing file extension for "./TextArea"                                                                                                                                    import/extensions
    4:22  error    Unable to resolve path to module './TextArea'                                                                                                                              import/no-unresolved
    6:3   error    'SparklesIcon' is defined but never used                                                                                                                                   @typescript-eslint/no-unused-vars
    7:3   error    'DocumentArrowDownIcon' is defined but never used                                                                                                                          @typescript-eslint/no-unused-vars
   11:3   error    'TrashIcon' is defined but never used                                                                                                                                      @typescript-eslint/no-unused-vars
   12:3   error    'ArrowLeftIcon' is defined but never used                                                                                                                                  @typescript-eslint/no-unused-vars
   13:3   error    'PlusCircleIcon' is defined but never used                                                                                                                                 @typescript-eslint/no-unused-vars
   14:3   error    'ArrowDownTrayIcon' is defined but never used                                                                                                                              @typescript-eslint/no-unused-vars
   15:3   error    'ArrowUpTrayIcon' is defined but never used                                                                                                                                @typescript-eslint/no-unused-vars
   16:3   error    'DocumentChartBarIcon' is defined but never used                                                                                                                           @typescript-eslint/no-unused-vars
   17:8   error    Missing file extension for "./icons"                                                                                                                                       import/extensions
   17:8   error    Unable to resolve path to module './icons'                                                                                                                                 import/no-unresolved
   19:49  error    Missing file extension for "./BlueprintLogoUploader"                                                                                                                       import/extensions
   19:49  error    Unable to resolve path to module './BlueprintLogoUploader'                                                                                                                 import/no-unresolved
   20:44  error    Missing file extension for "./IdeaEditorHeader"                                                                                                                            import/extensions
   20:44  error    Unable to resolve path to module './IdeaEditorHeader'                                                                                                                      import/no-unresolved
   21:39  error    Missing file extension for "./TitleWithAI"                                                                                                                                 import/extensions
   21:39  error    Unable to resolve path to module './TitleWithAI'                                                                                                                           import/no-unresolved
   22:42  error    Missing file extension for "./IdeaFormFields"                                                                                                                              import/extensions
   22:42  error    Unable to resolve path to module './IdeaFormFields'                                                                                                                        import/no-unresolved
   23:44  error    Missing file extension for "./IdeaEditorFooter"                                                                                                                            import/extensions
   23:44  error    Unable to resolve path to module './IdeaEditorFooter'                                                                                                                      import/no-unresolved
   25:40  error    Missing file extension for "./NebulaCanvas"                                                                                                                                import/extensions
   25:40  error    Unable to resolve path to module './NebulaCanvas'                                                                                                                          import/no-unresolved
   50:54  error    Function component is not a function declaration                                                                                                                           react/function-component-definition
  125:7   warning  Unexpected console statement                                                                                                                                               no-console
  155:7   warning  Unexpected console statement                                                                                                                                               no-console
  265:7   error    iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations  no-restricted-syntax
  269:28  error    Unexpected `await` inside a loop                                                                                                                                           no-await-in-loop
  269:41  error    Unable to resolve path to module 'jszip'                                                                                                                                   import/no-unresolved
  270:25  error    Unexpected `await` inside a loop                                                                                                                                           no-await-in-loop
  271:72  error    Unexpected any. Specify a different type                                                                                                                                   @typescript-eslint/no-explicit-any
  273:13  error    iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations  no-restricted-syntax
  275:18  error    Unexpected `await` inside a loop                                                                                                                                           no-await-in-loop
  275:34  error    Unexpected any. Specify a different type                                                                                                                                   @typescript-eslint/no-explicit-any
  276:27  error    Unexpected any. Specify a different type                                                                                                                                   @typescript-eslint/no-explicit-any
  277:26  error    Unexpected `await` inside a loop                                                                                                                                           no-await-in-loop
  277:42  error    Unexpected any. Specify a different type                                                                                                                                   @typescript-eslint/no-explicit-any
  279:34  error    Unexpected `await` inside a loop                                                                                                                                           no-await-in-loop
  292:13  warning  Unexpected console statement                                                                                                                                               no-console
  299:30  error    Unexpected `await` inside a loop                                                                                                                                           no-await-in-loop
  342:9   error    'handleDownloadAttachment' is assigned a value but never used                                                                                                              @typescript-eslint/no-unused-vars

/Users/allisongattone/Documents/GitHub/ideaforge/src/components/IdeaEditorHeader.tsx
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                   import/no-cycle
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                   import/namespace
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                   import/no-duplicates
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                   import/no-unresolved
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                   import/default
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                   import/no-extraneous-dependencies
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                   import/order
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                   import/no-self-import
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                   import/no-relative-packages
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                   import/no-named-as-default
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                   import/no-named-as-default-member
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                   import/extensions
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                   import/no-useless-path-segments
   1:19  error    Unable to resolve path to module 'react'                                              import/no-unresolved
   2:20  error    Missing file extension for "./Button"                                                 import/extensions
   2:20  error    Unable to resolve path to module './Button'                                           import/no-unresolved
   3:76  error    Missing file extension for "./icons"                                                  import/extensions
   3:76  error    Unable to resolve path to module './icons'                                            import/no-unresolved
   6:3   error    propType "ideaId" is not required, but has no corresponding defaultProps declaration  react/require-default-props
  15:59  error    Function component is not a function declaration                                      react/function-component-definition

/Users/allisongattone/Documents/GitHub/ideaforge/src/components/IdeaList.test.tsx
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                                                import/no-cycle
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                                                import/namespace
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                                                                                                                                import/no-duplicates
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                                                import/no-unresolved
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                                                import/default
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                                                import/no-extraneous-dependencies
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                                                import/order
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                                                import/no-self-import
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                                                import/no-relative-packages
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                                                                                                                                import/no-named-as-default
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                                                                                                                                import/no-named-as-default-member
    1:19  error    Unable to resolve path to module 'react'                                                                                                                                                           import/no-unresolved
    6:20  error    Unexpected any. Specify a different type                                                                                                                                                           @typescript-eslint/no-explicit-any
   10:56  error    Unexpected any. Specify a different type                                                                                                                                                           @typescript-eslint/no-explicit-any
   13:50  error    '_' is already declared in the upper scope on line 12 column 50                                                                                                                                    no-shadow
   14:21  error    Do not use Array index in keys                                                                                                                                                                     react/no-array-index-key
   14:21  error    Do not use Array index in keys                                                                                                                                                                     react/no-array-index-key
   25:5   warning  Unexpected unnamed function                                                                                                                                                                        func-names
   25:5   error    Component definition is missing display name                                                                                                                                                       react/display-name
   27:7   error    'type' is defined but never used                                                                                                                                                                   @typescript-eslint/no-unused-vars
   37:9   error    Visible, non-interactive elements with click handlers must have at least one keyboard listener                                                                                                     jsx-a11y/click-events-have-key-events
   37:9   error    Avoid non-native interactive elements. If using native HTML is not possible, add an appropriate role and support for tabbing, mouse, keyboard, and touch inputs to an interactive content element  jsx-a11y/no-static-element-interactions
   39:11  error    Missing an explicit type attribute for button                                                                                                                                                      react/button-has-type
   49:5   warning  Unexpected unnamed function                                                                                                                                                                        func-names
   49:5   error    Component definition is missing display name                                                                                                                                                       react/display-name
   53:14  error    Missing an explicit type attribute for button                                                                                                                                                      react/button-has-type
   53:22  error    Prop spreading is forbidden                                                                                                                                                                        react/jsx-props-no-spreading
   59:5   warning  Unexpected unnamed function                                                                                                                                                                        func-names
   59:5   error    Component definition is missing display name                                                                                                                                                       react/display-name
   74:11  error    Missing an explicit type attribute for button                                                                                                                                                      react/button-has-type
  213:8   error    'IdeaList' is not defined                                                                                                                                                                          react/jsx-no-undef
  226:12  error    Unexpected use of 'screen'                                                                                                                                                                         no-restricted-globals
  227:12  error    Unexpected use of 'screen'                                                                                                                                                                         no-restricted-globals
  228:12  error    Unexpected use of 'screen'                                                                                                                                                                         no-restricted-globals
  229:12  error    Unexpected use of 'screen'                                                                                                                                                                         no-restricted-globals
  234:21  error    Unexpected use of 'screen'                                                                                                                                                                         no-restricted-globals
  240:21  error    Unexpected use of 'screen'                                                                                                                                                                         no-restricted-globals
  246:23  error    Unexpected use of 'screen'                                                                                                                                                                         no-restricted-globals
  253:26  error    Unexpected use of 'screen'                                                                                                                                                                         no-restricted-globals
  259:12  error    Unexpected use of 'screen'                                                                                                                                                                         no-restricted-globals
  260:12  error    Unexpected use of 'screen'                                                                                                                                                                         no-restricted-globals
  263:33  error    Unexpected use of 'screen'                                                                                                                                                                         no-restricted-globals
  281:26  error    Unexpected use of 'screen'                                                                                                                                                                         no-restricted-globals
  295:25  error    Unexpected use of 'screen'                                                                                                                                                                         no-restricted-globals
  318:26  error    Unexpected use of 'screen'                                                                                                                                                                         no-restricted-globals
  335:29  error    Unexpected use of 'screen'                                                                                                                                                                         no-restricted-globals
  398:29  error    Unexpected use of 'screen'                                                                                                                                                                         no-restricted-globals
  411:37  error    Unexpected use of 'screen'                                                                                                                                                                         no-restricted-globals
  426:26  error    Unexpected use of 'screen'                                                                                                                                                                         no-restricted-globals
  438:24  error    Unexpected use of 'screen'                                                                                                                                                                         no-restricted-globals
  441:21  error    Unexpected use of 'screen'                                                                                                                                                                         no-restricted-globals
  448:19  error    Unexpected use of 'screen'                                                                                                                                                                         no-restricted-globals
  456:19  error    Unexpected use of 'screen'                                                                                                                                                                         no-restricted-globals
  464:12  error    Unexpected use of 'screen'                                                                                                                                                                         no-restricted-globals
  466:7   error    Unexpected use of 'screen'                                                                                                                                                                         no-restricted-globals
  473:7   error    Unexpected use of 'screen'                                                                                                                                                                         no-restricted-globals
  480:13  error    'IdeaList' is not defined                                                                                                                                                                          react/jsx-no-undef
  481:21  error    Unexpected use of 'screen'                                                                                                                                                                         no-restricted-globals

/Users/allisongattone/Documents/GitHub/ideaforge/src/components/IdeaList.tsx
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/no-cycle
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/namespace
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/no-duplicates
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/no-unresolved
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/default
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/no-extraneous-dependencies
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/order
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/no-self-import
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/no-relative-packages
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/no-named-as-default
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/no-named-as-default-member
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/extensions
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/no-useless-path-segments
    1:67  error    'Suspense' is defined but never used                                                                                                                                       @typescript-eslint/no-unused-vars
    1:83  error    Unable to resolve path to module 'react'                                                                                                                                   import/no-unresolved
    2:24  error    Unable to resolve path to module 'framer-motion'                                                                                                                           import/no-unresolved
    3:39  error    Unable to resolve path to module 'react-window'                                                                                                                            import/no-unresolved
    4:23  error    Unable to resolve path to module 'react-virtualized-auto-sizer'                                                                                                            import/no-unresolved
    5:10  error    'Project' is defined but never used                                                                                                                                        @typescript-eslint/no-unused-vars
    5:43  error    Missing file extension for "@/types"                                                                                                                                       import/extensions
    5:43  error    Unable to resolve path to module '@/types'                                                                                                                                 import/no-unresolved
    6:20  error    Missing file extension for "./Button"                                                                                                                                      import/extensions
    6:20  error    Unable to resolve path to module './Button'                                                                                                                                import/no-unresolved
    7:30  error    Missing file extension for "@/services/fileService"                                                                                                                        import/extensions
    7:30  error    Unable to resolve path to module '@/services/fileService'                                                                                                                  import/no-unresolved
    8:53  error    Missing file extension for "@/utils/zineExporter"                                                                                                                          import/extensions
    8:53  error    Unable to resolve path to module '@/utils/zineExporter'                                                                                                                    import/no-unresolved
   21:8   error    Missing file extension for "./icons"                                                                                                                                       import/extensions
   21:8   error    Unable to resolve path to module './icons'                                                                                                                                 import/no-unresolved
   22:10  error    'staggerContainer' is defined but never used                                                                                                                               @typescript-eslint/no-unused-vars
   22:28  error    'staggerItem' is defined but never used                                                                                                                                    @typescript-eslint/no-unused-vars
   22:47  error    Missing file extension for "@/motion/variants"                                                                                                                             import/extensions
   22:47  error    Unable to resolve path to module '@/motion/variants'                                                                                                                       import/no-unresolved
   27:33  error    Missing file extension for "./Modal"                                                                                                                                       import/extensions
   27:33  error    Unable to resolve path to module './Modal'                                                                                                                                 import/no-unresolved
   29:41  error    Missing file extension for "./BlueprintCard"                                                                                                                               import/extensions
   29:41  error    Unable to resolve path to module './BlueprintCard'                                                                                                                         import/no-unresolved
   36:26  error    'IdeaListProps' was used before it was defined                                                                                                                             no-use-before-define
   36:43  error    Function component is not a function declaration                                                                                                                           react/function-component-definition
   37:3   error    'project' is missing in props validation                                                                                                                                   react/prop-types
   38:3   error    'onEditIdea' is missing in props validation                                                                                                                                react/prop-types
   39:3   error    'onCreateNewIdea' is missing in props validation                                                                                                                           react/prop-types
   40:3   error    'onBackToProjects' is missing in props validation                                                                                                                          react/prop-types
   41:3   error    'addNotification' is missing in props validation                                                                                                                           react/prop-types
   42:3   error    'onUpdateProject' is missing in props validation                                                                                                                           react/prop-types
   55:24  error    'project.ideas' is missing in props validation                                                                                                                             react/prop-types
   55:30  error    'project.ideas.filter' is missing in props validation                                                                                                                      react/prop-types
   62:7   warning  Unexpected console statement                                                                                                                                               no-console
   69:49  error    'project.name' is missing in props validation                                                                                                                              react/prop-types
   75:7   warning  Unexpected console statement                                                                                                                                               no-console
   80:17  error    'project.ideas' is missing in props validation                                                                                                                             react/prop-types
   80:23  error    'project.ideas.length' is missing in props validation                                                                                                                      react/prop-types
   86:52  error    'project.name' is missing in props validation                                                                                                                              react/prop-types
   92:59  error    'project.name' is missing in props validation                                                                                                                              react/prop-types
   94:58  error    'project.name' is missing in props validation                                                                                                                              react/prop-types
  100:7   warning  Unexpected console statement                                                                                                                                               no-console
  131:7   warning  Unexpected console statement                                                                                                                                               no-console
  137:9   warning  Unexpected confirm                                                                                                                                                         no-alert
  165:7   error    iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations  no-restricted-syntax
  167:28  error    Unexpected `await` inside a loop                                                                                                                                           no-await-in-loop
  177:37  error    'project.attachments' is missing in props validation                                                                                                                       react/prop-types
  187:5   error    React Hook useCallback has a missing dependency: 'project'. Either include it or remove the dependency array                                                               react-hooks/exhaustive-deps
  187:14  error    'project.id' is missing in props validation                                                                                                                                react/prop-types
  210:9   warning  Unexpected confirm                                                                                                                                                         no-alert
  213:31  error    'project.attachments' is missing in props validation                                                                                                                       react/prop-types
  228:46  error    'project.ideas' is missing in props validation                                                                                                                             react/prop-types
  254:22  error    'project.logo' is missing in props validation                                                                                                                              react/prop-types
  256:30  error    'project.logo' is missing in props validation                                                                                                                              react/prop-types
  257:33  error    'project.name' is missing in props validation                                                                                                                              react/prop-types
  268:32  error    'project.name' is missing in props validation                                                                                                                              react/prop-types
  270:41  error    'project.name' is missing in props validation                                                                                                                              react/prop-types
  289:34  error    'project.logo' is missing in props validation                                                                                                                              react/prop-types
  292:28  error    'project.logo' is missing in props validation                                                                                                                              react/prop-types
  294:26  error    'project.logo' is missing in props validation                                                                                                                              react/prop-types
  354:13  error    A form label must be associated with a control                                                                                                                             jsx-a11y/label-has-associated-control
  422:55  error    `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`                                                                                                            react/no-unescaped-entities
  422:69  error    `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`                                                                                                            react/no-unescaped-entities
  435:25  error    'project.attachments' is missing in props validation                                                                                                                       react/prop-types
  435:38  error    'project.attachments.length' is missing in props validation                                                                                                                react/prop-types
  459:18  error    'project.attachments' is missing in props validation                                                                                                                       react/prop-types
  459:41  error    'project.attachments' is missing in props validation                                                                                                                       react/prop-types
  459:53  error    'project.attachments.length' is missing in props validation                                                                                                                react/prop-types
  461:22  error    'project.attachments' is missing in props validation                                                                                                                       react/prop-types
  461:34  error    'project.attachments.map' is missing in props validation                                                                                                                   react/prop-types
  534:3   error    'onSelect' PropType is defined but prop is never used                                                                                                                      react/no-unused-prop-types
  537:50  error    Function component is not a function declaration                                                                                                                           react/function-component-definition
  541:9   error    Missing an explicit type attribute for button                                                                                                                              react/button-has-type

/Users/allisongattone/Documents/GitHub/ideaforge/src/components/LandingPage.tsx
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver     import/no-cycle
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver     import/namespace
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver     import/no-duplicates
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver     import/no-unresolved
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver     import/default
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver     import/no-extraneous-dependencies
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver     import/order
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver     import/no-self-import
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver     import/no-relative-packages
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver     import/no-named-as-default
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver     import/no-named-as-default-member
    1:19  error    Unable to resolve path to module 'react'                                import/no-unresolved
    2:55  error    Unable to resolve path to module 'framer-motion'                        import/no-unresolved
   49:49  error    Function component is not a function declaration                        react/function-component-definition
  109:6   error    Comments inside children section of tag should be placed inside braces  react/jsx-no-comment-textnodes

/Users/allisongattone/Documents/GitHub/ideaforge/src/components/Modal.tsx
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                 import/no-cycle
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                 import/namespace
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                                 import/no-duplicates
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                 import/no-unresolved
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                 import/default
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                 import/no-extraneous-dependencies
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                 import/order
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                 import/no-self-import
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                 import/no-relative-packages
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                                 import/no-named-as-default
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                                 import/no-named-as-default-member
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                 import/extensions
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                 import/no-useless-path-segments
   1:55  error    Unable to resolve path to module 'react'                                                            import/no-unresolved
   2:63  error    Unable to resolve path to module 'framer-motion'                                                    import/no-unresolved
   3:27  error    Missing file extension for "./icons"                                                                import/extensions
   3:27  error    Unable to resolve path to module './icons'                                                          import/no-unresolved
   4:20  error    Missing file extension for "./Button"                                                               import/extensions
   4:20  error    Unable to resolve path to module './Button'                                                         import/no-unresolved
  10:3   error    propType "titleId" is not required, but has no corresponding defaultProps declaration               react/require-default-props
  11:3   error    propType "descriptionId" is not required, but has no corresponding defaultProps declaration         react/require-default-props
  13:3   error    propType "footer" is not required, but has no corresponding defaultProps declaration                react/require-default-props
  14:3   error    propType "size" is not required, but has no corresponding defaultProps declaration                  react/require-default-props
  15:3   error    propType "isGlassmorphic" is not required, but has no corresponding defaultProps declaration        react/require-default-props
  16:3   error    propType "className" is not required, but has no corresponding defaultProps declaration             react/require-default-props
  17:3   error    propType "prefersReducedMotion" is not required, but has no corresponding defaultProps declaration  react/require-default-props
  35:37  error    Function component is not a function declaration                                                    react/function-component-definition

/Users/allisongattone/Documents/GitHub/ideaforge/src/components/MotionCard.tsx
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                               import/no-cycle
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                               import/namespace
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                                               import/no-duplicates
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                               import/no-unresolved
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                               import/default
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                               import/no-extraneous-dependencies
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                               import/order
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                               import/no-self-import
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                               import/no-relative-packages
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                                               import/no-named-as-default
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                                               import/no-named-as-default-member
    2:65  error    Unable to resolve path to module 'react'                                                                          import/no-unresolved
    3:75  error    Unable to resolve path to module 'framer-motion'                                                                  import/no-unresolved
    7:3   error    propType "className" is not required, but has no corresponding defaultProps declaration                           react/require-default-props
    8:3   error    propType "title" is not required, but has no corresponding defaultProps declaration                               react/require-default-props
    9:3   error    propType "imageUrl" is not required, but has no corresponding defaultProps declaration                            react/require-default-props
   10:3   error    'tags' PropType is defined but prop is never used                                                                 react/no-unused-prop-types
   10:3   error    propType "tags" is not required, but has no corresponding defaultProps declaration                                react/require-default-props
   11:3   error    propType "tiltEnabled" is not required, but has no corresponding defaultProps declaration                         react/require-default-props
   14:47  error    Function component is not a function declaration                                                                  react/function-component-definition
   59:5   error    React Hook useCallback has missing dependencies: 'x' and 'y'. Either include them or remove the dependency array  react-hooks/exhaustive-deps
   66:6   error    React Hook useCallback has missing dependencies: 'x' and 'y'. Either include them or remove the dependency array  react-hooks/exhaustive-deps
  131:45  error    Function component is not a function declaration                                                                  react/function-component-definition

/Users/allisongattone/Documents/GitHub/ideaforge/src/components/NotificationArea.tsx
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                    import/no-cycle
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                    import/namespace
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                    import/no-duplicates
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                    import/no-unresolved
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                    import/default
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                    import/no-extraneous-dependencies
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                    import/order
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                    import/no-self-import
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                    import/no-relative-packages
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                    import/no-named-as-default
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                    import/no-named-as-default-member
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                    import/extensions
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                    import/no-useless-path-segments
   1:19  error    Unable to resolve path to module 'react'                                               import/no-unresolved
   2:41  error    Unable to resolve path to module 'framer-motion'                                       import/no-unresolved
   3:34  error    Missing file extension for "@/types"                                                   import/extensions
   3:34  error    Unable to resolve path to module '@/types'                                             import/no-unresolved
   9:8   error    Missing file extension for "./icons"                                                   import/extensions
   9:8   error    Unable to resolve path to module './icons'                                             import/no-unresolved
  25:6   error    Function component is not a function declaration                                       react/function-component-definition
  68:7   error    Missing an explicit type attribute for button                                          react/button-has-type
  79:59  error    Function component is not a function declaration                                       react/function-component-definition
  94:3   error    propType "message" is not required, but has no corresponding defaultProps declaration  react/require-default-props
  97:82  error    Function component is not a function declaration                                       react/function-component-definition

/Users/allisongattone/Documents/GitHub/ideaforge/src/components/PhraseRotator.tsx
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                import/no-cycle
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                import/namespace
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                                                import/no-duplicates
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                import/no-unresolved
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                import/default
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                import/no-extraneous-dependencies
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                import/order
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                import/no-self-import
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                import/no-relative-packages
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                                                import/no-named-as-default
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                                                import/no-named-as-default-member
   2:44  error    Unable to resolve path to module 'react'                                                                           import/no-unresolved
   3:41  error    Unable to resolve path to module 'framer-motion'                                                                   import/no-unresolved
   6:3   error    propType "phrases" is not required, but has no corresponding defaultProps declaration                              react/require-default-props
   7:3   error    propType "interval" is not required, but has no corresponding defaultProps declaration                             react/require-default-props
   8:3   error    propType "className" is not required, but has no corresponding defaultProps declaration                            react/require-default-props
  11:53  error    Function component is not a function declaration                                                                   react/function-component-definition
  23:5   error    Arrow function expected no return value                                                                            consistent-return
  48:48  error    Function component is not a function declaration                                                                   react/function-component-definition
  59:6   error    React Hook useEffect has a missing dependency: 'phrases.length'. Either include it or remove the dependency array  react-hooks/exhaustive-deps

/Users/allisongattone/Documents/GitHub/ideaforge/src/components/RippleButton.tsx
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-cycle
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/namespace
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-duplicates
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-unresolved
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/default
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-extraneous-dependencies
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/order
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-self-import
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-relative-packages
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-named-as-default
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-named-as-default-member
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/extensions
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-useless-path-segments
    2:69  error    Unable to resolve path to module 'react'                             import/no-unresolved
    2:69  warning  'react' imported multiple times                                      import/no-duplicates
    3:19  error    Unable to resolve path to module 'react'                             import/no-unresolved
    3:19  warning  'react' imported multiple times                                      import/no-duplicates
    4:20  error    Missing file extension for "./Button"                                import/extensions
    4:20  error    Unable to resolve path to module './Button'                          import/no-unresolved
   19:51  error    Component definition is missing display name                         react/display-name
   21:5   error    'children' is missing in props validation                            react/prop-types
   22:5   error    'onClick' is missing in props validation                             react/prop-types
   23:5   error    'className' is missing in props validation                           react/prop-types
   24:5   error    'rippleColor' is missing in props validation                         react/prop-types
   25:5   error    'prefersReducedMotion' is missing in props validation                react/prop-types
   73:9   error    Prop spreading is forbidden                                          react/jsx-props-no-spreading
  104:68  error    Function component is not a function declaration                     react/function-component-definition
  105:3   error    Missing an explicit type attribute for button                        react/button-has-type
  107:5   error    Prop spreading is forbidden                                          react/jsx-props-no-spreading

/Users/allisongattone/Documents/GitHub/ideaforge/src/components/SettingsModal.tsx
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                        import/no-cycle
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                        import/namespace
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                        import/no-duplicates
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                        import/no-unresolved
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                        import/default
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                        import/no-extraneous-dependencies
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                        import/order
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                        import/no-self-import
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                        import/no-relative-packages
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                        import/no-named-as-default
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                        import/no-named-as-default-member
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                        import/extensions
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                        import/no-useless-path-segments
    1:52  error    Unable to resolve path to module 'react'                                                   import/no-unresolved
    2:34  error    Unable to resolve path to module 'framer-motion'                                           import/no-unresolved
    3:19  error    Missing file extension for "./Modal"                                                       import/extensions
    3:19  error    Unable to resolve path to module './Modal'                                                 import/no-unresolved
    4:20  error    Missing file extension for "./Button"                                                      import/extensions
    4:20  error    Unable to resolve path to module './Button'                                                import/no-unresolved
    5:34  error    Missing file extension for "@/types"                                                       import/extensions
    5:34  error    Unable to resolve path to module '@/types'                                                 import/no-unresolved
    6:26  error    Missing file extension for "@/services/localStorageService"                                import/extensions
    6:26  error    Unable to resolve path to module '@/services/localStorageService'                          import/no-unresolved
   16:8   error    Missing file extension for "./icons"                                                       import/extensions
   16:8   error    Unable to resolve path to module './icons'                                                 import/no-unresolved
   17:27  error    Missing file extension for "@/styles/theme"                                                import/extensions
   17:27  error    Unable to resolve path to module '@/styles/theme'                                          import/no-unresolved
   38:3   error    propType "description" is not required, but has no corresponding defaultProps declaration  react/require-default-props
   40:3   error    propType "className" is not required, but has no corresponding defaultProps declaration    react/require-default-props
   41:6   error    Function component is not a function declaration                                           react/function-component-definition
   54:3   error    propType "className" is not required, but has no corresponding defaultProps declaration    react/require-default-props
   55:3   error    propType "icon" is not required, but has no corresponding defaultProps declaration         react/require-default-props
   56:6   error    Function component is not a function declaration                                           react/function-component-definition
   77:53  error    Function component is not a function declaration                                           react/function-component-definition
  115:16  error    Expected to return a value at the end of arrow function                                    consistent-return
  127:7   warning  Unexpected confirm                                                                         no-alert
  169:7   warning  Unexpected console statement                                                               no-console
  557:88  error    Function component is not a function declaration                                           react/function-component-definition
  567:9   error    Missing an explicit type attribute for button                                              react/button-has-type

/Users/allisongattone/Documents/GitHub/ideaforge/src/components/TextArea.tsx
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                             import/no-cycle
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                             import/namespace
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                             import/no-duplicates
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                             import/no-unresolved
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                             import/default
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                             import/no-extraneous-dependencies
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                             import/order
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                             import/no-self-import
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                             import/no-relative-packages
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                             import/no-named-as-default
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                             import/no-named-as-default-member
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                             import/extensions
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                             import/no-useless-path-segments
   1:19  error    Unable to resolve path to module 'react'                                                        import/no-unresolved
   2:40  error    Missing file extension for "./icons"                                                            import/extensions
   2:40  error    Unable to resolve path to module './icons'                                                      import/no-unresolved
   5:3   error    propType "label" is not required, but has no corresponding defaultProps declaration             react/require-default-props
   5:3   error    propType "label" is not required, but has no corresponding defaultProps declaration             react/require-default-props
   6:3   error    propType "error" is not required, but has no corresponding defaultProps declaration             react/require-default-props
   6:3   error    propType "error" is not required, but has no corresponding defaultProps declaration             react/require-default-props
   7:3   error    propType "helpText" is not required, but has no corresponding defaultProps declaration          react/require-default-props
   7:3   error    propType "helpText" is not required, but has no corresponding defaultProps declaration          react/require-default-props
   8:3   error    propType "wrapperClassName" is not required, but has no corresponding defaultProps declaration  react/require-default-props
   8:3   error    propType "wrapperClassName" is not required, but has no corresponding defaultProps declaration  react/require-default-props
  11:43  error    Function component is not a function declaration                                                react/function-component-definition
  48:7   error    Prop spreading is forbidden                                                                     react/jsx-props-no-spreading
  56:58  error    Function component is not a function declaration                                                react/function-component-definition
  57:80  error    Prop spreading is forbidden                                                                     react/jsx-props-no-spreading

/Users/allisongattone/Documents/GitHub/ideaforge/src/components/TextInput.tsx
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                             import/no-cycle
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                             import/namespace
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                             import/no-duplicates
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                             import/no-unresolved
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                             import/default
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                             import/no-extraneous-dependencies
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                             import/order
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                             import/no-self-import
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                             import/no-relative-packages
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                             import/no-named-as-default
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                             import/no-named-as-default-member
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                             import/extensions
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                             import/no-useless-path-segments
   1:19  error    Unable to resolve path to module 'react'                                                        import/no-unresolved
   2:40  error    Missing file extension for "./icons"                                                            import/extensions
   2:40  error    Unable to resolve path to module './icons'                                                      import/no-unresolved
   5:3   error    propType "label" is not required, but has no corresponding defaultProps declaration             react/require-default-props
   6:3   error    propType "error" is not required, but has no corresponding defaultProps declaration             react/require-default-props
   7:3   error    propType "helpText" is not required, but has no corresponding defaultProps declaration          react/require-default-props
   8:3   error    propType "wrapperClassName" is not required, but has no corresponding defaultProps declaration  react/require-default-props
  11:45  error    Function component is not a function declaration                                                react/function-component-definition
  47:7   error    Prop spreading is forbidden                                                                     react/jsx-props-no-spreading

/Users/allisongattone/Documents/GitHub/ideaforge/src/components/TitleWithAI.tsx
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                             import/no-cycle
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                             import/namespace
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                             import/no-duplicates
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                             import/no-unresolved
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                             import/default
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                             import/no-extraneous-dependencies
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                             import/order
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                             import/no-self-import
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                             import/no-relative-packages
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                             import/no-named-as-default
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                             import/no-named-as-default-member
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                             import/extensions
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                             import/no-useless-path-segments
   1:19  error    Unable to resolve path to module 'react'                                                        import/no-unresolved
   2:23  error    Missing file extension for "./TextInput"                                                        import/extensions
   2:23  error    Unable to resolve path to module './TextInput'                                                  import/no-unresolved
   3:20  error    Missing file extension for "./Button"                                                           import/extensions
   3:20  error    Unable to resolve path to module './Button'                                                     import/no-unresolved
   4:30  error    Missing file extension for "./icons"                                                            import/extensions
   4:30  error    Unable to resolve path to module './icons'                                                      import/no-unresolved
  11:3   error    propType "helpText" is not required, but has no corresponding defaultProps declaration          react/require-default-props
  12:3   error    propType "wrapperClassName" is not required, but has no corresponding defaultProps declaration  react/require-default-props
  13:3   error    propType "required" is not required, but has no corresponding defaultProps declaration          react/require-default-props
  14:3   error    propType "disabled" is not required, but has no corresponding defaultProps declaration          react/require-default-props
  20:49  error    Function component is not a function declaration                                                react/function-component-definition
  45:7   error    Prop spreading is forbidden                                                                     react/jsx-props-no-spreading

/Users/allisongattone/Documents/GitHub/ideaforge/src/components/WelcomeScreen.tsx
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver     import/no-cycle
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver     import/namespace
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver     import/no-duplicates
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver     import/no-unresolved
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver     import/default
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver     import/no-extraneous-dependencies
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver     import/order
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver     import/no-self-import
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver     import/no-relative-packages
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver     import/no-named-as-default
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver     import/no-named-as-default-member
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver     import/extensions
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver     import/no-useless-path-segments
    2:19  error    Unable to resolve path to module 'react'                                import/no-unresolved
    3:24  error    Unable to resolve path to module 'framer-motion'                        import/no-unresolved
    4:26  error    Missing file extension for "./RippleButton"                             import/extensions
    4:26  error    Unable to resolve path to module './RippleButton'                       import/no-unresolved
    5:58  error    Missing file extension for "@/motion/variants"                          import/extensions
    5:58  error    Unable to resolve path to module '@/motion/variants'                    import/no-unresolved
    6:46  error    Missing file extension for "./icons"                                    import/extensions
    6:46  error    Unable to resolve path to module './icons'                              import/no-unresolved
   13:53  error    Function component is not a function declaration                        react/function-component-definition
   98:10  error    Comments inside children section of tag should be placed inside braces  react/jsx-no-comment-textnodes
  108:51  error    Function component is not a function declaration                        react/function-component-definition

/Users/allisongattone/Documents/GitHub/ideaforge/src/components/Workbench.tsx
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-cycle
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/namespace
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-duplicates
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-unresolved
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/default
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-extraneous-dependencies
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/order
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-self-import
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-relative-packages
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-named-as-default
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-named-as-default-member
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/extensions
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-useless-path-segments
    1:71  error    Unable to resolve path to module 'react'                             import/no-unresolved
    2:24  error    Unable to resolve path to module 'framer-motion'                     import/no-unresolved
    3:39  error    Unable to resolve path to module 'react-window'                      import/no-unresolved
    4:23  error    Unable to resolve path to module 'react-virtualized-auto-sizer'      import/no-unresolved
    5:25  error    Missing file extension for "@/types"                                 import/extensions
    5:25  error    Unable to resolve path to module '@/types'                           import/no-unresolved
    6:20  error    Missing file extension for "./Button"                                import/extensions
    6:20  error    Unable to resolve path to module './Button'                          import/no-unresolved
    7:23  error    Missing file extension for "./TextInput"                             import/extensions
    7:23  error    Unable to resolve path to module './TextInput'                       import/no-unresolved
    8:60  error    Missing file extension for "./icons"                                 import/extensions
    8:60  error    Unable to resolve path to module './icons'                           import/no-unresolved
    9:10  error    'staggerContainer' is defined but never used                         @typescript-eslint/no-unused-vars
    9:28  error    'staggerItem' is defined but never used                              @typescript-eslint/no-unused-vars
    9:47  error    Missing file extension for "@/motion/variants"                       import/extensions
    9:47  error    Unable to resolve path to module '@/motion/variants'                 import/no-unresolved
   12:33  error    Missing file extension for "./Modal"                                 import/extensions
   12:33  error    Unable to resolve path to module './Modal'                           import/no-unresolved
   13:41  error    Missing file extension for "./BlueprintCard"                         import/extensions
   13:41  error    Unable to resolve path to module './BlueprintCard'                   import/no-unresolved
   24:45  error    Function component is not a function declaration                     react/function-component-definition
   55:7   warning  Unexpected console statement                                         no-console
   66:7   warning  Unexpected console statement                                         no-console
   70:33  error    '_projectId' is defined but never used                               @typescript-eslint/no-unused-vars
  116:35  error    Do not nest ternary expressions                                      no-nested-ternary
  189:21  error    Non-interactive elements should not be assigned interactive roles    jsx-a11y/no-noninteractive-element-to-interactive-role

/Users/allisongattone/Documents/GitHub/ideaforge/src/components/icons.tsx
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                     import/no-cycle
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                     import/namespace
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                     import/no-duplicates
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                     import/no-unresolved
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                     import/default
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                     import/no-extraneous-dependencies
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                     import/order
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                     import/no-self-import
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                     import/no-relative-packages
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                     import/no-named-as-default
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                     import/no-named-as-default-member
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                     import/extensions
   1:19  error    Unable to resolve path to module 'react'                                                import/no-unresolved
   2:43  error    Unable to resolve path to module '@heroicons/react/24/solid'                            import/no-unresolved
  33:8   error    Unable to resolve path to module '@heroicons/react/24/outline'                          import/no-unresolved
  35:67  error    propType "isFilled" is not required, but has no corresponding defaultProps declaration  react/require-default-props
  35:91  error    Function component is not a function declaration                                        react/function-component-definition
  38:34  error    Prop spreading is forbidden                                                             react/jsx-props-no-spreading
  38:67  error    Prop spreading is forbidden                                                             react/jsx-props-no-spreading

/Users/allisongattone/Documents/GitHub/ideaforge/src/global.d.ts
  1:1  error  Resolve error: typescript with invalid interface loaded as resolver  import/no-cycle

/Users/allisongattone/Documents/GitHub/ideaforge/src/hooks/useTheme.ts
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-cycle
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/namespace
  1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-duplicates
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-unresolved
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-extraneous-dependencies
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/order
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-self-import
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-relative-packages
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/extensions
  1:37  error    Unable to resolve path to module 'react'                             import/no-unresolved
  2:35  error    Missing file extension for "@/styles/theme"                          import/extensions
  2:35  error    Unable to resolve path to module '@/styles/theme'                    import/no-unresolved

/Users/allisongattone/Documents/GitHub/ideaforge/src/hooks/useUndoRedo.tsx
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-cycle
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/namespace
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-duplicates
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-unresolved
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-extraneous-dependencies
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/order
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-self-import
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-relative-packages
   1:61  error    Unable to resolve path to module 'react'                             import/no-unresolved
  48:13  error    Unexpected any. Specify a different type                             @typescript-eslint/no-explicit-any

/Users/allisongattone/Documents/GitHub/ideaforge/src/index.tsx
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-cycle
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/namespace
  1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-duplicates
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-unresolved
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/default
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-extraneous-dependencies
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/order
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-self-import
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-relative-packages
  1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-named-as-default
  1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-named-as-default-member
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/extensions
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-useless-path-segments
  1:19  error    Unable to resolve path to module 'react'                             import/no-unresolved
  2:28  error    Unable to resolve path to module 'react-dom/client'                  import/no-unresolved
  3:17  error    Missing file extension for "./App"                                   import/extensions
  3:17  error    Unable to resolve path to module './App'                             import/no-unresolved
  4:8   error    Unable to resolve path to module './index.css'                       import/no-unresolved
  5:27  error    Missing file extension for "@/components/ErrorBoundary"              import/extensions
  5:27  error    Unable to resolve path to module '@/components/ErrorBoundary'        import/no-unresolved

/Users/allisongattone/Documents/GitHub/ideaforge/src/motion/transitions.ts
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-cycle
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/namespace
  1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-duplicates
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-unresolved
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-extraneous-dependencies
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/order
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-self-import
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-relative-packages
  2:28  error    Unable to resolve path to module 'framer-motion'                     import/no-unresolved

/Users/allisongattone/Documents/GitHub/ideaforge/src/motion/variants.ts
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-cycle
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/namespace
  1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-duplicates
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-unresolved
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-extraneous-dependencies
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/order
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-self-import
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-relative-packages
  2:26  error    Unable to resolve path to module 'framer-motion'                     import/no-unresolved

/Users/allisongattone/Documents/GitHub/ideaforge/src/rendering/CosmicCanvas.tsx
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                      import/no-cycle
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                      import/namespace
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                      import/no-duplicates
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                      import/no-unresolved
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                      import/default
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                      import/no-extraneous-dependencies
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                      import/order
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                      import/no-self-import
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                      import/no-relative-packages
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                      import/no-named-as-default
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                      import/no-named-as-default-member
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver                      import/extensions
   2:34  error    Unable to resolve path to module 'react'                                                 import/no-unresolved
   3:26  error    Missing file extension for "@/hooks/useTheme"                                            import/extensions
   3:26  error    Unable to resolve path to module '@/hooks/useTheme'                                      import/no-unresolved
   5:32  error    propType "className" is not required, but has no corresponding defaultProps declaration  react/require-default-props
   5:56  error    Function component is not a function declaration                                         react/function-component-definition
  11:9   error    'bgColorPrimary' is assigned a value but never used                                      @typescript-eslint/no-unused-vars
  22:7   error    'drawCosmicElements' was used before it was defined                                      no-use-before-define
  30:31  error    Unary operator '++' used                                                                 no-plusplus
  44:31  error    Unary operator '++' used                                                                 no-plusplus
  64:5   error    Arrow function expected no return value                                                  consistent-return

/Users/allisongattone/Documents/GitHub/ideaforge/src/services/aiService.ts
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-cycle
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/namespace
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-duplicates
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-unresolved
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-extraneous-dependencies
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/order
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-self-import
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-relative-packages
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/extensions
    1:29  error    Unable to resolve path to module '@google/genai'                     import/no-unresolved
    2:25  error    Missing file extension for "@/utils/env"                             import/extensions
    2:25  error    Unable to resolve path to module '@/utils/env'                       import/no-unresolved
    3:22  error    Missing file extension for "@/types"                                 import/extensions
    3:22  error    Unable to resolve path to module '@/types'                           import/no-unresolved
    6:9   error    Unexpected any. Specify a different type                             @typescript-eslint/no-explicit-any
   12:5   warning  Unexpected console statement                                         no-console
   15:3   warning  Unexpected console statement                                         no-console
   25:35  error    Return values from promise executor functions cannot be read         no-promise-executor-return
   36:14  error    Unexpected `await` inside a loop                                     no-await-in-loop
   38:7   error    Unary operator '++' used                                             no-plusplus
   39:7   warning  Unexpected console statement                                         no-console
   43:9   warning  Unexpected console statement                                         no-console
   48:7   error    Unexpected `await` inside a loop                                     no-await-in-loop
   64:41  error    Unexpected any. Specify a different type                             @typescript-eslint/no-explicit-any
   73:5   warning  Unexpected console statement                                         no-console
   95:39  error    Unexpected any. Specify a different type                             @typescript-eslint/no-explicit-any
  118:5   warning  Unexpected console statement                                         no-console
  129:39  error    Unexpected any. Specify a different type                             @typescript-eslint/no-explicit-any

/Users/allisongattone/Documents/GitHub/ideaforge/src/services/fileService.test.ts
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                  import/no-cycle
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                  import/namespace
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver                                                  import/no-duplicates
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                  import/no-unresolved
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                  import/no-extraneous-dependencies
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                  import/order
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                  import/no-self-import
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                  import/no-relative-packages
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                  import/extensions
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver                                                  import/no-useless-path-segments
    1:58  error    Unable to resolve path to module '@jest/globals'                                                                     import/no-unresolved
   10:8   error    Missing file extension for "./fileService"                                                                           import/extensions
   10:8   error    Unable to resolve path to module './fileService'                                                                     import/no-unresolved
   11:31  error    Missing file extension for "@/types"                                                                                 import/extensions
   11:31  error    Unable to resolve path to module '@/types'                                                                           import/no-unresolved
   31:1   error    Use "@ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free  @typescript-eslint/ban-ts-comment
  153:23  warning  Unexpected unnamed function                                                                                          func-names
  155:5   error    Use "@ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free  @typescript-eslint/ban-ts-comment
  156:19  error    Unexpected dangling '_' in '_customContent'                                                                          no-underscore-dangle
  156:28  error    Unexpected any. Specify a different type                                                                             @typescript-eslint/no-explicit-any
  157:5   error    Use "@ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free  @typescript-eslint/ban-ts-comment
  160:26  warning  Unexpected unnamed function                                                                                          func-names
  162:5   error    Use "@ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free  @typescript-eslint/ban-ts-comment
  163:19  error    Unexpected dangling '_' in '_customBase64Content'                                                                    no-underscore-dangle
  163:28  error    Unexpected any. Specify a different type                                                                             @typescript-eslint/no-explicit-any
  164:5   error    Use "@ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free  @typescript-eslint/ban-ts-comment
  172:16  error    Unexpected any. Specify a different type                                                                             @typescript-eslint/no-explicit-any
  241:7   error    Use "@ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free  @typescript-eslint/ban-ts-comment
  243:7   error    Use "@ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free  @typescript-eslint/ban-ts-comment
  256:7   error    Use "@ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free  @typescript-eslint/ban-ts-comment
  284:7   error    Use "@ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free  @typescript-eslint/ban-ts-comment
  286:7   error    Use "@ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free  @typescript-eslint/ban-ts-comment
  293:7   error    Use "@ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free  @typescript-eslint/ban-ts-comment
  316:7   error    Use "@ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free  @typescript-eslint/ban-ts-comment
  318:7   error    Use "@ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free  @typescript-eslint/ban-ts-comment
  323:7   error    Use "@ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free  @typescript-eslint/ban-ts-comment
  339:7   error    Use "@ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free  @typescript-eslint/ban-ts-comment
  340:7   error    Unexpected dangling '_' in '_customContent'                                                                          no-underscore-dangle
  340:16  error    Unexpected any. Specify a different type                                                                             @typescript-eslint/no-explicit-any
  352:64  warning  Unexpected unnamed function                                                                                          func-names
  353:9   error    Use "@ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free  @typescript-eslint/ban-ts-comment
  355:9   error    Use "@ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free  @typescript-eslint/ban-ts-comment
  366:7   error    Use "@ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free  @typescript-eslint/ban-ts-comment
  367:7   error    Unexpected dangling '_' in '_customContent'                                                                          no-underscore-dangle
  367:16  error    Unexpected any. Specify a different type                                                                             @typescript-eslint/no-explicit-any
  377:7   error    Use "@ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free  @typescript-eslint/ban-ts-comment
  378:7   error    Unexpected dangling '_' in '_customBase64Content'                                                                    no-underscore-dangle
  378:16  error    Unexpected any. Specify a different type                                                                             @typescript-eslint/no-explicit-any
  389:7   error    Use "@ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free  @typescript-eslint/ban-ts-comment
  390:7   error    Unexpected dangling '_' in '_customBase64Content'                                                                    no-underscore-dangle
  390:16  error    Unexpected any. Specify a different type                                                                             @typescript-eslint/no-explicit-any

/Users/allisongattone/Documents/GitHub/ideaforge/src/services/fileService.ts
    1:1    error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/no-cycle
    1:1    error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/namespace
    1:1    warning  Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/no-duplicates
    1:1    error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/no-unresolved
    1:1    error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/default
    1:1    error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/no-extraneous-dependencies
    1:1    error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/order
    1:1    error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/no-self-import
    1:1    error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/no-relative-packages
    1:1    warning  Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/no-named-as-default
    1:1    warning  Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/no-named-as-default-member
    1:1    error    Resolve error: typescript with invalid interface loaded as resolver                                                                                                        import/extensions
    1:19   error    Unable to resolve path to module 'jszip'                                                                                                                                   import/no-unresolved
    2:31   error    Missing file extension for "@/types"                                                                                                                                       import/extensions
    2:31   error    Unable to resolve path to module '@/types'                                                                                                                                 import/no-unresolved
    9:48   error    Unary operator '++' used                                                                                                                                                   no-plusplus
   15:5    warning  Unexpected console statement                                                                                                                                               no-console
   35:52   error    'sanitizeFilename' was used before it was defined                                                                                                                          no-use-before-define
   37:118  error    'sanitizeFilename' was used before it was defined                                                                                                                          no-use-before-define
   74:7    error    iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations  no-restricted-syntax
   80:7    error    'downloadFile' was used before it was defined                                                                                                                              no-use-before-define
   88:7    error    'downloadFile' was used before it was defined                                                                                                                              no-use-before-define
   91:5    warning  Unexpected console statement                                                                                                                                               no-console
  108:5    error    iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations  no-restricted-syntax
  115:9    warning  Unexpected console statement                                                                                                                                               no-console
  119:9    error    Unexpected use of continue statement                                                                                                                                       no-continue
  127:11   error    iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations  no-restricted-syntax
  132:11   warning  Unexpected console statement                                                                                                                                               no-console
  141:5    error    'downloadFile' was used before it was defined                                                                                                                              no-use-before-define
  147:5    warning  Unexpected console statement                                                                                                                                               no-console
  165:5    warning  Unexpected console statement                                                                                                                                               no-console
  176:7    warning  Unexpected console statement                                                                                                                                               no-console
  191:7    warning  Unexpected console statement                                                                                                                                               no-console

/Users/allisongattone/Documents/GitHub/ideaforge/src/services/localStorageService.test.ts
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-cycle
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/namespace
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-duplicates
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-unresolved
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-extraneous-dependencies
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/order
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-self-import
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-relative-packages
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/extensions
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-useless-path-segments
    2:58  error    Unable to resolve path to module '@jest/globals'                     import/no-unresolved
    3:46  error    Missing file extension for "./localStorageService"                   import/extensions
    3:46  error    Unable to resolve path to module './localStorageService'             import/no-unresolved
    4:31  error    Missing file extension for "@/types"                                 import/extensions
    4:31  error    Unable to resolve path to module '@/types'                           import/no-unresolved
   25:36  error    Unexpected any. Specify a different type                             @typescript-eslint/no-explicit-any
  106:9   error    Unary operator '++' used                                             no-plusplus

/Users/allisongattone/Documents/GitHub/ideaforge/src/services/localStorageService.ts
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-cycle
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/namespace
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/extensions
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-duplicates
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-unresolved
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-extraneous-dependencies
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/order
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-self-import
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-relative-packages
    1:58  error    Missing file extension for "@/types"                                 import/extensions
    1:58  error    Unable to resolve path to module '@/types'                           import/no-unresolved
    2:28  error    Missing file extension for "@/services/aiService"                    import/extensions
    2:28  error    Unable to resolve path to module '@/services/aiService'              import/no-unresolved
    3:34  error    Missing file extension for "@/services/settingsService"              import/extensions
    3:34  error    Unable to resolve path to module '@/services/settingsService'        import/no-unresolved
  153:9   error    Unary operator '++' used                                             no-plusplus
  165:5   warning  Unexpected console statement                                         no-console
  173:9   error    'getDefaultBlueprintLogo' was used before it was defined             no-use-before-define

/Users/allisongattone/Documents/GitHub/ideaforge/src/services/logger.ts
  1:1  error  Resolve error: typescript with invalid interface loaded as resolver  import/no-cycle

/Users/allisongattone/Documents/GitHub/ideaforge/src/services/metadataService.test.ts
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-cycle
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/namespace
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-duplicates
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-unresolved
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-extraneous-dependencies
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/order
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-self-import
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-relative-packages
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/extensions
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-useless-path-segments
   1:58  error    Unable to resolve path to module '@jest/globals'                     import/no-unresolved
   2:51  error    Missing file extension for "./metadataService"                       import/extensions
   2:51  error    Unable to resolve path to module './metadataService'                 import/no-unresolved
   3:29  error    Missing file extension for "@/types/Metadata"                        import/extensions
   3:29  error    Unable to resolve path to module '@/types/Metadata'                  import/no-unresolved
   6:16  error    Unexpected any. Specify a different type                             @typescript-eslint/no-explicit-any
  19:35  error    Unexpected any. Specify a different type                             @typescript-eslint/no-explicit-any

/Users/allisongattone/Documents/GitHub/ideaforge/src/services/metadataService.ts
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-cycle
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/namespace
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/extensions
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-duplicates
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-unresolved
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-extraneous-dependencies
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/order
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-self-import
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-relative-packages
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-useless-path-segments
   3:48  error    Missing file extension for "@/types/Metadata"                        import/extensions
   3:48  error    Unable to resolve path to module '@/types/Metadata'                  import/no-unresolved
  18:7   warning  Unexpected console statement                                         no-console
  27:5   warning  Unexpected console statement                                         no-console

/Users/allisongattone/Documents/GitHub/ideaforge/src/services/projectService.ts
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-cycle
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/namespace
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/extensions
  1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-duplicates
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-unresolved
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-extraneous-dependencies
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/order
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-self-import
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-relative-packages
  1:25  error    Missing file extension for "@/types"                                 import/extensions
  1:25  error    Unable to resolve path to module '@/types'                           import/no-unresolved

/Users/allisongattone/Documents/GitHub/ideaforge/src/services/settingsService.ts
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-cycle
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/namespace
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/extensions
   1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-duplicates
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-unresolved
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-extraneous-dependencies
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/order
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-self-import
   1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-relative-packages
   1:10  error    'ThemeName' is defined but never used                                @typescript-eslint/no-unused-vars
   1:27  error    Missing file extension for "@/styles/theme"                          import/extensions
   1:27  error    Unable to resolve path to module '@/styles/theme'                    import/no-unresolved
  31:15  error    'getRGBComponents' was used before it was defined                    no-use-before-define

/Users/allisongattone/Documents/GitHub/ideaforge/src/services/storageHelper.ts
  1:1  error  Resolve error: typescript with invalid interface loaded as resolver  import/no-cycle

/Users/allisongattone/Documents/GitHub/ideaforge/src/styles/theme.ts
  1:1  error  Resolve error: typescript with invalid interface loaded as resolver  import/no-cycle

/Users/allisongattone/Documents/GitHub/ideaforge/src/types.ts
  1:1  error  Resolve error: typescript with invalid interface loaded as resolver  import/no-cycle

/Users/allisongattone/Documents/GitHub/ideaforge/src/types/Metadata.ts
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-cycle
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/namespace
  1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-duplicates
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-unresolved
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-extraneous-dependencies
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/order
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-self-import
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-relative-packages
  3:19  error    Unable to resolve path to module 'zod'                               import/no-unresolved

/Users/allisongattone/Documents/GitHub/ideaforge/src/utils/env.ts
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-cycle
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/namespace
  1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-duplicates
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-unresolved
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-extraneous-dependencies
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/order
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-self-import
  1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-relative-packages
  2:19  error    Unable to resolve path to module 'zod'                               import/no-unresolved
  8:7   error    'parsedEnv' is assigned a value but never used                       @typescript-eslint/no-unused-vars

/Users/allisongattone/Documents/GitHub/ideaforge/src/utils/zineExporter.ts
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-cycle
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/namespace
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-duplicates
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-unresolved
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/default
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-extraneous-dependencies
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/order
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-self-import
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/no-relative-packages
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-named-as-default
    1:1   warning  Resolve error: typescript with invalid interface loaded as resolver  import/no-named-as-default-member
    1:1   error    Resolve error: typescript with invalid interface loaded as resolver  import/extensions
    2:19  error    Unable to resolve path to module 'jspdf'                             import/no-unresolved
    3:25  error    Unable to resolve path to module 'html2canvas'                       import/no-unresolved
    4:25  error    Unable to resolve path to module 'react'                             import/no-unresolved
    5:25  error    Missing file extension for "@/services/logger"                       import/extensions
    5:25  error    Unable to resolve path to module '@/services/logger'                 import/no-unresolved
    8:22  error    Missing file extension for "@/types"                                 import/extensions
    8:22  error    Unable to resolve path to module '@/types'                           import/no-unresolved
   29:21  error    A constructor name should not start with a lowercase letter          new-cap
   51:51  error    Unary operator '++' used                                             no-plusplus
   57:22  error    Unexpected `await` inside a loop                                     no-await-in-loop
   94:5   warning  Unexpected console statement                                         no-console
  128:28  error    'data' is defined but never used                                     @typescript-eslint/no-unused-vars

✖ 1260 problems (1102 errors, 158 warnings)


## TypeScript Errors

setupTests.ts(73,34): error TS6133: 'options' is declared but its value is never read.
src/App.test.tsx(1,8): error TS6133: 'React' is declared but its value is never read.
src/App.test.tsx(43,50): error TS2339: Property 'toBeInTheDocument' does not exist on type 'Matchers<void, HTMLElement> & SnapshotMatchers<void, HTMLElement> & Inverse<JestMatchers<void, HTMLElement>> & PromiseMatchers<...>'.
src/App.test.tsx(53,45): error TS2339: Property 'toBeInTheDocument' does not exist on type 'Matchers<void, HTMLElement> & SnapshotMatchers<void, HTMLElement> & Inverse<JestMatchers<void, HTMLElement>> & PromiseMatchers<...>'.
src/App.test.tsx(54,56): error TS2339: Property 'toBeInTheDocument' does not exist on type 'JestMatchers<void, HTMLElement | null>'.
src/App.test.tsx(63,52): error TS2339: Property 'toBeInTheDocument' does not exist on type 'Matchers<void, HTMLElement> & SnapshotMatchers<void, HTMLElement> & Inverse<JestMatchers<void, HTMLElement>> & PromiseMatchers<...>'.
src/App.test.tsx(64,57): error TS2339: Property 'toBeInTheDocument' does not exist on type 'Matchers<void, HTMLElement> & SnapshotMatchers<void, HTMLElement> & Inverse<JestMatchers<void, HTMLElement>> & PromiseMatchers<...>'.
src/App.test.tsx(71,27): error TS2339: Property 'toBeInTheDocument' does not exist on type 'Matchers<void, HTMLElement | null> & SnapshotMatchers<void, HTMLElement | null> & Inverse<JestMatchers<void, HTMLElement | null>> & PromiseMatchers<...>'.
src/App.test.tsx(81,44): error TS2339: Property 'toBeInTheDocument' does not exist on type 'Matchers<void, HTMLElement> & SnapshotMatchers<void, HTMLElement> & Inverse<JestMatchers<void, HTMLElement>> & PromiseMatchers<...>'.
src/App.test.tsx(113,60): error TS2339: Property 'toBeInTheDocument' does not exist on type 'Matchers<void, HTMLElement> & SnapshotMatchers<void, HTMLElement> & Inverse<JestMatchers<void, HTMLElement>> & PromiseMatchers<...>'.
src/App.test.tsx(114,71): error TS2339: Property 'toBeInTheDocument' does not exist on type 'Matchers<void, HTMLElement> & SnapshotMatchers<void, HTMLElement> & Inverse<JestMatchers<void, HTMLElement>> & PromiseMatchers<...>'.
src/App.test.tsx(115,75): error TS2339: Property 'toBeInTheDocument' does not exist on type 'Matchers<void, HTMLElement> & SnapshotMatchers<void, HTMLElement> & Inverse<JestMatchers<void, HTMLElement>> & PromiseMatchers<...>'.
src/App.tsx(11,1): error TS6133: 'ErrorBoundary' is declared but its value is never read.
src/App.tsx(24,31): error TS2322: Type 'Promise<typeof import("/Users/allisongattone/Documents/GitHub/ideaforge/src/components/IdeaEditor")>' is not assignable to type 'Promise<{ default: ComponentType<any>; }>'.
  Property 'default' is missing in type 'typeof import("/Users/allisongattone/Documents/GitHub/ideaforge/src/components/IdeaEditor")' but required in type '{ default: ComponentType<any>; }'.
src/App.tsx(214,13): error TS2322: Type '{ key: string; project: any; onEditIdea: (idea: Idea) => void; onCreateNewIdea: () => void; onBackToProjects: () => void; addNotification: (message: string, type?: "error" | "success" | "info") => void; onUpdateProject: (updatedProject: Project) => void; }' is not assignable to type 'IntrinsicAttributes & IdeaListProps'.
  Property 'project' does not exist on type 'IntrinsicAttributes & IdeaListProps'.
src/App.tsx(320,10): error TS2322: Type '{ children: Element; isOpen: boolean; onClose: () => void; addNotification: (message: string, type?: "error" | "success" | "info") => void; currentTheme: "light" | "dark"; onThemeChange: (theme: "light" | "dark") => void; availableThemes: ("light" | "dark")[]; prefersReducedMotion: boolean; onReducedMotionChange: (e...' is not assignable to type 'IntrinsicAttributes & SettingsModalProps'.
  Property 'children' does not exist on type 'IntrinsicAttributes & SettingsModalProps'.
src/components/BlueprintLogoUploader.tsx(5,7): error TS6133: 'MAX_BLUEPRINT_LOGO_SIZE_MB' is declared but its value is never read.
src/components/Button.test.tsx(1,1): error TS6133: 'React' is declared but its value is never read.
src/components/Button.test.tsx(11,27): error TS2339: Property 'toBeInTheDocument' does not exist on type 'Matchers<void, HTMLElement> & SnapshotMatchers<void, HTMLElement> & Inverse<JestMatchers<void, HTMLElement>> & PromiseMatchers<...>'.
src/components/Button.test.tsx(12,27): error TS2339: Property 'toHaveClass' does not exist on type 'Matchers<void, HTMLElement> & SnapshotMatchers<void, HTMLElement> & Inverse<JestMatchers<void, HTMLElement>> & PromiseMatchers<...>'.
src/components/Button.test.tsx(13,27): error TS2339: Property 'toHaveClass' does not exist on type 'Matchers<void, HTMLElement> & SnapshotMatchers<void, HTMLElement> & Inverse<JestMatchers<void, HTMLElement>> & PromiseMatchers<...>'.
src/components/Button.test.tsx(19,27): error TS2339: Property 'toHaveClass' does not exist on type 'Matchers<void, HTMLElement> & SnapshotMatchers<void, HTMLElement> & Inverse<JestMatchers<void, HTMLElement>> & PromiseMatchers<...>'.
src/components/Button.test.tsx(25,27): error TS2339: Property 'toHaveClass' does not exist on type 'Matchers<void, HTMLElement> & SnapshotMatchers<void, HTMLElement> & Inverse<JestMatchers<void, HTMLElement>> & PromiseMatchers<...>'.
src/components/Button.test.tsx(40,45): error TS2339: Property 'toBeInTheDocument' does not exist on type 'Matchers<void, HTMLElement> & SnapshotMatchers<void, HTMLElement> & Inverse<JestMatchers<void, HTMLElement>> & PromiseMatchers<...>'.
src/components/Button.test.tsx(41,46): error TS2339: Property 'toBeInTheDocument' does not exist on type 'Matchers<void, HTMLElement> & SnapshotMatchers<void, HTMLElement> & Inverse<JestMatchers<void, HTMLElement>> & PromiseMatchers<...>'.
src/components/Button.test.tsx(47,27): error TS2339: Property 'toBeDisabled' does not exist on type 'Matchers<void, HTMLElement> & SnapshotMatchers<void, HTMLElement> & Inverse<JestMatchers<void, HTMLElement>> & PromiseMatchers<...>'.
src/components/Button.test.tsx(48,27): error TS2339: Property 'toHaveClass' does not exist on type 'Matchers<void, HTMLElement> & SnapshotMatchers<void, HTMLElement> & Inverse<JestMatchers<void, HTMLElement>> & PromiseMatchers<...>'.
src/components/Button.test.tsx(54,61): error TS2339: Property 'toBeInTheDocument' does not exist on type 'Matchers<void, Element | null> & SnapshotMatchers<void, Element | null> & Inverse<JestMatchers<void, Element | null>> & PromiseMatchers<...>'.
src/components/Button.test.tsx(55,27): error TS2339: Property 'toBeDisabled' does not exist on type 'Matchers<void, HTMLElement> & SnapshotMatchers<void, HTMLElement> & Inverse<JestMatchers<void, HTMLElement>> & PromiseMatchers<...>'.
src/components/Button.test.tsx(56,51): error TS2339: Property 'toBeInTheDocument' does not exist on type 'JestMatchers<void, HTMLElement | null>'.
src/components/ErrorBoundary.tsx(3,8): error TS6133: 'React' is declared but its value is never read.
src/components/icons.tsx(30,3): error TS2305: Module '"@heroicons/react/24/outline"' has no exported member 'PaletteIcon'.
src/components/IdeaEditor.test.tsx(1,1): error TS6133: 'React' is declared but its value is never read.
src/components/IdeaEditor.test.tsx(5,8): error TS2613: Module '"/Users/allisongattone/Documents/GitHub/ideaforge/src/components/IdeaEditor"' has no default export. Did you mean to use 'import { IdeaEditor } from "/Users/allisongattone/Documents/GitHub/ideaforge/src/components/IdeaEditor"' instead?
src/components/IdeaEditor.test.tsx(6,25): error TS6133: 'Attachment' is declared but its value is never read.
src/components/IdeaEditor.test.tsx(8,10): error TS2305: Module '"@/services/localStorageService"' has no exported member 'IdeaBoilerplate'.
src/components/IdeaEditor.test.tsx(14,70): error TS2694: Namespace '"/Users/allisongattone/Documents/GitHub/ideaforge/src/services/localStorageService"' has no exported member 'IdeaBoilerplate'.
src/components/IdeaEditor.test.tsx(134,54): error TS2339: Property 'toBeInTheDocument' does not exist on type 'Matchers<void, HTMLElement> & SnapshotMatchers<void, HTMLElement> & Inverse<JestMatchers<void, HTMLElement>> & PromiseMatchers<...>'.
src/components/IdeaEditor.test.tsx(135,57): error TS2339: Property 'toHaveValue' does not exist on type 'Matchers<void, HTMLElement> & SnapshotMatchers<void, HTMLElement> & Inverse<JestMatchers<void, HTMLElement>> & PromiseMatchers<...>'.
src/components/IdeaEditor.test.tsx(140,51): error TS2339: Property 'toBeInTheDocument' does not exist on type 'Matchers<void, HTMLElement> & SnapshotMatchers<void, HTMLElement> & Inverse<JestMatchers<void, HTMLElement>> & PromiseMatchers<...>'.
src/components/IdeaEditor.test.tsx(141,57): error TS2339: Property 'toHaveValue' does not exist on type 'Matchers<void, HTMLElement> & SnapshotMatchers<void, HTMLElement> & Inverse<JestMatchers<void, HTMLElement>> & PromiseMatchers<...>'.
src/components/IdeaEditor.test.tsx(142,54): error TS2339: Property 'toHaveValue' does not exist on type 'Matchers<void, HTMLElement> & SnapshotMatchers<void, HTMLElement> & Inverse<JestMatchers<void, HTMLElement>> & PromiseMatchers<...>'.
src/components/IdeaEditor.test.tsx(237,54): error TS2339: Property 'toHaveValue' does not exist on type 'Matchers<void, HTMLElement> & SnapshotMatchers<void, HTMLElement> & Inverse<JestMatchers<void, HTMLElement>> & PromiseMatchers<...>'.
src/components/IdeaEditor.test.tsx(260,27): error TS2339: Property 'toHaveValue' does not exist on type 'Matchers<void, HTMLElement> & SnapshotMatchers<void, HTMLElement> & Inverse<JestMatchers<void, HTMLElement>> & PromiseMatchers<...>'.
src/components/IdeaEditor.test.tsx(292,7): error TS2345: Argument of type 'Error' is not assignable to parameter of type 'never'.
src/components/IdeaEditor.test.tsx(310,7): error TS2345: Argument of type 'Error' is not assignable to parameter of type 'never'.
src/components/IdeaEditor.test.tsx(335,69): error TS2345: Argument of type 'Error' is not assignable to parameter of type 'never'.
src/components/IdeaEditor.test.tsx(337,7): error TS2345: Argument of type '"data:application/octet-stream;base64,AP9/"' is not assignable to parameter of type 'never'.
src/components/IdeaEditor.test.tsx(359,69): error TS2345: Argument of type 'Error' is not assignable to parameter of type 'never'.
src/components/IdeaEditor.test.tsx(360,71): error TS2345: Argument of type 'Error' is not assignable to parameter of type 'never'.
src/components/IdeaEditor.tsx(3,1): error TS6133: 'Button' is declared but its value is never read.
src/components/IdeaEditor.tsx(4,1): error TS6133: 'TextArea' is declared but its value is never read.
src/components/IdeaEditor.tsx(6,3): error TS6133: 'SparklesIcon' is declared but its value is never read.
src/components/IdeaEditor.tsx(7,3): error TS6133: 'DocumentArrowDownIcon' is declared but its value is never read.
src/components/IdeaEditor.tsx(11,3): error TS6133: 'TrashIcon' is declared but its value is never read.
src/components/IdeaEditor.tsx(12,3): error TS6133: 'ArrowLeftIcon' is declared but its value is never read.
src/components/IdeaEditor.tsx(13,3): error TS6133: 'PlusCircleIcon' is declared but its value is never read.
src/components/IdeaEditor.tsx(14,3): error TS6133: 'ArrowDownTrayIcon' is declared but its value is never read.
src/components/IdeaEditor.tsx(15,3): error TS6133: 'ArrowUpTrayIcon' is declared but its value is never read.
src/components/IdeaEditor.tsx(16,3): error TS6133: 'DocumentChartBarIcon' is declared but its value is never read.
src/components/IdeaEditor.tsx(22,42): error TS2307: Cannot find module './IdeaFormFields' or its corresponding type declarations.
src/components/IdeaEditor.tsx(23,44): error TS2307: Cannot find module './IdeaEditorFooter' or its corresponding type declarations.
src/components/IdeaEditor.tsx(25,40): error TS2307: Cannot find module './NebulaCanvas' or its corresponding type declarations.
src/components/IdeaEditor.tsx(28,12): error TS2304: Cannot find name 'Project'.
src/components/IdeaEditor.tsx(29,15): error TS2304: Cannot find name 'Idea'.
src/components/IdeaEditor.tsx(30,28): error TS2304: Cannot find name 'Project'.
src/components/IdeaEditor.tsx(35,23): error TS2304: Cannot find name 'Idea'.
src/components/IdeaEditor.tsx(58,10): error TS2304: Cannot find name 'Idea'.
src/components/IdeaEditor.tsx(59,20): error TS2304: Cannot find name 'Idea'.
src/components/IdeaEditor.tsx(65,21): error TS2304: Cannot find name 'localStorageService'.
src/components/IdeaEditor.tsx(96,22): error TS2304: Cannot find name 'Idea'.
src/components/IdeaEditor.tsx(97,41): error TS2304: Cannot find name 'Idea'.
src/components/IdeaEditor.tsx(98,82): error TS2304: Cannot find name 'Idea'.
src/components/IdeaEditor.tsx(100,18): error TS2304: Cannot find name 'localStorageService'.
src/components/IdeaEditor.tsx(101,10): error TS2304: Cannot find name 'localStorageService'.
src/components/IdeaEditor.tsx(103,28): error TS2304: Cannot find name 'localStorageService'.
src/components/IdeaEditor.tsx(114,13): error TS2304: Cannot find name 'exportIdea'.
src/components/IdeaEditor.tsx(114,32): error TS2304: Cannot find name 'Idea'.
src/components/IdeaEditor.tsx(145,13): error TS2304: Cannot find name 'exportViewAsPdfZine'.
src/components/IdeaEditor.tsx(147,22): error TS2304: Cannot find name 'sanitizeFilename'.
src/components/IdeaEditor.tsx(171,33): error TS2304: Cannot find name 'localStorageService'.
src/components/IdeaEditor.tsx(205,29): error TS2304: Cannot find name 'localStorageService'.
src/components/IdeaEditor.tsx(220,63): error TS2304: Cannot find name 'Attachment'.
src/components/IdeaEditor.tsx(223,13): error TS2304: Cannot find name 'sanitizeFilename'.
src/components/IdeaEditor.tsx(228,57): error TS2304: Cannot find name 'readFileAsBase64'.
src/components/IdeaEditor.tsx(230,56): error TS2304: Cannot find name 'readFileAsText'.
src/components/IdeaEditor.tsx(231,55): error TS2304: Cannot find name 'readFileAsBase64'.
src/components/IdeaEditor.tsx(235,28): error TS2304: Cannot find name 'Attachment'.
src/components/IdeaEditor.tsx(262,34): error TS2304: Cannot find name 'Attachment'.
src/components/IdeaEditor.tsx(272,42): error TS2304: Cannot find name 'Attachment'.
src/components/IdeaEditor.tsx(327,55): error TS7006: Parameter 'att' implicitly has an 'any' type.
src/components/IdeaEditor.tsx(329,59): error TS7006: Parameter 'att' implicitly has an 'any' type.
src/components/IdeaEditor.tsx(342,9): error TS6133: 'handleDownloadAttachment' is declared but its value is never read.
src/components/IdeaEditor.tsx(342,49): error TS2304: Cannot find name 'Attachment'.
src/components/IdeaEditor.tsx(344,20): error TS2304: Cannot find name 'base64ToBlob'.
src/components/IdeaEditor.tsx(361,51): error TS2304: Cannot find name 'ChangeEvent'.
src/components/IdeaEditor.tsx(380,32): error TS2304: Cannot find name 'readFileAsBase64'.
src/components/IdeaEditor.tsx(397,30): error TS2304: Cannot find name 'Attachment'.
src/components/IdeaEditor.tsx(418,9): error TS2322: Type '{ project: Project; idea: Omit<Idea, "id" | "createdAt" | "updatedAt"> & Partial<Pick<Idea, "id" | "createdAt" | "updatedAt">>; onCancel: () => void; handleExport: () => Promise<void>; ... 4 more ...; isGeneratingBoilerplate: boolean; }' is not assignable to type 'IntrinsicAttributes & IdeaEditorHeaderProps'.
  Property 'project' does not exist on type 'IntrinsicAttributes & IdeaEditorHeaderProps'.
src/components/IdeaEditor.tsx(438,13): error TS2322: Type '{ idea: Omit<Idea, "id" | "createdAt" | "updatedAt"> & Partial<Pick<Idea, "id" | "createdAt" | "updatedAt">>; handleBlueprintLogoUpload: (event: ChangeEvent<HTMLInputElement>) => Promise<...>; handleRemoveBlueprintLogo: () => void; addNotification: (message: string, type: "error" | ... 1 more ... | "info") => void; ...' is not assignable to type 'IntrinsicAttributes & BlueprintLogoUploaderProps'.
  Property 'idea' does not exist on type 'IntrinsicAttributes & BlueprintLogoUploaderProps'.
src/components/IdeaList.test.tsx(27,7): error TS6133: 'type' is declared but its value is never read.
src/components/IdeaList.test.tsx(31,13): error TS2304: Cannot find name 'Project'.
src/components/IdeaList.test.tsx(31,23): error TS2304: Cannot find name 'Idea'.
src/components/IdeaList.test.tsx(38,27): error TS2304: Cannot find name 'Idea'.
src/components/IdeaList.test.tsx(38,51): error TS2304: Cannot find name 'Project'.
src/components/IdeaList.test.tsx(89,27): error TS2304: Cannot find name 'NotificationType'.
src/components/IdeaList.test.tsx(92,20): error TS2304: Cannot find name 'Idea'.
src/components/IdeaList.test.tsx(104,20): error TS2304: Cannot find name 'Idea'.
src/components/IdeaList.test.tsx(116,22): error TS2304: Cannot find name 'Project'.
src/components/IdeaList.test.tsx(123,37): error TS2304: Cannot find name 'Project'.
src/components/IdeaList.test.tsx(174,7): error TS2304: Cannot find name 'localStorageService'.
src/components/IdeaList.test.tsx(175,16): error TS2304: Cannot find name 'localStorageService'.
src/components/IdeaList.test.tsx(179,7): error TS2304: Cannot find name 'localStorageService'.
src/components/IdeaList.test.tsx(180,16): error TS2304: Cannot find name 'localStorageService'.
src/components/IdeaList.test.tsx(184,7): error TS2304: Cannot find name 'localStorageService'.
src/components/IdeaList.test.tsx(185,16): error TS2304: Cannot find name 'localStorageService'.
src/components/IdeaList.test.tsx(189,7): error TS2304: Cannot find name 'localStorageService'.
src/components/IdeaList.test.tsx(190,16): error TS2304: Cannot find name 'localStorageService'.
src/components/IdeaList.test.tsx(195,7): error TS2304: Cannot find name 'fileService'.
src/components/IdeaList.test.tsx(195,68): error TS2304: Cannot find name 'fileService'.
src/components/IdeaList.test.tsx(198,7): error TS2304: Cannot find name 'fileService'.
src/components/IdeaList.test.tsx(198,66): error TS2304: Cannot find name 'fileService'.
src/components/IdeaList.test.tsx(201,7): error TS2304: Cannot find name 'fileService'.
src/components/IdeaList.test.tsx(201,64): error TS2304: Cannot find name 'fileService'.
src/components/IdeaList.test.tsx(204,7): error TS2304: Cannot find name 'fileService'.
src/components/IdeaList.test.tsx(204,62): error TS2304: Cannot find name 'fileService'.
src/components/IdeaList.test.tsx(211,36): error TS2304: Cannot find name 'Project'.
src/components/IdeaList.test.tsx(212,5): error TS2304: Cannot find name 'render'.
src/components/IdeaList.test.tsx(213,8): error TS2304: Cannot find name 'IdeaList'.
src/components/IdeaList.test.tsx(226,19): error TS2339: Property 'getByText' does not exist on type 'Screen'.
src/components/IdeaList.test.tsx(227,19): error TS2339: Property 'getByText' does not exist on type 'Screen'.
src/components/IdeaList.test.tsx(228,19): error TS2339: Property 'getByText' does not exist on type 'Screen'.
src/components/IdeaList.test.tsx(229,19): error TS2339: Property 'getByRole' does not exist on type 'Screen'.
src/components/IdeaList.test.tsx(234,5): error TS2304: Cannot find name 'fireEvent'.
src/components/IdeaList.test.tsx(234,28): error TS2339: Property 'getByRole' does not exist on type 'Screen'.
src/components/IdeaList.test.tsx(240,5): error TS2304: Cannot find name 'fireEvent'.
src/components/IdeaList.test.tsx(240,28): error TS2339: Property 'getByRole' does not exist on type 'Screen'.
src/components/IdeaList.test.tsx(246,30): error TS2339: Property 'getByTestId' does not exist on type 'Screen'.
src/components/IdeaList.test.tsx(247,5): error TS2304: Cannot find name 'fireEvent'.
src/components/IdeaList.test.tsx(253,33): error TS2339: Property 'getByTestId' does not exist on type 'Screen'.
src/components/IdeaList.test.tsx(254,11): error TS2304: Cannot find name 'act'.
src/components/IdeaList.test.tsx(255,7): error TS2304: Cannot find name 'fireEvent'.
src/components/IdeaList.test.tsx(259,19): error TS2339: Property 'getByTestId' does not exist on type 'Screen'.
src/components/IdeaList.test.tsx(260,19): error TS2339: Property 'getByText' does not exist on type 'Screen'.
src/components/IdeaList.test.tsx(263,40): error TS2339: Property 'getByRole' does not exist on type 'Screen'.
src/components/IdeaList.test.tsx(264,11): error TS2304: Cannot find name 'act'.
src/components/IdeaList.test.tsx(265,7): error TS2304: Cannot find name 'fireEvent'.
src/components/IdeaList.test.tsx(268,12): error TS2304: Cannot find name 'localStorageService'.
src/components/IdeaList.test.tsx(281,33): error TS2339: Property 'getByRole' does not exist on type 'Screen'.
src/components/IdeaList.test.tsx(282,11): error TS2304: Cannot find name 'act'.
src/components/IdeaList.test.tsx(283,7): error TS2304: Cannot find name 'fireEvent'.
src/components/IdeaList.test.tsx(285,12): error TS2304: Cannot find name 'fileService'.
src/components/IdeaList.test.tsx(295,32): error TS2339: Property 'getByLabelText' does not exist on type 'Screen'.
src/components/IdeaList.test.tsx(299,11): error TS2304: Cannot find name 'act'.
src/components/IdeaList.test.tsx(300,7): error TS2304: Cannot find name 'fireEvent'.
src/components/IdeaList.test.tsx(303,11): error TS2304: Cannot find name 'waitFor'.
src/components/IdeaList.test.tsx(304,14): error TS2304: Cannot find name 'fileService'.
src/components/IdeaList.test.tsx(306,12): error TS2304: Cannot find name 'localStorageService'.
src/components/IdeaList.test.tsx(318,33): error TS2339: Property 'getByRole' does not exist on type 'Screen'.
src/components/IdeaList.test.tsx(319,11): error TS2304: Cannot find name 'act'.
src/components/IdeaList.test.tsx(320,7): error TS2304: Cannot find name 'fireEvent'.
src/components/IdeaList.test.tsx(323,12): error TS2304: Cannot find name 'localStorageService'.
src/components/IdeaList.test.tsx(335,36): error TS2339: Property 'getByLabelText' does not exist on type 'Screen'.
src/components/IdeaList.test.tsx(340,11): error TS2304: Cannot find name 'act'.
src/components/IdeaList.test.tsx(341,7): error TS2304: Cannot find name 'fireEvent'.
src/components/IdeaList.test.tsx(344,11): error TS2304: Cannot find name 'waitFor'.
src/components/IdeaList.test.tsx(345,14): error TS2304: Cannot find name 'fileService'.
src/components/IdeaList.test.tsx(347,12): error TS2304: Cannot find name 'localStorageService'.
src/components/IdeaList.test.tsx(362,6): error TS2304: Cannot find name 'fileService'.
src/components/IdeaList.test.tsx(363,6): error TS2304: Cannot find name 'fileService'.
src/components/IdeaList.test.tsx(366,11): error TS2304: Cannot find name 'act'.
src/components/IdeaList.test.tsx(367,7): error TS2304: Cannot find name 'fireEvent'.
src/components/IdeaList.test.tsx(369,11): error TS2304: Cannot find name 'waitFor'.
src/components/IdeaList.test.tsx(370,14): error TS2304: Cannot find name 'fileService'.
src/components/IdeaList.test.tsx(398,36): error TS2339: Property 'getAllByTitle' does not exist on type 'Screen'.
src/components/IdeaList.test.tsx(399,5): error TS2304: Cannot find name 'fireEvent'.
src/components/IdeaList.test.tsx(400,12): error TS2304: Cannot find name 'fileService'.
src/components/IdeaList.test.tsx(407,5): error TS2304: Cannot find name 'fireEvent'.
src/components/IdeaList.test.tsx(408,12): error TS2304: Cannot find name 'fileService'.
src/components/IdeaList.test.tsx(411,44): error TS2339: Property 'getAllByTitle' does not exist on type 'Screen'.
src/components/IdeaList.test.tsx(412,5): error TS2304: Cannot find name 'fireEvent'.
src/components/IdeaList.test.tsx(416,12): error TS2304: Cannot find name 'localStorageService'.
src/components/IdeaList.test.tsx(424,6): error TS2304: Cannot find name 'fileService'.
src/components/IdeaList.test.tsx(426,33): error TS2339: Property 'getByRole' does not exist on type 'Screen'.
src/components/IdeaList.test.tsx(427,11): error TS2304: Cannot find name 'act'.
src/components/IdeaList.test.tsx(428,7): error TS2304: Cannot find name 'fireEvent'.
src/components/IdeaList.test.tsx(438,31): error TS2339: Property 'getByLabelText' does not exist on type 'Screen'.
src/components/IdeaList.test.tsx(441,28): error TS2339: Property 'getAllByTestId' does not exist on type 'Screen'.
src/components/IdeaList.test.tsx(446,5): error TS2304: Cannot find name 'fireEvent'.
src/components/IdeaList.test.tsx(447,11): error TS2304: Cannot find name 'waitFor'.
src/components/IdeaList.test.tsx(448,26): error TS2339: Property 'getAllByTestId' does not exist on type 'Screen'.
src/components/IdeaList.test.tsx(454,5): error TS2304: Cannot find name 'fireEvent'.
src/components/IdeaList.test.tsx(455,11): error TS2304: Cannot find name 'waitFor'.
src/components/IdeaList.test.tsx(456,26): error TS2339: Property 'getAllByTestId' does not exist on type 'Screen'.
src/components/IdeaList.test.tsx(464,19): error TS2339: Property 'getByText' does not exist on type 'Screen'.
src/components/IdeaList.test.tsx(466,14): error TS2339: Property 'getByText' does not exist on type 'Screen'.
src/components/IdeaList.test.tsx(473,14): error TS2339: Property 'getByText' does not exist on type 'Screen'.
src/components/IdeaList.test.tsx(480,5): error TS2304: Cannot find name 'render'.
src/components/IdeaList.test.tsx(480,13): error TS2304: Cannot find name 'IdeaList'.
src/components/IdeaList.test.tsx(481,5): error TS2304: Cannot find name 'fireEvent'.
src/components/IdeaList.test.tsx(481,28): error TS2339: Property 'getByText' does not exist on type 'Screen'.
src/components/IdeaList.tsx(1,67): error TS6133: 'Suspense' is declared but its value is never read.
src/components/IdeaList.tsx(3,39): error TS7016: Could not find a declaration file for module 'react-window'. '/Users/allisongattone/Documents/GitHub/ideaforge/node_modules/react-window/dist/index.cjs.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/react-window` if it exists or add a new declaration (.d.ts) file containing `declare module 'react-window';`
src/components/IdeaList.tsx(5,10): error TS6133: 'Project' is declared but its value is never read.
src/components/IdeaList.tsx(5,19): error TS2300: Duplicate identifier 'Idea'.
src/components/IdeaList.tsx(22,1): error TS6192: All imports in import declaration are unused.
src/components/IdeaList.tsx(25,15): error TS2300: Duplicate identifier 'Idea'.
src/components/IdeaList.tsx(36,7): error TS2451: Cannot redeclare block-scoped variable 'IdeaList'.
src/components/IdeaList.tsx(37,3): error TS2339: Property 'project' does not exist on type 'IdeaListProps'.
src/components/IdeaList.tsx(38,3): error TS2339: Property 'onEditIdea' does not exist on type 'IdeaListProps'.
src/components/IdeaList.tsx(39,3): error TS2339: Property 'onCreateNewIdea' does not exist on type 'IdeaListProps'.
src/components/IdeaList.tsx(40,3): error TS2339: Property 'onBackToProjects' does not exist on type 'IdeaListProps'.
src/components/IdeaList.tsx(41,3): error TS2339: Property 'addNotification' does not exist on type 'IdeaListProps'.
src/components/IdeaList.tsx(42,3): error TS2339: Property 'onUpdateProject' does not exist on type 'IdeaListProps'.
src/components/IdeaList.tsx(55,38): error TS7006: Parameter 'idea' implicitly has an 'any' type.
src/components/IdeaList.tsx(213,58): error TS7006: Parameter 'att' implicitly has an 'any' type.
src/components/IdeaList.tsx(391,25): error TS7031: Binding element 'columnIndex' implicitly has an 'any' type.
src/components/IdeaList.tsx(391,38): error TS7031: Binding element 'rowIndex' implicitly has an 'any' type.
src/components/IdeaList.tsx(391,48): error TS7031: Binding element 'style' implicitly has an 'any' type.
src/components/IdeaList.tsx(461,39): error TS7006: Parameter 'att' implicitly has an 'any' type.
src/components/IdeaList.tsx(537,14): error TS2451: Cannot redeclare block-scoped variable 'IdeaList'.
src/components/RippleButton.tsx(2,8): error TS2300: Duplicate identifier 'React'.
src/components/RippleButton.tsx(3,8): error TS2300: Duplicate identifier 'React'.
src/components/Workbench.tsx(3,39): error TS7016: Could not find a declaration file for module 'react-window'. '/Users/allisongattone/Documents/GitHub/ideaforge/node_modules/react-window/dist/index.cjs.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/react-window` if it exists or add a new declaration (.d.ts) file containing `declare module 'react-window';`
src/components/Workbench.tsx(9,1): error TS6192: All imports in import declaration are unused.
src/components/Workbench.tsx(129,23): error TS7031: Binding element 'columnIndex' implicitly has an 'any' type.
src/components/Workbench.tsx(129,36): error TS7031: Binding element 'rowIndex' implicitly has an 'any' type.
src/components/Workbench.tsx(129,46): error TS7031: Binding element 'style' implicitly has an 'any' type.
src/hooks/useUndoRedo.tsx(61,36): error TS2739: Type '{ state: AppState; set: (value: AppState) => void; undo: () => void; redo: () => void; }' is missing the following properties from type 'UndoRedoContextType<AppState>': canUndo, canRedo
src/rendering/CosmicCanvas.tsx(8,58): error TS2339: Property 'textPrimary' does not exist on type '{ primary: string; secondary: string; accent: string; } | { primary: string; secondary: string; accent: string; }'.
  Property 'textPrimary' does not exist on type '{ primary: string; secondary: string; accent: string; }'.
src/rendering/CosmicCanvas.tsx(9,60): error TS2551: Property 'textSecondary' does not exist on type '{ primary: string; secondary: string; accent: string; } | { primary: string; secondary: string; accent: string; }'. Did you mean 'secondary'?
  Property 'textSecondary' does not exist on type '{ primary: string; secondary: string; accent: string; }'.
src/rendering/CosmicCanvas.tsx(10,57): error TS2339: Property 'textAccent' does not exist on type '{ primary: string; secondary: string; accent: string; } | { primary: string; secondary: string; accent: string; }'.
  Property 'textAccent' does not exist on type '{ primary: string; secondary: string; accent: string; }'.
src/rendering/CosmicCanvas.tsx(11,9): error TS6133: 'bgColorPrimary' is declared but its value is never read.
src/rendering/CosmicCanvas.tsx(11,56): error TS2551: Property 'bgPrimary' does not exist on type '{ primary: string; secondary: string; accent: string; } | { primary: string; secondary: string; accent: string; }'. Did you mean 'primary'?
  Property 'bgPrimary' does not exist on type '{ primary: string; secondary: string; accent: string; }'.
src/services/localStorageService.test.ts(8,47): error TS2304: Cannot find name 'GenAIParameters'.
src/services/localStorageService.test.ts(8,75): error TS2304: Cannot find name 'GenAIResponse'.
src/services/localStorageService.test.ts(47,56): error TS2339: Property 'withRetries' does not exist on type 'typeof import("/Users/allisongattone/Documents/GitHub/ideaforge/src/services/localStorageService")'.
src/services/localStorageService.test.ts(61,56): error TS2339: Property 'withRetries' does not exist on type 'typeof import("/Users/allisongattone/Documents/GitHub/ideaforge/src/services/localStorageService")'.
src/services/localStorageService.test.ts(76,37): error TS2339: Property 'withRetries' does not exist on type 'typeof import("/Users/allisongattone/Documents/GitHub/ideaforge/src/services/localStorageService")'.
src/services/localStorageService.test.ts(85,51): error TS2339: Property 'withRetries' does not exist on type 'typeof import("/Users/allisongattone/Documents/GitHub/ideaforge/src/services/localStorageService")'.
src/services/localStorageService.test.ts(110,56): error TS2339: Property 'withRetries' does not exist on type 'typeof import("/Users/allisongattone/Documents/GitHub/ideaforge/src/services/localStorageService")'.
src/services/localStorageService.test.ts(116,57): error TS2345: Argument of type 'Error' is not assignable to parameter of type 'never'.
src/services/localStorageService.test.ts(118,37): error TS2339: Property 'withRetries' does not exist on type 'typeof import("/Users/allisongattone/Documents/GitHub/ideaforge/src/services/localStorageService")'.
src/services/localStorageService.test.ts(306,63): error TS2304: Cannot find name 'GenAIResponse'.
src/services/localStorageService.test.ts(324,63): error TS2304: Cannot find name 'GenAIResponse'.
src/services/localStorageService.test.ts(340,73): error TS2304: Cannot find name 'GenAIResponse'.
src/services/metadataService.test.ts(80,33): error TS2352: Conversion of type '{ ok: true; json: () => Promise<never>; status: number; statusText: string; headers: Headers; redirected: false; type: "basic"; url: string; clone: () => Response; arrayBuffer: () => Promise<...>; ... 4 more ...; bodyUsed: false; }' to type 'Response' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Property 'bytes' is missing in type '{ ok: true; json: () => Promise<never>; status: number; statusText: string; headers: Headers; redirected: false; type: "basic"; url: string; clone: () => Response; arrayBuffer: () => Promise<...>; ... 4 more ...; bodyUsed: false; }' but required in type 'Response'.
src/services/settingsService.ts(1,1): error TS6133: 'ThemeName' is declared but its value is never read.
src/utils/env.ts(8,7): error TS6133: 'parsedEnv' is declared but its value is never read.
src/utils/zineExporter.ts(128,28): error TS6133: 'data' is declared but its value is never read.
tests/e2e/playwright-axe-setup.ts(22,20): error TS2339: Property 'violations' does not exist on type 'void'.
tests/e2e/playwright-axe-setup.ts(30,20): error TS2339: Property 'violations' does not exist on type 'void'.
tests/e2e/playwright-axe-setup.ts(43,20): error TS2339: Property 'violations' does not exist on type 'void'.

## Test Results


> ideaforge-ascension@1.0.0 test
> jest --config jest.config.cjs --silent

-------------------------|---------|----------|---------|---------|----------------------------------------------------------------------------------------------------------
File                     | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                                                                                        
-------------------------|---------|----------|---------|---------|----------------------------------------------------------------------------------------------------------
All files                |   39.56 |    19.42 |      13 |   39.04 |                                                                                                          
 src                     |   20.89 |        0 |    2.08 |   23.52 |                                                                                                          
  App.tsx                |   20.89 |        0 |    2.08 |   23.52 | 50-353                                                                                                   
 src/components          |   26.62 |    15.66 |    6.89 |   27.79 |                                                                                                          
  AppHeader.tsx          |   54.54 |        0 |       0 |   54.54 | 7-15                                                                                                     
  Button.tsx             |   92.85 |    82.14 |      50 |    92.3 | 139                                                                                                      
  ErrorBoundary.tsx      |   92.85 |       60 |      80 |   92.85 | 34                                                                                                       
  IdeaEditor.tsx         |    6.97 |        0 |       0 |    7.25 | 57-432                                                                                                   
  Modal.tsx              |      20 |        0 |       0 |    20.4 | 48-143                                                                                                   
  icons.tsx              |   97.05 |        0 |    3.44 |   96.96 | 38                                                                                                       
 src/hooks               |   39.02 |    16.66 |      20 |   35.89 |                                                                                                          
  useTheme.ts            |   57.14 |      100 |      25 |   53.84 | 17-21,26                                                                                                 
  useUndoRedo.tsx        |   29.62 |    16.66 |   16.66 |   26.92 | 19-43,60-61,67                                                                                           
 src/services            |   53.76 |    25.67 |   25.64 |   52.24 |                                                                                                          
  aiService.ts           |   24.65 |     3.03 |       0 |   22.22 | 10,15-16,25,32-52,62-74,86-119,126-132                                                                   
  fileService.ts         |   85.38 |    65.95 |   94.11 |   85.59 | 8-13,76-80,105,115-119,129-132,165,191-192                                                               
  localStorageService.ts |   38.77 |        0 |    3.22 |   35.59 | 32-39,43,47-60,64,67-68,72-73,77-84,89-92,97-100,105-108,117-123,130-136,145-166,179-194,204-205,209,213 
  metadataService.ts     |   95.23 |       75 |     100 |      95 | 31                                                                                                       
  settingsService.ts     |   45.67 |        0 |       0 |   36.66 | 16,20,22,28-32,36-37,40-41,45,47-50,55-58,62,64-65,69-89                                                 
 src/styles              |     100 |      100 |     100 |     100 |                                                                                                          
  theme.ts               |     100 |      100 |     100 |     100 |                                                                                                          
 src/types               |     100 |      100 |     100 |     100 |                                                                                                          
  Metadata.ts            |     100 |      100 |     100 |     100 |                                                                                                          
 src/utils               |     100 |       75 |     100 |     100 |                                                                                                          
  env.ts                 |     100 |       75 |     100 |     100 | 12                                                                                                       
-------------------------|---------|----------|---------|---------|----------------------------------------------------------------------------------------------------------
