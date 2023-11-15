# Welcome to our Automated Testing Library for Web Applications

> Try the [Playground](https://pckerneis.github.io/bdd-cy-lib) for a quick glimpse into our testing language!

This repository encompasses a testing library and accompanying tools designed specifically for testing web applications. Our approach is rooted in the following principles:

- **Readability for the Whole Team**: Test cases should be easily comprehensible by every member of the product team, fostering a ubiquitous language that promotes collaboration.
- **Agile Test Case Creation**: We prioritize the swift and agile creation of automated test cases, ensuring that the process is efficient and seamlessly integrated into your development workflow.
- **Rapid Feedback Loop**: Our tooling aims at providing prompt feedback, enabling your team to swiftly identify and address any issues that may arise.
- **Adaptability to Change**: We understand that applications and their requirements are dynamic. Changes in your application should not necessitate a complete rewrite of automated tests.

The library is built on the [Cypress](https://www.cypress.io/) automated testing framework and defines a natural language structure based on Behavior-Driven Development (BDD) with Given-When-Then keywords.

## Core concepts

### Test Scenario Structure

A test scenario is structured as a sentence, resembling natural language. It utilizes keywords such as:

- `given` to define prerequisites for the test.
- `when` to specify user actions on the system, such as clicking a button or entering text.
- `then` to articulate expectations on the system state, such as the visibility of a message or the disabled status of a text input.

Here's an example of a test sentence :

```
given I visit "http://localhost:3000/myapp"
when I click on welcome page greet button
then welcome message should be visible
```

Learn more about the language structure in the [Language Overview](docs/language-overview.md).

### System Under Test (SUT) Representation

In the tests, the System Under Test (SUT) is depicted as a tree structure, with each node representing a component of the application. Nodes are assigned names and come with selectors. Additionally, nodes have the capability to define custom actions and assertions.

Here's an illustrative example:
```javascript
{
  welcomePage: {
    _selector: '.welcome',
    greetButton: 'button',
    welcomeMessage: {
      _selector: '.message',
      shouldHaveFragmentHighlighted(self, fragment) {/* ... */},
    }
  }
}
```

This declarative approach offers inherent flexibility and facilitates test reuse. It eliminates the need for investing time and effort in a Page Object Pattern, mitigating the risk of misalignment with your evolving application.

### Fluent Component Selection

Within test sentences, component selection is facilitated by traversing the System Under Test (SUT) tree representation. For instance, consider the following tree:

```javascript
{
  foo: {
    bar: {
    },
    baz: {
    }
  }
```

You can select the `bar` component by specifying the path "foo bar".

The most recently selected node is preserved, allowing you to omit parts of the hierarchy in subsequent paths. Node resolution follows these rules:

- Search among the children of the most recently selected node.
- Explore among the siblings of the most recently selected node.
- Resolve a node starting from the root and navigating down.

This fluent selection mechanism enhances the ease with which components can be identified and interacted within your test sentences.

Feel free to try selecting nodes in the [Playground application](https://pckerneis.github.io/bdd-cy-lib) for a hands-on experience with this fluent component selection mechanism.

### Actions

An **action** refers to a specific interaction or operation performed on the application under test (SUT). These interactions typically mirror user actions, such as clicking buttons, entering text, navigating through pages, or interacting with various elements.

Actions are integral components of test scenarios, encapsulating the steps required to simulate user behavior and interactions with the application. They serve as the building blocks for constructing meaningful and comprehensive test cases.

Our library provides a range of built-in actions, simplifying the testing process for common operations, including:
- visit
- click
- type
- clear
- hover

You can also define custom actions. This allows testers and developers to define actions that are specific to their application requirements or to encapsulate complex sequences of interactions.

### Assertions

Assertions in the context of our testing library refer to statements or conditions that validate the expected outcomes of specific actions or interactions within your test scenarios. These statements act as checkpoints, ensuring that the application under test behaves as anticipated.

The library builds upon Cypress's built-in assertions such as :
- should be visible
- should exist
- should have text

As every application is different, you can also define specific assertions on your components by declaring them in the selector tree.

## Repository structure

Within this repository, you'll find:

- **Testing Library**: The core component providing essential tools for automated testing of web applications.
- **Example System Under Test (SUT)**: Explore Cypress spec files that demonstrate the library's capabilities on a sample system, offering practical insights for implementation.
- **Web Playground**: A convenient space for swift validation of test scenarios, empowering users to quickly assess and experiment with various testing scenarios. The playground is accessible live [here](https://pckerneis.github.io/bdd-cy-lib).

## Contributing

Any contributions you make are *greatly appreciated*.

For suggestions and improvements, feel free to fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Don't forget to give the project a star! Thanks again!

## License

Distributed under the GNU LGPL3 License.

See `LICENSE` for more information.

## Contact

Pierre-Clément KERNEIS - pc.kerneis@gmail.com

Project Link: https://github.com/pckerneis/bdd-cy-lib