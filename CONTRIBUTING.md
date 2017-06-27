# Contributing

## Contents
- [Component Definition of Done](#component-definition-of-done)
- [Style Conventions](#style-conventions)
- [Making Contributions](#making-contributions)
- [Breaking Changes](#breaking-changes)


## Component Definition of Done

For a component to be accepted into Stylabilla, it needs to meet the following requirements.
- Styles follow the conventions below
- Accessibility has been considered
    - Components are navigable by keyboard only
    - Appropriate alt and [ARIA attributes](https://w3c.github.io/using-aria/) are included
    - Semantic HTML is used
- Performance has been considered
    - Minimal markup is used
    - Animations follow performance [best practices](https://developers.google.com/web/fundamentals/design-and-ui/animations/animations-and-performance)
    - Animations are minimal and scoped to just the properties that are changing
- Browser support [requirements](https://usabilla.atlassian.net/wiki/display/DEV/Browser+Support+Strategy) are adhered to. This styleguide is used both in our application and in our customer facing widgets so needs to support the largest audience.
- Documentation is included, which:
    - Demonstrates examples of the component with different classes, children, or using different elements as parents
    - Includes ARIA attributes
    - Is readable and looks consistent with other components when compiled into the guide
    

## Style Conventions

All classes must be prefixed with `sb-`.

We follow the [BEM](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) naming convention for class names. This looks like:
```
.block {}
.block__element {}
.block--modifier {}
```

For example:
```
.site-search {} /* Block */
.site-search__field {} /* Element */
.site-search--full {} /* Modifier */
```

Use class selectors wherever possible. Use attribute selectors only if absolutely required.
Do not use ids or element/tag selectors.

[Nesting selectors is bad](http://markdotto.com/2015/07/20/css-nesting/) - only allow 2 levels max.

Layout styling should be separate to component styling. Individual components
should not make assumptions about their layout (e.g. by setting margins, padding or position).

Avoid the anti-pattern of applying styles in a generic class and then undoing them in a
more specific class.

If you haven't read Harry Roberts' article about [code smells in css](https://csswizardry.com/2012/11/code-smells-in-css/), please read it before contributing :)


## Making Contributions

Stylabilla is internal open-source, meaning anyone can contribute. 

We use a simple [Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows#feature-branch-workflow), where all changes are made in feature branches which are then pull requested into `master`. Each pull request must be assigned to the team, and reviewed by at least one person. If the changes are significant, then the reviewer should be someone who is experienced or knows the project well. Please include a screenshot of your change (if your change is visual) and/or a [gif](http://recordit.co/) (if your change is interactive) to aid the review process.

Branches should be named for the feature they implement. For example `button-ui` or `dropdown-animate`. Ideally it shouldn't include more than two or three words.

Write [good semantic commit messages](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines). For example:
```
docs(contributing): add documentation for contribution standards

Add documentation to help developers follow the same standards for making changes to this repository.
```

Please be aware of what we consider to be
[breaking changes](#breaking-changes) and avoid making them if possible. If it is a breaking change, add the `breaking change` label.


## Breaking Changes

Stylabilla follows [semantic versioning](http://semver.org). Users should be able to update patch and minor versions without requiring any changes to their code. Determining what constitutes a breaking change and therefore require a major version update can be tricky in CSS.

We want our product design to evolve for free over time which may include layout changes that are predictable and which should have low impact on apps provided they have not used fixed sizes on elements.

The general rule is: **if it requires consumers to make changes to their code, then it's a breaking change**.

This includes:

- Removing or renaming existing classes. All our classes are public and should be considered Stylabilla's contractual "API"
- Removing or renaming existing mixins, variables or anything else that would be available if Stylabilla's individual SCSS files were imported by a project
- Modifying properties of existing classes in a way that could break standard web layouts implemented with those classes

New CSS classes are not considered breaking changes. Changes to existing classes that do not impact
layout are also not considered breaking changes (e.g. font-weight, color, border-color, box-shadow, etc).
