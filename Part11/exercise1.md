- > ### Some common steps in a CI setup include linting, testing, and building. What are the specific tools for taking care of these steps in the ecosystem of the language you picked?
    - **Javascript( Node.js)**
        - Linting: Eslint is popular for javascript linting.
        - Testing: Jest, Mocha and jasmine are popular testing frameworks.
        - Building: Webpack and Babel are common tool for building javascript projects.
    - **C#**
        - Linting: StyleCop is a popular tool for C#.
        - Testing: NUnit and MSTest or Moq for testing frameworks.
        - Building: MSBuild is default build tool for .NET projects.

- > ### What alternatives are there to set up the CI besides Jenkins and GitHub Actions?
    Jenkins' Pros and Cons.
    - Pros:
        - Open source
        - Extensibility: Due to wide range of plugins, allow users to extend functinality.
        - Customization.
        - Integration: It integrates well with variety of VCS, build tools, and deployment platforms.
    - Cons:
        - Complexity: very complex for beginners.
        - Resource Consumption: Its very difficult to estimate the cost of running server for jenkins.

    Alternatives to Jenkins:
    - CircliCI:
        - cloud based server which can be scaled easily
        - circle.yaml is used to setup build process unlike jenkins which is complete UI based.
        - parallel processing.
    - GitlabCI:
        - Self hosted platform bulid into Gitlab CI/CD.
        - It provides git repo management through its continuous integration and deployment pipelines, wikis, activity feeds and issue-tracking features.
    - Github Actions:
        - CI/CD that lets you build, test and deploy.
        - Provides automation into software development lifecyle on Github via event triggers.
    - Atlassian Bamboo:
        - Similar to Github Actions or GitlabCI.
        - Integrates with JIRA and Bitbucket.
    - JetBrains TeamCity:
        - Commercial CI/CD and build management system.
        - Helps to build server quickly and see build information in IDE itself.
    - BuildKite:
        - Hybrid SaaS CI/CD that combines power of your own infrastructure and own build architecture with convenience of centralized web UI.

- > ### Would this setup be better in a self-hosted or a cloud-based environment? Why? What information would you need to make that decision?
    Decision based on following considerations:
    - Resource Requirements:
        - Self hosted, need to responsible for managing actual infrastructure.
        - Cloud-based, offer scalable resources based on demand.
    - Cost:
        - Self hosted, higher cost for actual hardware and setup and maintainance.
        - Cloud based, operates on pay-as-you-go model but cost get scale up with increased usage.
    - Scalability:
        - Self hosted, involves purchasing hardware and configuring.
        - Cloud based, easy and quick.
    - Maintainability:
        - Self hosted, team responsible for maintaing.
        - Cloud based, provider is responsible.